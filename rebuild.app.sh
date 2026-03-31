#!/bin/bash

echo "Starting rebuild for 'app' and 'migration' containers..."
docker-compose -f docker-compose.local.yml up --build app migration
