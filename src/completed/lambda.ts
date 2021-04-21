import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { nameService } from "./nameService";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const firstName = event.pathParameters?.firstName;
    const lastName = event.queryStringParameters?.lastName;

    return {
        body: nameService.upperCaseName(`${firstName} ${lastName}`),
        statusCode: 200
    }
}


