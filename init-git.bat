@echo off
echo 🚀 Initializing Git repository and pushing to GitHub...

echo 📦 Initializing Git repository...
call git init

echo 📝 Adding all files to Git...
call git add .

echo 💾 Committing changes...
call git commit -m "Initial commit"

echo 🔄 Setting up remote repository...
call git remote add origin https://github.com/Nagchi-Mohamed/BrainyMath.git

echo 🚀 Pushing to GitHub...
call git push -u origin main

echo ✅ Git repository initialized and pushed to GitHub!
echo 🌐 Your repository is available at: https://github.com/Nagchi-Mohamed/BrainyMath

pause 