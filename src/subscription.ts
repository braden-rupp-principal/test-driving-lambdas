import { SNSEvent } from "aws-lambda";
import { exchangeRateRepository } from "./dynamo/exchangeRateRepository";

export const handler = async (_event: SNSEvent) => {

    const message = _event.Records[0].Sns.Message;
    const { currency, exchangeRate } = JSON.parse(message);
    await exchangeRateRepository.insert(currency, exchangeRate);

}