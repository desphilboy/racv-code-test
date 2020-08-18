# Iman M. Dezfuly RACV code test:

## Pre requisits:

### you need Node.js to be installed on your machine

### you need nodemon to be installed globally using "npm i -g nodemon"

### you need a bash compatible shell

## cloning the reository

```
git clone git@github.com:desphilboy/racv-code-test.git
```

## installing the app

```
npm i
```

## run tests with coverage

```
npm test
```

## run test while developing

```
npm run test:watch
```

## run the app

```
npm start
```

the default port is 6543 but you can give a different SERVER_PORT env variable and change it.

## database discussion:

at the moment a custom in memory data is used , but if it was a db then properties (houses) could be a model in RDS DB,
if noSQL db like DynamoDB, probably suburb would be the partition key and address would be the sort key because most of the search is done by suburb key.

because of the importance of suburb, the api is not adding properties without suburbs.

## APIs

as pr request there is a post api and get api with optional suburb filter.
GET will filter if suburb is there in query string and will give all results if there is no suburb specified.
POST will create the property in DB if address and salePrice and suburb is provided, otherwise returns error 400 from validation or 500 if suburb not there from DB.
a collection of postman requests provided and can be loaded and easily used by postman to check the server.

## Tests

all the files (except index.js which is not doing a complicated logic) covered 100% by unit tests.
there is an end2end test that runs actual api (using supertes) and verifies all the combinations

## code and build description:

I add babel and webpack for being able to use ES6 on express and node.js
If we want to use ES5, then this will not be needed.
The build first compiles the entire sever into one bundle file then runs that bundle using nodemon. Handlers are controllers and in-memory-db is the only service.

## Routes

although the app is simple I separated routes in their own file to make it more like a complex situation and that middleware there is just writing down the time stamp and can be commented out without any problem.

## other files

Prettierrc and babelrc and .gitignore are for tooling and making git repo smaller.
upon any change to code , the build will run automatically and updates the runing app because of using webpack watch and nodemon.
