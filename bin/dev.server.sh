#! /bin/bash
export NODE_ENV="development"
npm run build:server
cp .env ./build/.env
firebase emulators:start --only functions