# birthday-donation-ticker-app

App built with MERN Stack (Mongo, Express, React, Node)

## To run locally
You'll need three terminal tabs open - one for the db, one for the api, and one for the react app

You'll need to have npm installed and mongoDB

### Start MongoDB
```
$ mongod
```
### Setup and Start Express server
```
$ git clone git@github.com:steve52/birthday-donation-ticker-app.git
$ cd birthday-donation-ticker-app
$ npm install
$ npm start
```

### Setup and Start web app
```
$ cd birthday-donation-ticker-app/client
$ npm install
$ npm start
```

## Use the App locally

Open a browser open http://localhost:3000/ in one tab and http://localhost:3000/add in another

Routes: 

/ - This is where the total donation amount appears and shoutouts for new donations as they come in

/add - This is where you can enter new donations
