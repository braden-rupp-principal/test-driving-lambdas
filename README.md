# test-driving-lambdas

This is an example project to show how to unit and integration test a lambda with dynamodb using localstack

It is configured to use environment variables to run multiple instances on the same host

## Prerequisites

1. [Docker](https://docs.docker.com/get-docker/)
1. [Node.js](https://nodejs.org/en/)
1. [aws cli v2](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
1. [aws-cdk](https://github.com/aws/aws-cdk)
1. [aws-cdk-local](https://github.com/localstack/aws-cdk-local#readme)

## Getting Started

Note: The following environment variables need to be configured

`MYPORT` e.g. 8081
`MY_LOCALSTACKPORT` e.g. 4566

Running Tests

`npm test`

Running Integration tests

`npm run integration`

Starting Localstack for local testing

`npm run start_localstack` 
`npm run stop_localstack` 

Deploying to localstack

`npm run deploy`
