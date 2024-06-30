# Weather Now Backend

Weather Now is a robust backend system designed to efficiently manage weather data and interactions. Built with Prisma, PostgreSQL, and Node.js, Weather Now provides a seamless and secure way to handle forecast operations, ensuring reliability and performance at scale.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Related Project](#related-project)

## Features

- **Weather Forecast**
  - Add, list, update, and delete weather informations from differents cities.
  
- **Accurate Weather Forecast**
  - Using node-geocoder, openweather api and google maps api to forecast weather in details

- **Google OAuth**
  - Use google authentication to save session informations and login
  
## Technology Stack

- **Prisma**
  - ORM for seamless database interaction.
  - Type-safe database queries and easy schema management.
  
- **PostgreSQL**
  - Reliable and powerful open-source relational database.
  - Scalable and secure storage for weather data.
  
- **Node.js**
  - Server-side JavaScript runtime for fast and efficient backend processing.
  - Handles asynchronous operations and concurrent requests effectively.

- **TypeScript**
  - Typed superset of JavaScript that compiles to plain JavaScript.
  - Ensures type safety and reduces runtime errors.

- **Passport.js**
  - Passport is authentication middleware for Node.js.

## Architecture

- **RESTful API**
  - Clean API for frontend integration.
  - Supports CRUD operations.
  
- **Middleware**
  - Utilizes Express.js for request handling and Passport middleware to manage user authentication.
  
## Installation

### Requeriments:
- Passport configuration with google oauth, see the documentation: https://www.passportjs.org/tutorials/google/

-Geocoding API, see documentation: https://developers.google.com/maps/documentation/geocoding/overview

1. Clone the repository:
   ```bash
   git clone https://github.com/Cleiton366/weather-now-backend.git
   cd weather-now-backend
    ```
2. Install dependencies:
```bash 
npm install
```

3. Set up the environment variables:
Create a .env file in the root directory and add the following variables:
   
```bash
PORT=4000
DATABASE_URL='postgresql://postgres:randompassword@localhost:5432/mydb?schema=public'
WEATHER_API_KEY="<YOUR_API_KEY>"
GOOGLE_CLIENT_ID='<YOUR_API_KEY>'
GOOGLE_CLIENT_SECRET='<YOUR_API_KEY>'
GOOGLE_MAPS_API_KEY='<YOUR_API_KEY>'
FRONTEND_URL='http://localhost:3000'
CORS_ORIGIN='http://localhost:3000'
 ```
 
4. Run the database migrations:

```bash
npx prisma migrate dev
```

5. Start the server:

```bash
npm run dev
```

## Related Project

Opcionally, you can run this project with the frontend, see: https://github.com/Cleiton366/weather-now-frontend