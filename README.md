# Social Network

This project is protorype of social network. It was developed as part of courses MindKDevCamp. It was developed using:
- Express.js for back-end;
- React.js for front-end;
- PostgreSQL as DBMS.

## Prerequisites
Project is written using Node.js v14.18.1, PostgreSQL 13, Docker 20.10.12.
It requires Node.js, PostgreSQL and Docker to be installed.

## Installation

Load code from this repository.
Add to folder **`front`** file **`.env`** with values for keys placed below.

| Key                              | Value                                                |    
|----------------------------------|------------------------------------------------------|
| REACT_APP_API_URL                | API url                                              |
| REACT_APP_GOOGLE_API_CLIENT_ID   | Google client ID, required for login with Google     |
| REACT_APP_FACEBOOK_API_CLIENT_ID | Facebook client ID, required for login with Facebook |                                                                                                               |

Add to folder **`api`** file **`.env`** with values for keys placed below.

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

Run **`install api.cmd`** and **`install front.cmd`**.
## How to run?
Run **`run api.cmd`** and **`run front.cmd`**.
