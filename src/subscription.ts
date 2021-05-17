import { SNSEvent } from "aws-lambda";
import { exchangeRateRepository } from "./dynamo/exchangeRateRepository";

export const handler = async (_event: SNSEvent) => {

    console.log(JSON.stringify(_event));
    const message = _event.Records[0].Sns.Message;
    const { currency, exchangeRate } = JSON.parse(message);

    console.log(message);

    try {
        await exchangeRateRepository.insert(currency, exchangeRate);
    }
    catch (e) {
        console.error(e);
        throw e;
    }
}