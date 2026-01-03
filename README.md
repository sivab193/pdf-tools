# PDF Splitter Web App

A modern, glassmorphic web application built with Flask for splitting PDF files. Users can upload a PDF or provide a URL to a PDF, specify a page range, and download the resulting split PDF.

![Preview Placeholder](https://via.placeholder.com/800x450.png?text=PDF+Splitter+UI+Preview)

## Features

- **Upload PDF**: Select a file from your computer or drag and drop.
- **URL Support**: Process a PDF directly from a web link.
- **Precise Splitting**: Extract a specific range of pages effortlessly.
- **Premium Design**: A responsive, dark-themed UI with glassmorphism and smooth animations.
- **Vercel Ready**: Pre-configured for deployment as a serverless function.

## Tech Stack

- **Backend**: Python, Flask, pikepdf, requests
- **Frontend**: HTML5, Vanilla CSS3, JavaScript (ES6+)
- **Hosting**: Optimized for Vercel

## Getting Started

### Prerequisites

- Python 3.8+
- pip (Python package manager)

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd python-scripts
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the application:
   ```bash
   python app.py
   ```

4. Open your browser and navigate to `http://127.0.0.1:5000`.

## Deployment

This project is ready for deployment on **Vercel**. 

1. Install the Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project root.
3. Follow the prompts to deploy.

## License

MIT
