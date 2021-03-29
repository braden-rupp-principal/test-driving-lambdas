import {getStatus} from './service/accountStatusService';
import { APIGatewayProxyEvent, APIGatewayProxyHandler,APIGatewayProxyResult } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const { firstName, lastName } = getParameters(event);

    const status = getStatus(firstName, lastName);
    
    return {
        statusCode: 200,
        body: JSON.stringify({ status })
    }

}

const getParameters = (event: APIGatewayProxyEvent): {firstName: string, lastName: string} => {
    const firstName = event.pathParameters?.name;
    const lastName = event.queryStringParameters?.lastName;
    return { lastName, firstName};
}
