import { SNS } from 'aws-sdk';
import { exchangeRateRepository } from '../src/dynamo/exchangeRateRepository';
import { ENDPOINT, getSubcriptionForFunctionName } from './helper';

let topicArn;

beforeAll(async () => {
  topicArn = await getSubcriptionForFunctionName('test-subscription');
});

const sns = new SNS({ region: 'us-east-2', endpoint: ENDPOINT });

test('should insert a subscription', async () => {

  try {
    await sns.publish({
      TopicArn: topicArn,
      Message: JSON.stringify({ currency: 'CHF-USD', exchangeRate: '2' })
    }).promise();

    await new Promise(resolve => setTimeout(resolve, 2000));

    const actualExchangeRate = await exchangeRateRepository.getExchangeRate('CHF-USD');
    expect(actualExchangeRate).toEqual(2);

  } catch (e) {
    console.error(e)
    fail();
  }

});
