# Greenlight 🌱

## A hypothetical, sustainable e-commerce platform with ethical shopping insight!

## 📌 Project Overview

Greenlight, in it's highest ideal and actually completed form, is a modern e-commerce platform that allows users to shop ethically by evaluating products based on sustainability metrics. Imagine you are a user of Greenlight, having made many orders in the past. You log in one day and you see that there's a new feature! The `Sustainabuy Score`! A persistent banner is displayed, along with a new score appearing on every product card.

What you're seeing here is what I could come up with in about a day.

### Key Features:

- Conscious Cart → Scores products based on sustainability implemented on the backend API.
- Automatically builds enviornment using `docker-compose.yml` and then proceeds to seed a database with users, data and orders.
- Dark Mode!
- Search & Filtering → Users can search with autocomplete and filter by sustainability characteristics.
- Pagination & Performance Optimization → Products are fetched dynamically for scalability.
- The High Horse Score → A fun metric tracking a user’s sustainable shopping impact (exists in the backend, was not able to implement in frontend yet!)
- Responsive UI → TailwindCSS-powered, with dark mode support.
- Fully containerized infrastructure with `frontend`, `backend` and `db (MySQL)` environments.
- API w/ connection to relational db.
- Tech stack
  - NodeJS
  - Typescript
  - MySQL
  - Docker
  - Prisma
  - React

### 📌 How to Run the Project

#### Prerequisites

- Docker (v20+ recommended)
- Docker Compose (v2+ recommended)
- Node.js (v18+ if running locally)
- Yarn (preferred package manager)

#### Clone the Repository

```
git clone https://github.com/shashwb/Greenlight-Shopping.git
cd Greenlight-Shopping
```

#### Start the Application Using Docker Compose

This will start the backend, frontend, and MySQL database.

```
docker-compose up --build
```

#### Expected Containers:

```
backend docker-entrypoint.sh yarn dev Up 0.0.0.0:5001->5000/tcp
frontend docker-entrypoint.sh yarn dev Up 0.0.0.0:3000->3000/tcp
mysql docker-entrypoint.sh mysqld Up 0.0.0.0:3306->3306/tcp
```

#### Database Setup & Seeding

By default, Docker Compose runs database migrations & seeding.

To manually seed the database:

```
docker-compose exec backend yarn prisma migrate dev --name init
docker-compose exec backend yarn seed
```

This creates:

```
Users (mocked accounts, including Seth Balodi).
Products (randomized with Faker).
Orders (historical purchases for analytics).
```

#### Running Locally (Without Docker)

Start MySQL
bash

```
docker run --name mysql -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=greenlight_app -p 3306:3306 -d mysql
```

#### Start Backend

```
cd api
yarn install
yarn dev
```

#### Start Frontend

```
cd client
yarn install
yarn dev
```

### 📌 API Endpoints

Basic rundown of the backend api

```
> GET /products Fetch all products (supports filters, pagination).
> GET /products/:id Fetch a single product by ID.
> GET /products/search Search products with autocomplete suggestions.
> GET /user Fetch mocked Seth Balodi (until auth is implemented).
> GET /user/orders Fetch past orders for mocked Seth Balodi.
> POST /orders Place a new order.
```

### 📌 Thought Process & Engineering Decisions

When designing this submission, I was having trouble putting together a "narrative" from the project source and instructions. The tech stack was straightforward and the filtering based on characteristics made sense, but I wanted to see if I could get a bird's eye view on what sort of product somebody could actually create which could involve the simple scoring system provided.

The names of the characteristics were the first source of inspiration for me -- and the fact that I had just done a mini-audit of my own ecological shopping habits made me think of an e-commerce shop that not only showed prices but had it's own algorithm to give users an eco score for a product.

This would allow a user to make a more conscious choice and allow the application to provide a simple "Greenlight" score as a badge on all products. This could help people make more eco-conscious choices!

I thought of an idea of the user being someone who has used this app before and now I, as the developer, have a new feature that I added called the `SustainaBuy` score, which I want users to be aware of.

