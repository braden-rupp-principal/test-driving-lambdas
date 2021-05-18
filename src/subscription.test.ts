import { SNSEvent, SNSEventRecord } from "aws-lambda";
import { exchangeRateRepository as mockExchangeRateRepository } from "./dynamo/exchangeRateRepository";
import { handler } from './subscription';

jest.mock("./dynamo/exchangeRateRepository");

test('should insert a exchange rate into dynamo db', async () => {

});

const givenSnsEventWithMessage = (message: any): SNSEvent => {
    return {
        Records: [{
            Sns: {
                Message: JSON.stringify(message)
            },
        } as SNSEventRecord]
    };
}