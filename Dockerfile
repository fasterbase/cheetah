FROM node:16.13.0-alpine AS development

WORKDIR /workspace

COPY package*.json ./

RUN npm instal

COPY . .

RUN npm run build

EXPOSE 3000


CMD ["node", "dist/src/main"]