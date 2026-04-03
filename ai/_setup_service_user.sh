#!/bin/bash

# Script to ensure the service user 'havrok' exists and has the correct password.
# Leverages the S5Server's --setup-user CLI flag to handle Identity logic (hashing, DB update).

set -e

# 1. Identify the project root
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

echo "🚀 [1/2] Checking environment..."
if [ ! -f ".env" ]; then
    echo "❌ ERROR: .env file not found in $PROJECT_ROOT"
    exit 1
fi

echo "🔐 [2/2] Running service user setup..."
# Run the .NET application with the --setup-user flag.
# This will:
#  - Create 'havrok' if it doesn't exist
#  - Reset 'havrok' password to 'QWERTY654321' if it does
#  - Unlock the account if it's locked
dotnet run --project S5Server -- --setup-user

echo ""
echo "✅ [SUCCESS] Service user 'havrok' is ready."
echo "   Username: havrok"
echo "   Password: QWERTY654321"
