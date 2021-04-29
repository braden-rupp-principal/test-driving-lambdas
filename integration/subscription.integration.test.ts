import { SNS } from 'aws-sdk';
import { exchangeRateRepository } from '../src/dynamo/exchangeRateRepository';
import { getSubcriptionForFunctionName } from './helper';


let topicArn;

beforeAll(async () => {
  topicArn = await getSubcriptionForFunctionName('test-name');
  console.log('TOPIC', topicArn)
});

const sns = new SNS({
  apiVersion: '2019.11.21',
  region: 'us-east-2',
  endpoint: `http://${process.env.LOCALSTACK_HOSTNAME}:${process.env.EDGE_PORT}`
});

test('should insert a subscription', async () => {

  try {
    await sns.publish({
      TopicArn: topicArn,
      Message: JSON.stringify({ currency: 'CHF-USD', exchangeRate: '8' })
    }).promise();

    await new Promise(resolve => setTimeout(resolve, 2000));

    const actualExchangeRate = await exchangeRateRepository.getExchangeRate('CHF-USD');
    expect(actualExchangeRate).toEqual('8');

  } catch (e) {
    console.error(e)
    fail();
  }

});
