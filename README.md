# EthicsNet frontend app

### To get the app running

1 - `yarn install`

2 - `yarn start` will run the app on port http://localhost:3000

3 - `yarn build` will create a build folder ready to be deployed.


### Stack used

1 - `React`

2 - `Material UI`

3 - `React Router`

Using the react context api & react hooks for global state pattern


### App structure

none yet - still in development mode - all files are in the ./src folder

#### Run it with docker 

1 - `docker build -t ethics-net-frontend .`

2 - `docker run -p 80:80 ethics-net-frontend` 

### Production API transport

Set the non-secret `VITE_API_URL` at build time to the backend's verified HTTPS
origin. The value must have no user information, path prefix, query or fragment.
No production endpoint is assumed. Without valid configuration, the interface
still renders, and API requests reject before network dispatch. Development
retains `http://localhost`. Initial request paths stay within the configured origin. Backend redirect
behavior requires operator review, as browser Axios follows redirects.
Working if: invalid or missing production configuration produces no API network
request, and a configured HTTPS origin receives the unchanged request payload.
