// Problem 2
// Task: Implement a datasource connector to abstract away data retrieval and manipulation from the `ViewControllers`.  
// Your solution shall use only [Vanilla JavaScript](http://vanilla-js.com).  

class Price {
  constructor(buy, sell, pair) {
    this.buy = buy;
    this.sell = sell;
    this.pair = pair;
  }

  mid() {
    return (this.buy + this.sell) / 200;
  }

  quote() {
    return this.pair.substring(3);
  }
}

class Datasource {
  getPrices() {
    return fetch("https://static.ngnrs.io/test/prices")
      .then(response => {
        return response.json();
      })
      .then(result => {
        let prices = [];
        let data = result["data"]["prices"];
        data.forEach(item => prices.push(new Price(item["buy"], item["sell"], item["pair"])));
        return prices;
      })
  }
}

let ds = new Datasource();
ds.getPrices()
    .then(prices => {
        prices.forEach(price => {
            console.log(`Mid price for ${ price.pair } is ${ price.mid() } ${ price.quote() }.`);
        });
    }).catch(error => {
        console.err(error);
    });