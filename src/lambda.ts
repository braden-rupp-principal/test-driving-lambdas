import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { exchangeRateRepository } from "./exchangeRateRepository";

export async function handler(_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {


  exchangeRateRepository.getExchangeRate('CHF-USD');

  return {
    statusCode: 200,
    body: ''
  }

}
