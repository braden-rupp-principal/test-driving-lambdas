import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { ExchangeRateKey, exchangeRateRepository } from "./dynamo/exchangeRateRepository";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return null
}

