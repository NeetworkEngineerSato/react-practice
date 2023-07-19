#!/bin/bash

set -v

rm -r \
   node_modules/* \
   public \
   src \
   build \
   package.json \
   package-lock.json \
   .eslintrc.json

yes | npx create-react-app /my-app --template redux-typescript
cp -r /my-app/{.gitignore,node_modules,package-lock.json,package.json,public,src,tsconfig.json} .
rm -r /my-app/

npm install \
    redux-persist \
    @types/redux-persist \
    react-router \
    @types/react-router \
    react-router-dom \
    @types/react-router-dom

npm install --save-dev \
    eslint \
    prettier

sed -i -e '4i \ \ "homepage": ".",' package.json

npx eslint --init
