

class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCurrency: "USD",
      convertedCurrency: "EUR",
      selectedCurrencyValue: 1,
      convertedCurrencyValue: 0,

      rate: 0.89
    };
    //binding the methods
    handleChangeUSD = this.handleChangeUSD.bind(this);
    handleChangeEUR = this.handleChangeEUR.bind(this);
    updatedCurrencyToConvert = this.updatedCurrencyToConvert.bind(this);
    UpdatedSelectedCurrency = this.UpdatedSelectedCurrency.bind(this);

    this.updateExchangeRate = this.updateExchangeRate.bind(this);
  }
  //getting conversion rate from the API
  componentDidMount() {
    //this.updateExchangeRate();

  }
  //conversion methods from usd to euro and vice versa
  toSelectedCurrency = (rate, convertedCurrencyValue) => {
    let selectedCurrencyValue = convertedCurrencyValue * rate;

    return selectedCurrencyValue.toFixed(2);

  };
  toConvertedCurrency = (rate, selectedCurrencyValue) => {
    let convertedCurrencyValue = selectedCurrencyValue * rate;

    return convertedCurrencyValue.toFixed(2);

  };
  //methods to handle the change in the input fields and update the state of the USD
  handleChangeUSD = (event) => {
    event.preventDefault();
    const { selectedCurrencyValue } = event.target;
    const { rate } = this.state;
    
    this.setState({ selectedCurrencyValue: selectedCurrencyValue });
    this.setState({ convertedCurrencyValue: this.toConvertedCurrency(rate, selectedCurrencyValue) });
  };
  //methods to handle the change in the input fields and update the state of the EUR
  handleChangeEUR = (event) => {
    event.preventDefault();
    const { convertedCurrencyValue } = event.target;
    const { rate } = this.state;
      
    this.setState({ convertedCurrencyValue: convertedCurrencyValue });
    this.setState({ selectedCurrencyValue: this.toSelectedCurrency(rate, convertedCurrencyValue) });
  };
  //update the currency's being converted
  updatedCurrencyToConvert = (event) => {
    event.preventDefault();
    const { value } = event.target;
    this.setState({ convertedCurrency: value });
    if (value !== this.state.selectedCurrency) {
      this.updateExchangeRate();
    }

  };
  //update the currency's being converted
  UpdatedSelectedCurrency = (event) => {
    event.preventDefault();
    const { value } = event.target;
    this.setState({ selectedCurrency: value });
    this.updateExchangeRate();
    if (value !== this.state.convertedCurrency) {
      this.updateExchangeRate();
    }

  };

  updateExchangeRate() {
    const selectedCurrency = this.state.selectedCurrency;
    const convertedCurrency = this.state.convertedCurrency;
    const stockApiKey = "OMZGXK5NKES2KJV5";
    const webUrl = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${selectedCurrency}&to_currency=${convertedCurrency}&apikey=${stockApiKey}`;
    fetch(webUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let rate = data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
      
        this.setState({ rate: rate });
        console.log(this.state.rate);
      });
  }
  
  render() {
    const style = {
      textAlign: "center"
    };  
    return (
      <div className="main-container">
        <div className="currency-converter">
            <h1>Currency Converter</h1>
            <h3 style={style}>{this.state.selectedCurrency} to {this.state.convertedCurrency} <br />Current Exchange Rate : {this.state.rate}</h3>
          <div className="currency">
            <div className="usd">
              <select onChange={this.UpdatedSelectedCurrency}>
                <option value="USD">United States Dollar</option>
                <option value="EUR">EURO</option>
                <option value="JPY">Japanese Yen</option>
                <option value="GBP">British Pound Sterling</option>
                <option value="CHF">Swiss Franc</option>
              </select>
              <label>{this.state.selectedCurrency}</label>
              <input
                type="number"
                value={this.state.selectedCurrencyValue}
                onChange={this.handleChangeUSD}
              />
            </div>
            <div className="eur">
              <select onChange={this.updatedCurrencyToConvert}>
                <option value="EUR">EURO</option>
                <option value="USD">United States Dollar</option>
                <option value="JPY">Japanese Yen</option>
                <option value="GBP">British Pound Sterling</option>
                <option value="CHF">Swiss Franc</option>
              </select>
              <label>{this.state.convertedCurrency}</label>
              <input
                type="number"
                value={this.state.convertedCurrencyValue}
                onChange={this.handleChangeEUR}
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