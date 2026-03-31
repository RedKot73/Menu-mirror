#!/bin/bash

echo "Stopping application containers..."
docker-compose -f docker-compose.local.yml down
