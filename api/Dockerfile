FROM node:18

# set working directory
WORKDIR /app

# cache/install deps
COPY package.json yarn.lock ./
RUN yarn install

# copy application files into container
COPY . .


# start dev server backend (express)
CMD ["yarn", "dev:watch"]



