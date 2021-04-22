# currency-kata

1. Make an api with a path variable `currency` (USD | CHF) that accepts query paramters: `amount` and `to` (USD | CHF) that returns a 200 response with the formated converted amount in the body given an exchange rate (e.g. ".5" | "2" ) via the `exchangeRateRepository`

Example: 

`/convert/${currency}?amount=${amount}&to=${currency}`

``` bash

# exchange rates: CHF-USD=".5" USD-CHF="2"

GET /convert/USD?amount=10&to=CHF
    {
        statusCode: 200,
        body: "20fr"
    }

GET /convert/CHF?amount=10&to=USD
     {
        statusCode: 200,
        body: "$5"
    }
}

```
