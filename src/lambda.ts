import { exchangeRateRepository } from './ exchangeRateRepository';

const handler = async (event) => {

  console.log("request:", JSON.stringify(event, undefined, 2));

  const stuff = await exchangeRateRepository.getExchangeRate();

  console.log('STUFFFF', stuff);

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: stuff
  };
};

module.exports = { handler };