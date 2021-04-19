# currency-kata

1. Make an api with a path variable `currency` (USD | CHF) that accepts query paramters: `amount` and `to` that returns a 200 response with the formated converted amount in the body given an exchange rate via the `exchangeRateRepository`

Example: 

`/${currency}?amount=${amount}&to=${currency}`

```

/
GET /USD?amount=10&to=CHF
    20fr

GET /CHF?amount=10&to=USD
    $5
}

```