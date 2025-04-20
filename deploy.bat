@echo off
echo 🚀 Starting BrainyMath deployment process...

echo 📦 Installing dependencies...
call npm install

echo 🔨 Building the project...
call npm run build

echo 🚀 Deploying to GitHub Pages...
call npm run deploy

echo ✅ Deployment completed successfully!
echo 🌐 Your site should be live at: https://nagchi-mohamed.github.io/BrainyMath
echo ⏳ It may take a few minutes for the changes to be visible.

pause 