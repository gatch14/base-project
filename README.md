# base-project
A tiny base project for a REST API with NodeJS.

1) Clone this repository
2) Install packages: npm install
3) Create your postgres database
4) In config/config.json change your auth for database connection
5) Run migration: node_modules/.bin/sequelize db:migrate
6) npm start

Access in your browser to show travel in json with google map:
http://localhost:3000/api/transports

With your RESTED client (show the instruction for req.body required):
- Save a travel: http://localhost:3000/api/transports/transport/save
- Find a travel: http://localhost:3000/api/transports/transport/findOne
- Show all travels: http://localhost:3000/api/transports/transport/findAll
- Update a travel: http://localhost:3000/api/transports/transport/update
- Delete a travel: http://localhost:3000/api/transports/transport/destroy
- Scrap website: http://localhost:3000/scrap
