import { APIGatewayProxyEvent, APIGatewayProxyEventPathParameters, APIGatewayProxyEventQueryStringParameters, APIGatewayProxyResult } from "aws-lambda";
import { handler } from "./lambda";
import { nameService as mockNameService } from "./nameService";
import { mocked } from 'ts-jest/utils';
jest.mock('./nameService');


test('Returns a 200 response', async () => {

  const event = {} as APIGatewayProxyEvent;

  const response: APIGatewayProxyResult = await handler(event);

  expect(response.statusCode).toEqual(200);

});

test('returns capitalized firstname and lastname in response body', async () => {

  const event = {
    pathParameters: { firstName: 'Braden' } as APIGatewayProxyEventPathParameters,
    queryStringParameters: { lastName: 'Rupp' } as APIGatewayProxyEventQueryStringParameters
  } as APIGatewayProxyEvent;

  mocked(mockNameService.upperCaseName).mockReturnValue('BRADEN RUPP');
  
  const response: APIGatewayProxyResult = await handler(event);

  expect(response.body).toEqual('BRADEN RUPP');

});

test('calls name service to uppercase name', async () => {

  const event = {
    pathParameters: { firstName: 'Braden' } as APIGatewayProxyEventPathParameters,
    queryStringParameters: { lastName: 'Rupp' } as APIGatewayProxyEventQueryStringParameters
  } as APIGatewayProxyEvent;

  await handler(event);

  expect(mockNameService.upperCaseName).toHaveBeenCalledWith('Braden Rupp');
});
