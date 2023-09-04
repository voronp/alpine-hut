FROM node:18-alpine as base-hut

RUN apk add g++ make py3-pip

WORKDIR /www

FROM base-nx as build-hut

COPY apps apps
COPY libs libs
COPY tools tools
COPY .prettierrc .prettierrc
COPY .prettierignore .prettierignore
COPY .gitignore .gitignore
COPY .eslintrc.json .eslintrc.json
COPY generate-gql-typings.ts generate-gql-typings.ts
COPY jest.preset.js jest.preset.js
COPY tsconfig.base.json tsconfig.base.json
COPY babel.config.json babel.config.json
COPY jest.config.js jest.config.js
COPY nx.json nx.json
COPY workspace.json workspace.json
COPY jest.config.ts jest.config.ts
COPY migrations.json migrations.json
COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install

RUN npx ts-node generate-gql-typings.ts
RUN npx graphql-codegen --config=./libs/data-access/codegen.yml

EXPOSE 4200
EXPOSE 3333

CMD ["npx", "nx", "run-many", "--parallel", "--target=serve", "--all"]
