import axios from 'axios';
import { exchangeRateRepository } from '../src/exchangeRateRepository';

const ENDPOINT = `http://${process.env.LOCALSTACK_HOSTNAME}:${process.env.MY_LOCALSTACKPORT}/restapis/${process.env.LAMBDA_ID}/prod/_user_request_/`;

afterEach(() => exchangeRateRepository.delete('CHF-USD').catch(console.error));

test('integration test', async () => {

  try {
    await exchangeRateRepository.insert('USD-CHF', '2');

    const response = await axios.get(ENDPOINT + '/USD?amount=10&to=CHF');

    expect(response.data).toEqual('20fr');
  } catch (e) {
    console.error(e)
    fail();
  }

});