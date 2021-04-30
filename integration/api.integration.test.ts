import axios from 'axios';
import { exchangeRateRepository } from '../src/dynamo/exchangeRateRepository';
import { getLambdaEndpointRoot } from './helper';


let endpoint;
beforeAll(async () => endpoint = await getLambdaEndpointRoot());

xtest('should return USD to CHF amount when exchangeRate is 2', async () => {

  try {
    await exchangeRateRepository.insert('USD-CHF', '2');

    const response = await axios.get(endpoint + 'convert/USD?amount=10&to=CHF');

    expect(response.data).toEqual('20fr');
  } catch (e) {
    console.error(e)
    fail();
  }

});

xtest('should return CHF to USD amount when exchange rate is .5', async () => {

  try {
    await exchangeRateRepository.insert('CHF-USD', '.5');

    const response = await axios.get(endpoint + 'convert/CHF?amount=10&to=USD');

    expect(response.data).toEqual('$5');
  } catch (e) {
    console.error(e)
    fail();
  }

});
