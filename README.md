# paronStock
Example storage-management solution

Build frontend production with
```
NODE_ENV=production node_modules/.bin/webpack -p
```

Build frontend development with
```
NODE_ENV=development node_modules/.bin/webpack -d
```

Run webpack dev-server with:

```
node_modules/.bin/http-server src/static
```

Run express server with:
```
NODE_ENV=production MYSQL_PASS=MYSQLPASSWORD node_modules/.bin/babel-node --presets react,es2015 src/server.js
```
