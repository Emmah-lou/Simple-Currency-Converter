var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CurrencyConverter = function (_React$Component) {
  _inherits(CurrencyConverter, _React$Component);

  function CurrencyConverter(props) {
    _classCallCheck(this, CurrencyConverter);

    var _this = _possibleConstructorReturn(this, (CurrencyConverter.__proto__ || Object.getPrototypeOf(CurrencyConverter)).call(this, props));

    _this.toSelectedCurrency = function (rate, convertedCurrencyValue) {
      var selectedCurrencyValue = convertedCurrencyValue * rate;

      return selectedCurrencyValue.toFixed(2);
    };

    _this.toConvertedCurrency = function (rate, selectedCurrencyValue) {
      var convertedCurrencyValue = selectedCurrencyValue * rate;

      return convertedCurrencyValue.toFixed(2);
    };

    _this.handleChangeUSD = function (event) {
      event.preventDefault();
      var selectedCurrencyValue = event.target.selectedCurrencyValue;
      var rate = _this.state.rate;


      _this.setState({ selectedCurrencyValue: selectedCurrencyValue });
      _this.setState({ convertedCurrencyValue: _this.toConvertedCurrency(rate, selectedCurrencyValue) });
    };

    _this.handleChangeEUR = function (event) {
      event.preventDefault();
      var convertedCurrencyValue = event.target.convertedCurrencyValue;
      var rate = _this.state.rate;


      _this.setState({ convertedCurrencyValue: convertedCurrencyValue });
      _this.setState({ selectedCurrencyValue: _this.toSelectedCurrency(rate, convertedCurrencyValue) });
    };

    _this.updatedCurrencyToConvert = function (event) {
      event.preventDefault();
      var value = event.target.value;

      _this.setState({ convertedCurrency: value });
      if (value !== _this.state.selectedCurrency) {
        _this.updateExchangeRate();
      }
    };

    _this.UpdatedSelectedCurrency = function (event) {
      event.preventDefault();
      var value = event.target.value;

      _this.setState({ selectedCurrency: value });
      _this.updateExchangeRate();
      if (value !== _this.state.convertedCurrency) {
        _this.updateExchangeRate();
      }
    };

    _this.state = {
      selectedCurrency: "USD",
      convertedCurrency: "EUR",
      selectedCurrencyValue: 1,
      convertedCurrencyValue: 0,

      rate: 0.89
    };
    //binding the methods
    handleChangeUSD = _this.handleChangeUSD.bind(_this);
    handleChangeEUR = _this.handleChangeEUR.bind(_this);
    updatedCurrencyToConvert = _this.updatedCurrencyToConvert.bind(_this);
    UpdatedSelectedCurrency = _this.UpdatedSelectedCurrency.bind(_this);

    _this.updateExchangeRate = _this.updateExchangeRate.bind(_this);
    return _this;
  }
  //getting conversion rate from the API


  _createClass(CurrencyConverter, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
    //this.updateExchangeRate();

    //conversion methods from usd to euro and vice versa

    //methods to handle the change in the input fields and update the state of the USD

    //methods to handle the change in the input fields and update the state of the EUR

    //update the currency's being converted

    //update the currency's being converted

  }, {
    key: "updateExchangeRate",
    value: function updateExchangeRate() {
      var _this2 = this;

      var selectedCurrency = this.state.selectedCurrency;
      var convertedCurrency = this.state.convertedCurrency;
      var stockApiKey = "OMZGXK5NKES2KJV5";
      var webUrl = "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=" + selectedCurrency + "&to_currency=" + convertedCurrency + "&apikey=" + stockApiKey;
      fetch(webUrl).then(function (response) {
        return response.json();
      }).then(function (data) {
        console.log(data);
        var rate = data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];

        _this2.setState({ rate: rate });
        console.log(_this2.state.rate);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var style = {
        textAlign: "center"
      };
      return React.createElement(
        "div",
        { className: "main-container" },
        React.createElement(
          "div",
          { className: "currency-converter" },
          React.createElement(
            "h1",
            null,
            "Currency Converter"
          ),
          React.createElement(
            "h3",
            { style: style },
            this.state.selectedCurrency,
            " to ",
            this.state.convertedCurrency,
            " ",
            React.createElement("br", null),
            "Current Exchange Rate : ",
            this.state.rate
          ),
          React.createElement(
            "div",
            { className: "currency" },
            React.createElement(
              "div",
              { className: "usd" },
              React.createElement(
                "select",
                { onChange: this.UpdatedSelectedCurrency },
                React.createElement(
                  "option",
                  { value: "USD" },
                  "United States Dollar"
                ),
                React.createElement(
                  "option",
                  { value: "EUR" },
                  "EURO"
                ),
                React.createElement(
                  "option",
                  { value: "JPY" },
                  "Japanese Yen"
                ),
                React.createElement(
                  "option",
                  { value: "GBP" },
                  "British Pound Sterling"
                ),
                React.createElement(
                  "option",
                  { value: "CHF" },
                  "Swiss Franc"
                )
              ),
              React.createElement(
                "label",
                null,
                this.state.selectedCurrency
              ),
              React.createElement("input", {
                type: "number",
                value: this.state.selectedCurrencyValue,
                onChange: this.handleChangeUSD
              })
            ),
            React.createElement(
              "div",
              { className: "eur" },
              React.createElement(
                "select",
                { onChange: this.updatedCurrencyToConvert },
                React.createElement(
                  "option",
                  { value: "EUR" },
                  "EURO"
                ),
                React.createElement(
                  "option",
                  { value: "USD" },
                  "United States Dollar"
                ),
                React.createElement(
                  "option",
                  { value: "JPY" },
                  "Japanese Yen"
                ),
                React.createElement(
                  "option",
                  { value: "GBP" },
                  "British Pound Sterling"
                ),
                React.createElement(
                  "option",
                  { value: "CHF" },
                  "Swiss Franc"
                )
              ),
              React.createElement(
                "label",
                null,
                this.state.convertedCurrency
              ),
              React.createElement("input", {
                type: "number",
                value: this.state.convertedCurrencyValue,
                onChange: this.handleChangeEUR
              })
            )
          )
        )
      );
    }
  }]);

  return CurrencyConverter;
}(React.Component);

;
ReactDOM.render(React.createElement(CurrencyConverter, null), document.getElementById("root"));