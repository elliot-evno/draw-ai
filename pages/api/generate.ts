import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get prompt and drawing from request body
  const { prompt, drawingData } = req.body;
  
  // Log request details (truncating drawingData for brevity)
  console.log("API Request:", {
    prompt,
    hasDrawingData: !!drawingData,
    drawingDataLength: drawingData ? drawingData.length : 0,
    drawingDataSample: drawingData ? `${drawingData.substring(0, 50)}... (truncated)` : null
  });
  
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

  // Set responseModalities to include "Image" so the model can generate an image
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp-image-generation",
    generationConfig: {
      // @ts-ignore
      responseModalities: ['Text', 'Image']
    },
  });

  try {
    let generationContent;
    
    // If drawingData is provided, include it as an image in the request
    if (typeof drawingData !== 'undefined' && drawingData !== null) {
      // Create a content part with the base64-encoded image
      const imagePart = {
        inlineData: {
          data: drawingData,
          mimeType: "image/png"
        }
      };
      
      // Combine drawing with text prompt
      generationContent = [
        imagePart,
        { text: `${prompt}. Keep the same minimal line doodle style.` || "Add something new to this drawing, in the same style." }
      ];
      console.log("Using multipart content with drawing data and prompt");
    } else {
      // Use text-only prompt if no drawing is provided
      generationContent = prompt;
      console.log("Using text-only prompt");
    }
    
    console.log("Calling Gemini API...");
    const response = await model.generateContent(generationContent);
    console.log("Gemini API response received");
    
    // Initialize response data
    const result = {
      success: true,
      message: '',
      imageData: null
    };
    
    // Add validation for response structure
    if (!response?.response?.candidates?.[0]?.content?.parts) {
      console.error("Invalid API response structure:", response);
      return res.status(500).json({
        success: false,
        error: 'Invalid API response structure'
      });
    }
    
    // Process response parts
    for (const part of response.response.candidates[0].content.parts) {
      // Based on the part type, either get the text or image data
      if (part.text) {
        result.message = part.text;
        console.log("Received text response:", part.text);
      } else if (part.inlineData) {
        const imageData = part.inlineData.data;
        console.log("Received image data, length:", imageData.length);
        
        // Include the base64 data in the response
        result.imageData = imageData as never;
      }
    }
    
    console.log("Sending successful response");
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error generating content:", error);
    return res.status(500).json({ 
      success: false, 
      error: (error as Error).message || 'Failed to generate image' 
    });
  }
}
