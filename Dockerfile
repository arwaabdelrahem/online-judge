
FROM node:19.5.0-alpine
 
WORKDIR /usr/src/app

COPY package.json package-lock.json ./

COPY . .

RUN npm i -g @nestjs/cli

RUN npm i 
 
RUN npm run build
 
USER node
 
CMD ["npm", "run", "start:prod"]