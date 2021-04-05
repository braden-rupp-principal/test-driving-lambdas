# currency-kata

1. Make an api with a path variable `currency` (USD | CHF) that accepts query paramters: `amount`, `to`, and`exchange` that returns a 200 response with the formated converted amount in the body


Example: 

`/${currency}?amount=${amount}&to=${currency}&exchange=${rate}`

```

/
GET /USD?amount=10&to=CHF&exchange=1:2
    
    20fr

GET /CHF?amount=10&to=USD&exchange=2:1
    
    $5
}

```


2. Convert the response body from a string to a object in the format:

```
{
    domestic: $10,
    foreign: 20fr
}
```