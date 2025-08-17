#!/bin/bash

# Jottings Ghost Theme Installation Script

echo "🎨 Installing Jottings Ghost Theme..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the jottings-ghost directory"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Validate theme
echo "🔍 Validating theme..."
npx gscan . --verbose

# Create zip file for upload
echo "📦 Creating theme package..."
zip -r jottings-ghost.zip . -x "node_modules/*" "*.git*" "README.md" "install.sh" "migrate.js"

echo "✅ Installation complete!"
echo ""
echo "📋 Next steps:"
echo "1. Upload jottings-ghost.zip to your Ghost admin panel"
echo "2. Go to Design → Themes → Upload a theme"
echo "3. Select the zip file and activate the theme"
echo "4. Configure your content and tags"
echo ""
echo "📚 For more information, see README.md" 