I thought it would be a cool way to take the concept of the project and turn it into a gamified feature which I needed to explain to a user. The goal was to have a persistent banner which a user could "x" out of (and the choice would be stored in localStorage). I wanted to do that as a much less "in your face" way to convey a new feature.

I wanted to create the feeling of an e-commerce site, so I knew I needed more than the mocked db data provided. I thought it would be cool to showcase some fullstack skills by creating a brand new containzerized enviornment for all of the 3 interconnected parts of the application, `frontend`, `backend` and `mysql`.

Doing this would make a better Developer Experience, as the containers would allow for a separation of concerns and keep any local filesystem poisoning far away from the container images. I would also be able to use an ORM (I chose `prisma` because I have the most experience with MySQL) to generate a schema and migrate it to a brand new instance of a db as part of the build.

This allowed me to set up everything in the `docker-compose.yml`, hit the build command and lay back as I watched the empty database be seeded with randomized data, including image urls for products! I randomized 10 users, including one hard-coded one for myself. I also randomly assigned orders to each user and randomly assigned products to each order.

My intention with this was to have a part of the application where a user could see past orderes and go through visualiations (pie charts, bar charts, etc) which showed how they spent their money. I would also have wanted to show a timeseries chart which would be their "high horse" score over time. I was not able to get to this part in the frontend, but all the data necessary is created in the backend.

The seeding script was also created to be idempotent so that the named volume created as part of the docker-compose script would not repeatedly be seeded every time the containers restarted.

I then thought about the best ways to show good UI/UX when it came to potentially scaling to 1000s, if not more, of products, and I decided I would create paginated endpoints and frontend components. Autocomplete is expected out of any search component (wherever practicable), so I decided that would be another good use of time to generate a smooth user experience. Both of these are useful because as databases grow and APIs become heavily used, we want to limit the amount of data that is being requested at one time. Pagination is a great way to handle this.

Finally, I created a popover filter component which allows a user to "turn off" characteristics to filter them.

## 📌 Future Improvements

With more time I would do the following:

- Cacheing using redis
- Better UI/UX for microinteractions, such as clicking off of an element causing it to close
- Although the endpoints and database exist and are hooked up to allow this to happen, the frontend does not currently allow a. user to create an order, or view their order history. I would implement these features along with creating product pages which show a product's description and the ability to add it to their cart (localStorages)
- SustainabuyScores from a user's order history go into giving them a "High Horse" score, which allows the user to gamify the eco-shopping experience. I created a mock avatar gray circle with a "badge" of 3 on it which is hard coded.
  - `highHorse` score is currently mocked for all users using the `Faker` JS library.
- Integration & End-to-End Testing
  - Add Jest + React Testing Library for frontend testing.
  - Use Cypress for full user flows (searching, filtering, ordering).
- Separate out larger components into smaller ones. For example, I would want to create a dedicated component to hold the products as a <ProductsGrid />. For the sake of time, I left some components larger than they would ideally be.

- I would be much more strict about my type safety and commenting. I tried to write my code so that it is self explanatory, but time constraints made it so I definitely missed places where types are ill defined and code isn't as straightforwardly commented.

- A persistent banner (explaining the new scoring system) which shows up until a user clicks it off. That choice would be saved in localStorage.

- User Profiles & Authentication

  - Implement Auth0 for secure login and help to mock users.
  - Currently the entire app just mocks a single user, Seth Balodi.
  - Allow users to track past purchases & sustainability scores.

- Data Visualizations

  - Display interactive charts showing user sustainability impact.
  - Graph relationships between popular products and user orders.

- Personalized “Trending” Landing Page
  - Show custom recommendations based on past purchases.
  - Highlight weekly & monthly top sustainable products.

## Final Thoughts

Greenlight was designed to be fast, engaging, and sustainable. This project showcases:

- Full-Stack Development (React, Express, MySQL, Prisma).
- Performance & Scalability Optimizations.
- Real-World UI/UX Considerations.
- etup in the backend for gamified sustainability features (High Horse Score).

## Thank you for reviewing Greenlight!
