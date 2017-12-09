# Distribution List Generator
This project is the implementation of the final project of database management systems at Mount Vernon Nazarene University.

## Technologies used
* Node.js
* Express
* Bootstrap
* Handlebars
* MySQL

## How to setup without Docker
0. Make sure you have `yarn` installed. You could use `npm` if you want, but I can't guarantee it'll work correctly if the dependencies change.

1. Setup MySQL with the included `setup.sql` file. It has commands to create the database and to insert all tables and dummy data required.

2. Install dependencies with `yarn`.

3. Add a `keys_dev.js` to the config folder, using `keys_prod.js` as an example to setup local MySQL in a development environment.

4. Run with `yarn start`

## Docker setup

0. Make sure you use `process.env.MYSQL_HOST` in your `keys_dev.js` for docker-compose to correctly link the containers. 

1. Run `docker-compose build` to build the images and then `docker-compose up` to start the containers.

The MySQL container is slow to start so give it like 30 seconds before using the app.
