#!/bin/bash
cd "$(dirname "$0")/.."

echo "Stopping dotnet processes..."
pkill -f "dotnet run"
pkill -f "dotnet watch"
