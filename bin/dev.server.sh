#! /bin/bash
npm run build:server
cp .env.local ./build/.env
firebase emulators:start --only functions