import { APIGatewayProxyEvent, APIGatewayProxyEventPathParameters, APIGatewayProxyEventQueryStringParameters } from "aws-lambda";
import { handler } from "./api"
import { exchangeRateRepository as mockExchangeRateRepository } from "./dynamo/exchangeRateRepository";
import { mocked } from 'ts-jest/utils';

jest.mock('./dynamo/exchangeRateRepository')

test('it should return a rate for /convert/USD?to=CHF?amount=10', async () => {

    mocked(mockExchangeRateRepository).getExchangeRate.mockResolvedValue(2);

    const event = givenEvent({ currency: 'USD' }, { to: 'CHF', amount: '10' });

    const response = await handler(event);

    expect(response.body).toEqual('20fr')
})

test('it should return a rate for /convert/CHF?to=USD?amount=20', async () => {

    mocked(mockExchangeRateRepository).getExchangeRate.mockResolvedValue(.5);

    const event = givenEvent({ currency: 'CHF' }, { to: 'USD', amount: '20' });

    const response = await handler(event);

    expect(response.body).toEqual('$10')
})
const givenEvent = (
    pathParameters: APIGatewayProxyEventPathParameters,
    queryStringParameters: APIGatewayProxyEventQueryStringParameters): APIGatewayProxyEvent => {

    return {
        pathParameters,
        queryStringParameters
    } as APIGatewayProxyEvent
}