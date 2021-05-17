import { SNSEvent, SNSEventRecord } from "aws-lambda";
import { exchangeRateRepository as mockExchangeRateRepository } from "./dynamo/exchangeRateRepository";
import { handler } from './subscription';

test('should insert a exchange rate into dynamo db', () => {

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