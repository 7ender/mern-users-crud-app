## Simple MERN CRUD app

this app was created as part of challenge for Holiday Extras
to run this app, simply clone this repo

install dependencies of both the server and the client

```
npm install
...
cd client
npm install
```

and start the server

```
npm start
```

now you can test the API at localhost:5000

and then you can run the client

```
cd client && npm start
```

now you can test the client at localhost:3000

The API follow REST API standands and there is one resourece which is users.
briefly the endpoints are as follows:

```
GET     /api/users              // Get all users
GET     /api/users/{id}         // Get one user
POST    /api/users              // Create a user
PUT     /api/users/{id}         // Edit a user
DELETE  /api/users/{id}         // Delete a user
```
