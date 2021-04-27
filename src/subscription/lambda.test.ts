
import { SNSEvent, SNSEventRecord } from 'aws-lambda';
import { exchangeRateRepository as mockExchangeRateRepository } from '../dynamo/exchangeRateRepository';
import { handler } from './lambda';


jest.mock('../dynamo/exchangeRateRepository');

test('should insert the new exchange rate', async () => {

    const snsEvent = givenSnsEventWithMessage({ currency: 'CHF-USD', exchangeRate: '3' });
    await handler(snsEvent);

    expect(mockExchangeRateRepository.insert).toHaveBeenCalledWith('CHF-USD', '3');

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