# Vibe Drawing

A fork of [Gemini Co-Drawing](https://huggingface.co/spaces/Trudy/gemini-codrawing) - an interactive AI drawing assistant powered by Google's Gemini API.

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- pnpm (v8 or higher)
- Google Gemini API key

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/elliot-evno/draw-ai.git
   cd draw-ai
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create a `.env` file in the root directory with your Gemini API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

### Running Locally
To start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

### Docker Setup
You can also run the application using Docker:

1. Build the Docker image:
   ```bash
   docker-compose build
   ```

2. Start the container:
   ```bash
   docker-compose up
   ```

The application will be available at `http://localhost:3000`

## Features
- Interactive drawing canvas
- AI-powered drawing suggestions
- Undo/Redo functionality
- Color picker for custom drawing colors

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## License
MIT License
