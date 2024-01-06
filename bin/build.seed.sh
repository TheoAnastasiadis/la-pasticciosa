#! /bin/bash
export NODE_ENV="development"
tsc --experimentalDecorators --esModuleInterop --module esnext --moduleResolution Node --outDir ./cypress/seed_build --emitDecoratorMetadata true --target es6 ./cypress/seed.ts
npx ts-add-js-extension --dir=cypress/seed_build
if [ $1 == "setup" ] ; then
node -e 'import("./cypress/seed_build/cypress/seed.js").then(async (module) => await module.setup());'
fi
if [ $1 == "teardown" ] ; then
node -e 'import("./cypress/seed_build/cypress/seed.js").then(async (module) => await module.teardown());'
fi