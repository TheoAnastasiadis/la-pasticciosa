#! /bin/bash
npm run build:client -- --mode staging
firebase deploy --only hosting -P staging