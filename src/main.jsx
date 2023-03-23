class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainCurrency: "USD",
      convertedCurrency: "EUR",
      mainCurrencyValue: 1,
      convertedCurrencyValue: 0,
      rate: 0.89
    };
    //binding the methods
    this.updateValueOfMainCurrency = this.updateValueOfMainCurrency.bind(this);
    this.updateValueOfConvertedCurrency = this.updateValueOfConvertedCurrency.bind(this);
    updateExchangeRate = this.updateExchangeRate.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.setStateForCurrency = this.setStateForCurrency.bind(this);
  }



  // converting the selected currency to the converted currency
  updateValueOfMainCurrency = (rate, convertedCurrencyValue) => {
    let mainCurrencyValue = convertedCurrencyValue * rate;
    return mainCurrencyValue.toFixed(2);
  };


  // converting the converted currency to the selected currency
  updateValueOfConvertedCurrency = (rate, mainCurrencyValue) => {
    let convertedCurrencyValue = mainCurrencyValue * rate;
    return convertedCurrencyValue.toFixed(2);
  };



  //methods to handle the change in the input fields and update the state of the USD
  handleInputChange = (event) => {
    event.preventDefault();
    const { convertedCurrencyValue } = event.target;
    const { mainCurrencyValue } = event.target;
    const { rate } = this.state;
    this.setState({ mainCurrencyValue: this.updateValueOfMainCurrency(rate, convertedCurrencyValue) });
    this.setState({ convertedCurrencyValue: this.updateValueOfConvertedCurrency(rate, mainCurrencyValue) });
    this.updateExchangeRate(this.state.mainCurrency, this.state.convertedCurrency);
    
  };
  
  //update the currency's being converted
  setStateForCurrency = (event) => {
    event.preventDefault();
    const { mainCurrency } = event.target;
    const { convertedCurrency } = event.target;
    this.setState({ mainCurrency: mainCurrency });
    this.setState({ convertedCurrency: convertedCurrency });
    
  };
  updateExchangeRate(mainCurrency, convertedCurrency) {
    const mainCurrencyType = this.state.mainCurrency;
    const convertedCurrencyType = this.state.convertedCurrency;
    const stockApiKey = "OMZGXK5NKES2KJV5";
    const webUrl = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${mainCurrencyType}&to_currency=${convertedCurrencyType}&apikey=${stockApiKey}`;

    if(mainCurrency && convertedCurrency) {
      fetch(webUrl)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          let rate = data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
          this.setState({ rate: rate });
          
          
          console.log(this.state.rate + " rate");
          console.log(this.state.mainCurrency + " mainCurrency");
          console.log(this.state.convertedCurrency + " convertedCurrency");
          
        });
    }

  }


  render() {
    const style = {
      textAlign: "center"
    };  
    return (
      <div className="main-container">
        <div className="currency-converter">
            <h1>Currency Converter</h1>
            <h3 style={style}>{this.state.mainCurrency} to {this.state.convertedCurrency} <br />Current Exchange Rate : {this.state.rate}</h3>
          <div className="currency">
            <div className="usd">
              <select onChange={this.setStateForCurrency}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="JPY">JPY</option>
                <option value="GBP">GBP</option>
                <option value="CHF">CHF</option>
              </select>
              <label>{this.state.mainCurrency}</label>
              <input
                type="number"
                value={this.state.mainCurrencyValue}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="eur">
              <select onChange={this.setStateForCurrency}>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="JPY">JPY</option>
                <option value="GBP">GBP</option>
                <option value="CHF">CHF</option>
              </select>
              <label>{this.state.convertedCurrency}</label>
              <input
                type="number"
                value={this.state.convertedCurrencyValue}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
};
ReactDOM.render(
  <CurrencyConverter />,
  document.getElementById("root")
);