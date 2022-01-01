FROM node:16.13.0

RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN yarn

CMD ["yarn", "start"]