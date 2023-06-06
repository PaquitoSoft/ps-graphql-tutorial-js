# PsGraphqlTutorialJs

This repository contains the code used during the "Getting to know GraphQL" workshop.

## Installation

1. Clone this repository:
```bash
git clone https://github.com/PaquitoSoft/ps-graphql-tutorial-js.git
```

2. Get into the root directory and install the dependencies
```bash
cd ps-graphql-tutorial-js

npm install
```

## Local development

Run this command from the root directory
```bash
npm run dev
```

The command will start both the backend and the frontend:
* Backend: http://localhost:4004/graphql
* Frontend: http://localhost:4200/

### Testing

You can use this commands to tests the projects:
```bash
# Run backend tests
npm run test:backend

# Run frontend tests
npm run test:frontend

# Run ALL tests
npm run test
```

## Third party libraries

Here are the lists of the main libraries used in this project.

### Backend
* [yoga](https://the-guild.dev/graphql/yoga-server): GraphQL server-side implementation
* [@apollo/datasource-rest](https://github.com/apollographql/datasource-rest): Helper for implementing REST datasources ([official docs](https://www.apollographql.com/docs/apollo-server/data/fetching-rest/))
* [mongoose](https://mongoosejs.com/): MongoDB ORM

### Frontend
* [react](https://react.dev/): UI rendering library
* [tailwindcss](https://tailwindcss.com/): CSS utility classes
* [@apollo/client](https://github.com/apollographql/apollo-client): GraphQL client ([official docs](https://www.apollographql.com/docs/react/))
* [@testing-library](https://testing-library.com/): Components testing helpers
* [msw](https://mswjs.io/): HTTP mock server (both REST and GraphQL)

## Shared
* [jest](https://jestjs.io/): Tests runner
