import axios from 'axios';
import { SNS } from 'aws-sdk';

const ENDPOINT = `http://${process.env.LOCALSTACK_HOSTNAME}:${process.env.EDGE_PORT}/restapis/${process.env.LAMBDA_ID}/prod/_user_request_/`;

const sns = new SNS({
  apiVersion: '2019.11.21',
  region: 'us-east-2',
  endpoint: `http://${process.env.LOCALSTACK_HOSTNAME}:${process.env.EDGE_PORT}`
});

test('should insert a subscription', async () => {

  try {
    sns.publish({
      
    })
    await exchangeRateRepository.insert('USD-CHF', '2');

    const response = await axios.get(ENDPOINT + 'convert/USD?amount=10&to=CHF');

    expect(response.data).toEqual('20fr');
  } catch (e) {
    console.error(e)
    fail();
  }

});
