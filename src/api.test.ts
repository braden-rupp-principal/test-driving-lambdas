import { APIGatewayProxyEvent, APIGatewayProxyEventPathParameters, APIGatewayProxyEventQueryStringParameters } from "aws-lambda";
import { handler } from "./api"
import { exchangeRateRepository as mockExchangeRateRepository } from "./dynamo/exchangeRateRepository";
import { mocked } from 'ts-jest/utils';

jest.mock('./dynamo/exchangeRateRepository')

test('it should return a rate for /convert/USD?to=CHF?amount=10', async () => {


})

test('it should return a rate for /convert/CHF?to=USD?amount=20', async () => {

})

const givenEvent = (
    pathParameters: APIGatewayProxyEventPathParameters,
    queryStringParameters: APIGatewayProxyEventQueryStringParameters): APIGatewayProxyEvent => {

    return {
        pathParameters,
        queryStringParameters
    } as APIGatewayProxyEvent
}