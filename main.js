var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CurrencyConverter = function (_React$Component) {
  _inherits(CurrencyConverter, _React$Component);

  function CurrencyConverter(props) {
    _classCallCheck(this, CurrencyConverter);

    var _this = _possibleConstructorReturn(this, (CurrencyConverter.__proto__ || Object.getPrototypeOf(CurrencyConverter)).call(this, props));

    _this.updateValueOfMainCurrency = function (rate, convertedCurrencyValue) {
      var mainCurrencyValue = convertedCurrencyValue * rate;
      return mainCurrencyValue.toFixed(2);
    };

    _this.updateValueOfConvertedCurrency = function (rate, mainCurrencyValue) {
      var convertedCurrencyValue = mainCurrencyValue * rate;
      return convertedCurrencyValue.toFixed(2);
    };

    _this.handleInputChange = function (event) {
      event.preventDefault();
      var convertedCurrencyValue = event.target.convertedCurrencyValue;
      var mainCurrencyValue = event.target.mainCurrencyValue;
      var rate = _this.state.rate;

      _this.setState({ mainCurrencyValue: _this.updateValueOfMainCurrency(rate, convertedCurrencyValue) });
      _this.setState({ convertedCurrencyValue: _this.updateValueOfConvertedCurrency(rate, mainCurrencyValue) });
      _this.updateExchangeRate(_this.state.mainCurrency, _this.state.convertedCurrency);
    };

    _this.setStateForCurrency = function (event) {
      event.preventDefault();
      var mainCurrency = event.target.mainCurrency;
      var convertedCurrency = event.target.convertedCurrency;

      _this.setState({ mainCurrency: mainCurrency });
      _this.setState({ convertedCurrency: convertedCurrency });
    };

    _this.state = {
      mainCurrency: "USD",
      convertedCurrency: "EUR",
      mainCurrencyValue: 1,
      convertedCurrencyValue: 0,
      rate: 0.89
    };
    //binding the methods
    _this.updateValueOfMainCurrency = _this.updateValueOfMainCurrency.bind(_this);
    _this.updateValueOfConvertedCurrency = _this.updateValueOfConvertedCurrency.bind(_this);
    updateExchangeRate = _this.updateExchangeRate.bind(_this);
    _this.handleInputChange = _this.handleInputChange.bind(_this);
    _this.setStateForCurrency = _this.setStateForCurrency.bind(_this);
    return _this;
  }

  // converting the selected currency to the converted currency


  // converting the converted currency to the selected currency


  //methods to handle the change in the input fields and update the state of the USD


  //update the currency's being converted


  _createClass(CurrencyConverter, [{
    key: "updateExchangeRate",
    value: function updateExchangeRate(mainCurrency, convertedCurrency) {
      var _this2 = this;

      var mainCurrencyType = this.state.mainCurrency;
      var convertedCurrencyType = this.state.convertedCurrency;
      var stockApiKey = "OMZGXK5NKES2KJV5";
      var webUrl = "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=" + mainCurrencyType + "&to_currency=" + convertedCurrencyType + "&apikey=" + stockApiKey;

      if (mainCurrency && convertedCurrency) {
        fetch(webUrl).then(function (response) {
          return response.json();
        }).then(function (data) {
          console.log(data);
          var rate = data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
          _this2.setState({ rate: rate });

          console.log(_this2.state.rate + " rate");
          console.log(_this2.state.mainCurrency + " mainCurrency");
          console.log(_this2.state.convertedCurrency + " convertedCurrency");
        });
      }
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
            this.state.mainCurrency,
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
                { onChange: this.setStateForCurrency },
                React.createElement(
                  "option",
                  { value: "USD" },
                  "USD"
                ),
                React.createElement(
                  "option",
                  { value: "EUR" },
                  "EUR"
                ),
                React.createElement(
                  "option",
                  { value: "JPY" },
                  "JPY"
                ),
                React.createElement(
                  "option",
                  { value: "GBP" },
                  "GBP"
                ),
                React.createElement(
                  "option",
                  { value: "CHF" },
                  "CHF"
                )
              ),
              React.createElement(
                "label",
                null,
                this.state.mainCurrency
              ),
              React.createElement("input", {
                type: "number",
                value: this.state.mainCurrencyValue,
                onChange: this.handleInputChange
              })
            ),
            React.createElement(
              "div",
              { className: "eur" },
              React.createElement(
                "select",
                { onChange: this.setStateForCurrency },
                React.createElement(
                  "option",
                  { value: "EUR" },
                  "EUR"
                ),
                React.createElement(
                  "option",
                  { value: "USD" },
                  "USD"
                ),
                React.createElement(
                  "option",
                  { value: "JPY" },
                  "JPY"
                ),
                React.createElement(
                  "option",
                  { value: "GBP" },
                  "GBP"
                ),
                React.createElement(
                  "option",
                  { value: "CHF" },
                  "CHF"
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
                onChange: this.handleInputChange
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