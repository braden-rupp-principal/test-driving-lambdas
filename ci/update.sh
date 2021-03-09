#!/bin/bash

API_NAME=api
REGION=us-east-1

awslocal lambda update-function-code \
    --function-name ${API_NAME} \
    --zip-file fileb://ci/output/api-handler.zip

ENDPOINT="http://${LOCALSTACK_HOST:=localhost}:4566/restapis/${API_ID}/${STAGE}/_user_request_/helloWorld"