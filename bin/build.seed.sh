#! /bin/bash
export NODE_ENV="development"
tsc --experimentalDecorators --esModuleInterop --module esnext --moduleResolution Node --outDir ./cypress/seed_build --emitDecoratorMetadata true --target es6 ./cypress/seed.ts
npx ts-add-js-extension --dir=cypress/seed_build
node cypress/seed_build/cypress/seed.js       