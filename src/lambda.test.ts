import { APIGatewayProxyEvent, APIGatewayProxyEventPathParameters, APIGatewayProxyEventQueryStringParameters, APIGatewayProxyResult } from "aws-lambda";
import { mocked } from 'ts-jest/utils';
import { exchangeRateRepository as mockExchangeRateRepository } from "./exchangeRateRepository";
import { handler } from "./lambda";

jest.mock('./exchangeRateRepository');


test('should return 200', async () => {
  const event = {} as APIGatewayProxyEvent;
  const response: APIGatewayProxyResult = await handler(event);
  expect(response.statusCode).toEqual(200);
});

test('should get exchange rate for CHF - USD', async () => {

  mocked(mockExchangeRateRepository.getExchangeRate).mockResolvedValue('2:1');

  const event = {
    pathParameters: { currency: 'CHF' } as APIGatewayProxyEventPathParameters,
    queryStringParameters: { to: 'USD' } as APIGatewayProxyEventQueryStringParameters
  } as APIGatewayProxyEvent;

  await handler(event);

  expect(mockExchangeRateRepository.getExchangeRate).toHaveBeenCalledWith('CHF-USD');
});

test('should get exchange rate for CHF - USD', async () => {

  mocked(mockExchangeRateRepository.getExchangeRate).mockResolvedValue('2:1');

  const event = {
    pathParameters: { currency: 'CHF' } as APIGatewayProxyEventPathParameters,
    queryStringParameters: { to: 'USD' } as APIGatewayProxyEventQueryStringParameters
  } as APIGatewayProxyEvent;

  await handler(event);

  expect(mockExchangeRateRepository.getExchangeRate).toHaveBeenCalledWith('CHF-USD');
});