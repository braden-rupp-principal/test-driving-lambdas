import axios from 'axios';
import { exchangeRateRepository } from '../src/dynamo/exchangeRateRepository';

const ENDPOINT = `http://${process.env.LOCALSTACK_HOSTNAME}:${process.env.EDGE_PORT}/restapis/${process.env.LAMBDA_ID}/prod/_user_request_/`;

afterEach(() => exchangeRateRepository.delete('USD-CHF').catch(console.error));

xtest('should return USD to CHF amount when exchangeRate is 2', async () => {

  try {
    await exchangeRateRepository.insert('USD-CHF', '2');

    const response = await axios.get(ENDPOINT + 'convert/USD?amount=10&to=CHF');

    expect(response.data).toEqual('20fr');
  } catch (e) {
    console.error(e)
    fail();
  }

});

xtest('should return CHF to USD amount when exchange rate is .5', async () => {

  try {
    await exchangeRateRepository.insert('CHF-USD', '.5');

    const response = await axios.get(ENDPOINT + 'convert/CHF?amount=10&to=USD');

    expect(response.data).toEqual('$5');
  } catch (e) {
    console.error(e)
    fail();
  }

});