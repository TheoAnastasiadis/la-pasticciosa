#! /bin/bash
npm run build:server
cp .env.staging ./build/
firebase deploy --only functions:auth -P staging