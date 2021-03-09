#!/bin/bash

API_NAME=api
REGION=us-east-1

awslocal lambda update-function-code \
    --region ${REGION} \
    --function-name ${API_NAME} \
    --runtime nodejs8.10 \
    --handler index.handler \
    --memory-size 128 \
    --zip-file fileb://ci/output/api-handler.zip \
    --role arn:aws:iam::123456:role/irrelevant