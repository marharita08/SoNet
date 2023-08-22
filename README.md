# Social Network

This repository contains the code for a prototype of a social network web application. The backend of the application is built using the Express.js framework, while the frontend is built using React. The database used is PostgreSQL. Both the backend and the database are deployed in Docker containers.

## Reasons for Development

This project was developed as part of the "MinK Dev Camp" course.

## Features
The application provides the following features:
  - User authentication and registration (including Google and Facebook authentication)
  - Posting, liking, and commenting on posts
  - Adding other users as friends
  - Searching for users in the system
  - Customizing own profile

## Technologies Used

 - JavaScript
 - Express.js
 - React.js
 - PostgreSQL
 - Docker

## Prerequisites
Before running the application, make sure you have the following installed:
- Node.js
- Docker(including docker-compose)

## Installation

Clone this repository: `git clone https://github.com/marharita08/Social-Network-MindKDevCamp`.

To install the required libraries, simply execute the following files depending on your OS:
  - `install_api.cmd` or `install_api.sh`
  - `install_front.cmd` or `install_front.sh`

Before running the application, you need to add a `.env` file to the `front` folder with the following properties:

| Key                              | Value                                                |    
|----------------------------------|------------------------------------------------------|
| REACT_APP_API_URL                | API url                                              |
| REACT_APP_GOOGLE_API_CLIENT_ID   | Google client ID, required for login with Google     |
| REACT_APP_FACEBOOK_API_CLIENT_ID | Facebook client ID, required for login with Facebook |                                                                                                               |

You also need to add a `.env` file to the `api` folder with the following properties:

| Key                        | Value                                                    |    
|----------------------------|----------------------------------------------------------|
| APP_PORT                   | API port                                                 |
| APP_URL                    | API url                                                  |
| APP_KEY                    | App key, random string                                   | 
| DB_HOST                    | Database host                                            |
| DB_USER                    | Name of database user                                    |
| DB_PASSWORD                | Database password                                        |
| DB_DATABASE                | Database name                                            |
| DB_PORT                    | Database port                                            |
| ADMINER_PORT               | Adminer port                                             |  
| GOOGLE_API_CLIENT_ID       | Google client ID, required for login with Google         |
| GOOGLE_API_CLIENT_SECRET   | Google client secret, required for login with Google     |
| FACEBOOK_API_CLIENT_ID     | Facebook client ID, required for login with Facebook     |
| FACEBOOK_API_CLIENT_SECRET | Facebook client secret, required for login with Facebook |
| HASH_SALT                  | Salt for password hashing                                |

## Running the Application

To start the backend, execute the `run_api.cmd` or `run_api.sh`.

To start the frontend, execute the `run_front.cmd` or `run_front.sh`.

Open `localhost:3000` in your browser.

To manage the database you can use the Adminer tool in your browser using the following URL: `appurl:adminerport` (e.g., `localhost:8080`).
Then, connect to the database using the credentials specified in the .env file.

