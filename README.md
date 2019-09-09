# Web map front end for the Walk the Yorke Trail Research Project
npm start to build
consumes data served by backend defined in https://github.com/JoshGore/WalkTheYorkeBackend and schema recorded in https://github.com/JoshGore/WalkTheYorkeHasura
WalkTheYorkeBackend provides both a customised tile server (see https://github.com/JoshGore/WalkTheYorkeBackend/blob/master/config.toml) and a graphql api
## Environment Variables
* current api is commited to source in .env *
```
REACT_APP_CLIENT_HOSTNAME="host.com"
REACT_APP_API_URL="https://api.hostname.com/v1/graphql"
REACT_APP_TILES_URL="https://tiles.host.com/maps/trails/{z}/{x}/{y}.vector.pbf?"
```

