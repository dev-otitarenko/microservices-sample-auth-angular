#!/usr/bin/env bash

# run db instance
docker-compose -f docker-compose-db.yml stop
docker-compose -f docker-compose-db.yml rm
docker-compose -f docker-compose-db.yml up -d --build

