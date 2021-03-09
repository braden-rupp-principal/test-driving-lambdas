# test-driving-lambdas

This project hosts visual studio code server and localstack.

It is configured to use environment variables to run multiple instances on the same host

## Prerequisites

1. A machine with Docker
2. A workspace with the following structure:

``` text
-workspace
    -port
        -project
```

## Deploying Docker

Configure `$PORT` and `$LOCAL_STACK_EDGE_PORT` as needed

``` bash

# //from project root

# Building
PORT=8081 LOCAL_STACK_EDGE_PORT=4566 docker-compose build

# Starting
PORT=8081 LOCAL_STACK_EDGE_PORT=4566 docker-compose up -d

# Stopping
PORT=8081 LOCAL_STACK_EDGE_PORT=4566 docker-compose down

```

Visual studio code will be available at `http:yourdomain:${PORT}`

## Deploying to localstack

``` bash

# build lambda
npm run build

# deploy lambda and create apigateway
npm run deploy

# update lambda 
npm run redeploy

```

Lambda Enpoint inside visual studio docker container:

`http://localstack-${PORT}:4566/restapis/${API_ID}/${STAGE}/_user_request_/helloWorld`

Lambda External endpoint: 

`http://yourdomain:4566/restapis/${API_ID}/${STAGE}/_user_request_/helloWorld`

