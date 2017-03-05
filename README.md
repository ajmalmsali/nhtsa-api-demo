# NHTSA Demo API
This is a demo project to fetch vehicle details & ratings from [NHTSA's API]. 
> This is based on Jason Miller's [express-es6-rest-api], also some inspirations from [express-mongoose-es6-rest-api]

The project is written with Express.js, uses ES6, Bluebird for promises, also demonstrates how to call api's in Parallel with [Promise.map]
### How to Run

```sh
# Install dependencies
npm install

# Start development live-reload server - default-port set to 8888
PORT=8080 npm run dev

# Start production server - default-port set to 8888
PORT=8080 npm start
```

Todos
----
 - Add YARN to docker with yarn.lock caching support
 - Add docker-compose file to support few database options
 - Add a middleware to fetch from both req.params or req.body, like $_REQUEST of PHP e.g. Yahoo's [express-normalized]

License
----

MIT


**Free Software, Hell Yeah!**

[express-es6-rest-api]: <https://github.com/developit/express-es6-rest-api>
   [express-mongoose-es6-rest-api]: <https://github.com/KunalKapadia/express-mongoose-es6-rest-api>
   [Promise.map]: <http://bluebirdjs.com/docs/api/promise.map.html>
   [NHTSA's API]: <https://webapi.nhtsa.gov/>
   [express-normalized]: <https://github.com/yahoo/express-normalized>
