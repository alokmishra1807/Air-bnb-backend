FROM node:22-alpine AS BUILDER

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY --from=BUILDER /app/dist ./dist
COPY --from=BUILDER /app/src ./src
COPY --from=BUILDER /app/.sequelizerc ./.sequelizerc

CMD ["node", "dist/index.js"]