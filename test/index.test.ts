import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { handler } from "../src/index"

it('should return 200', async () => {
    const event = {} as APIGatewayProxyEvent;
    const response = await whenHandlerIsCalled(event);

    expect(response.statusCode).toBe(200)
})

xit('should return a status in response', async () => {
    const event = {} as APIGatewayProxyEvent;
    const response = await whenHandlerIsCalled(event);

    expect(response.body).toEqual({message: 'Hello World'} )
})

const whenHandlerIsCalled = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    //@ts-ignore
    return await handler(event);
} 