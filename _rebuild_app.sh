#!/bin/bash
# ------------------------------------------------------------------------------
# Optimized App Rebuild Script (Standardized Build Pipeline)
# ------------------------------------------------------------------------------
# This script delegates the entire build process (Angular + .NET) to Docker.
# It ensures a clean, isolated build using Multi-Stage Dockerfile.
# ------------------------------------------------------------------------------

# Navigate to the project root
cd "$(dirname "$0")"

echo "🚀 [START] Rebuilding S5 Application via Docker Compose (No-Cache)..."

# Delegate all build logic to Docker Compose
# The --no-cache flag ensures that we build from scratch
# We only build 'app' and 'migration' services
docker-compose -f docker-compose.local.yml build --no-cache app migration

if [ $? -eq 0 ]; then
    echo "--- [REBUILD APP COMPLETE] ---"
    echo "Summary of changes:"
    echo "✅ Isolated Build: Sources are copied from scratch (ignoring local bin/obj/dist)."
    echo "✅ Multi-Stage: Frontend and Backend compiled inside Docker."
    echo "✅ Clean Context: No local artifacts leaked into the image."
    echo ""
    echo "You can now run the app using: ./_s5run.sh app"
else
    echo "❌ [ERROR] Docker build failed. Please check the logs above."
    exit 1
fi