#! /bin/bash
npm run build:server
firebase deploy --only functions:auth