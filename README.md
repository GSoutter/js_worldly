# Educational App
The BBC are looking to improve their online offering of educational content by developing some interactive browser applications that display information in a fun and interesting way. Your task is to make an a Minimum Viable Product or prototype to put forward to them this may only be for a small set of information, and may only showcase some of the features to be included in the final app.

# MVP
## A user should be able to

* view some educational content on a particular topic
* be able to interact with the page to move through different sections of content
## Example Extensions
* Use an API to bring in content or a database to store information.
* Use charts or maps to display your information to the page.




# Server

## Project setup
```
npm install
```

## Creating database files. Database is mongo db This seeds the database with blank data which will be populated form the front end.
```
npm run seeds
```

### Compiles and hot-reloads for development
```
npm run server:dev
```



# client

## Project setup
```
npm install
```

### Compiles and hot-reloads for development. Both server and Client are required to be running concurrently
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


# Populating database


### Open the client side app at the location indicted in the terminal

### Navigate to the "Admin" page using the banner button.

### Click buttons to populate database with Api information for RestAPI and Outline map.

* If you want random tracking data for testing purposes, click the random buttons. Otherwise chose blank to track your performance

* RestAPI should have 250 entries, and Outline map should have 257. If you have more wipe the database using 'npm run seeds' on the backend.
