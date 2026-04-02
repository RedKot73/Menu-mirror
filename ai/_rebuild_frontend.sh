#!/bin/bash
# ------------------------------------------------------------------------------
# Script to force a clean rebuild of the Angular frontend and sync to wwwroot.
# Essential when 'dotnet watch' misses frontend changes or cache is stale.
# ------------------------------------------------------------------------------

# 1. Navigate to the project root
cd "$(dirname "$0")/.."

echo "🛑 [1/5] Stopping active dotnet processes..."
./ai/_kill_dotnet.sh > /dev/null 2>&1

echo "🧹 [2/5] Cleaning Angular cache and dist..."
rm -rf S5Server/Front/.angular
rm -rf S5Server/Front/dist

echo "🧹 [3/5] Cleaning server wwwroot..."
# Keep .gitkeep if it exists, or just clear everything
find S5Server/wwwroot -mindepth 1 -delete

echo "🚀 [4/5] Building Angular frontend (Development)..."
cd S5Server/Front

# Note: Optimization is disabled to bypass sandbox network restrictions (Font Inlining)
npm run build -- --configuration development

if [ $? -ne 0 ]; then
    echo "❌ Error: Angular build failed!"
    exit 1
fi

echo "📂 [5/5] Syncing to S5Server/wwwroot..."
cp -r dist/Menu/browser/* ../wwwroot/

echo "✅ [SUCCESS] Frontend successfully rebuilt and synchronized!"
echo "You can now start the app using: ./ai/_run.s5app.sh"
