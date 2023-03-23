class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usd: 0,
      eur: 0,
      rate: 0.89
    };
    //binding the methods
    handleChangeUSD = this.handleChangeUSD.bind(this);
    handleChangeEUR = this.handleChangeEUR.bind(this);
    this.updateExchangeRate = this.updateExchangeRate.bind(this);
  }
  //getting conversion rate from the API
  componentDidMount() {
    this.updateExchangeRate();
  }
  //conversion methods from usd to euro and vice versa
  toUSD = (rate, eur) => {
    let usd = eur * (1 / rate);
    return usd.toFixed(2);
  };
  toEUR = (rate, usd) => {
    let eur = usd * rate;
    return eur.toFixed(2);
  };
  //methods to handle the change in the input fields and update the state of the USD
  handleChangeUSD = (event) => {
    event.preventDefault();
    const { value } = event.target;
    const { rate } = this.state;
    this.setState({ usd: value });
    this.setState({ eur: this.toEUR(rate, value) });
  };
  //methods to handle the change in the input fields and update the state of the EUR
  handleChangeEUR = (event) => {
    event.preventDefault();
    const { value } = event.target;
    const { rate } = this.state;  
    this.setState({ eur: value });
    this.setState({ usd: this.toUSD(rate, value) });
  };
  updateExchangeRate() {
    const stockApiKey = "OMZGXK5NKES2KJV5";
    const webUrl = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=EUR&apikey=${stockApiKey}`;
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
            <h3 style={style}>USD to EUR <br />Current Exchange Rate : {this.state.rate}</h3>
          <div className="currency">
            <div className="usd">
              <label>$-USD-$</label>
              <input
                type="number"
                value={this.state.usd}
                onChange={this.handleChangeUSD}
              />
            </div>
            <div className="eur">
            <label>€-EUR-€</label>
              <input
                type="number"
                value={this.state.eur}
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