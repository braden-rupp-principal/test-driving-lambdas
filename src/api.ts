import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { ExchangeRateKey, exchangeRateRepository } from "./dynamo/exchangeRateRepository";

export const handler = async (_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const { currency } = _event.pathParameters;
    const { to, amount } = _event.queryStringParameters;


    const exchangeRate = await exchangeRateRepository.getExchangeRate(getExchangeRateKey(currency, to));

    const convertedAmount = exchangeRate * Number(amount);
    const body = to === 'USD'
        ? '$' + convertedAmount
        : convertedAmount + 'fr';

    return {
        statusCode: 200,
        body
    };
}

const getExchangeRateKey = (currency: string, to: string): ExchangeRateKey => {
    return `${currency}-${to}` as ExchangeRateKey;
}
