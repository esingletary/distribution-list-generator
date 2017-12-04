# Distribution List Generator
This project is the implementation of the final project of database management systems at Mount Vernon Nazarene University.

## Technologies used
* Node.js
* Express
* Bootstrap
* Handlebars
* MySQL

## How to setup
1. Setup MySQL with the included sql files. Use `create database dlg_prod character set UTF8mb4 collate utf8mb4_bin;` to create the database to make sure the character set is correct, assuming you want to use emojis.

Make sure to insert `sample-tables.sql` first, then `sample-persons.sql` and last `sample-data.sql`.

2. Install dependencies with `npm install`

3. Add a `keys_dev.js` to the config folder, using `keys_prod.js` as an example to setup local MySQL in a development environment.

4. Run with `npm start`
