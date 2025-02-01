FROM node:18

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

# ensure prisma client is generated
RUN yarn prisma generate

# run migrations, seed the db and then start the app
CMD ["sh", "-c", "yarn prisma migrate deploy && yarn seed:dev && yarn dev"]
# CMD ["yarn", "dev"]