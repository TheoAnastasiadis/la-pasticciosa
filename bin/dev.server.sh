#! /bin/bash
export NODE_ENV="development"
npm run build:server
cp .env ./build/.env
export VAR="my value"
firebase emulators:start --only functions