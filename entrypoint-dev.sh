#!/bin/sh

cd /www
yarn install

npx ts-node generate-gql-typings.ts
npx graphql-codegen --config=./libs/data-access/codegen.yml

npx nx run-many --parallel --target=serve --all
