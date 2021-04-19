import axios from 'axios';
import { exchangeRateRepository } from '../src/exchangeRateRepository';

const ENDPOINT = `http://${process.env.LOCALSTACK_HOSTNAME}:4566/restapis/${process.env.LAMBDA_ID}/prod/_user_request_/`;

afterEach(() => exchangeRateRepository.delete('CHF-USD').catch(console.error));

test('integration test', async () => {

  try {
    await exchangeRateRepository.insert('CHF-USD', '2:1');

    const response = await axios.get(ENDPOINT);

    expect(response.data).toEqual('2:1');
  } catch (e) {
    console.error(e)
    fail();
  }
  
});