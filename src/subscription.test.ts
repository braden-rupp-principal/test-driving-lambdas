import { SNSEvent, SNSEventRecord } from "aws-lambda";
import { exchangeRateRepository as mockExchangeRateRepository } from "./dynamo/exchangeRateRepository";
import { handler } from './subscription';

jest.mock("./dynamo/exchangeRateRepository");

test('should insert a exchange rate into dynamo db', () => {

    const event = givenSnsEventWithMessage({ currency: 'CHF-USD', exchangeRate: '2' })

    handler(event);

    expect(mockExchangeRateRepository.insert).toHaveBeenCalledWith('CHF-USD', '2');

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