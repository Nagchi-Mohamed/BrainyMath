#!/bin/bash

# BrainyMath Deployment Script

echo "🚀 Starting BrainyMath deployment process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building the project..."
npm run build

# Deploy to GitHub Pages
echo "🚀 Deploying to GitHub Pages..."
npm run deploy

echo "✅ Deployment completed successfully!"
echo "🌐 Your site should be live at: https://nagchi-mohamed.github.io/BrainyMath"
echo "⏳ It may take a few minutes for the changes to be visible." 