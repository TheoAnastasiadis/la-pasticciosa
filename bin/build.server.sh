#! /bin/bash
rm -rf ./build/
mkdir build
tsc --build
ts-add-js-extension --dir=build
cp .env ./build/
cp package.json ./build/
cp package-lock.json ./build/
