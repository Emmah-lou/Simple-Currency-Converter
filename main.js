var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CurrencyConverter = function (_React$Component) {
  _inherits(CurrencyConverter, _React$Component);

  function CurrencyConverter(props) {
    _classCallCheck(this, CurrencyConverter);

    var _this = _possibleConstructorReturn(this, (CurrencyConverter.__proto__ || Object.getPrototypeOf(CurrencyConverter)).call(this, props));

    _this.toUSD = function (rate, eur) {
      var usd = eur * (1 / rate);
      return usd.toFixed(2);
    };

    _this.toEUR = function (rate, usd) {
      var eur = usd * rate;
      return eur.toFixed(2);
    };

    _this.handleChangeUSD = function (event) {
      event.preventDefault();
      var value = event.target.value;
      var rate = _this.state.rate;

      _this.setState({ usd: value });
      _this.setState({ eur: _this.toEUR(rate, value) });
    };

    _this.handleChangeEUR = function (event) {
      event.preventDefault();
      var value = event.target.value;
      var rate = _this.state.rate;

      _this.setState({ eur: value });
      _this.setState({ usd: _this.toUSD(rate, value) });
    };

    _this.state = {
      usd: 0,
      eur: 0,
      rate: 0.89
    };
    //binding the methods
    handleChangeUSD = _this.handleChangeUSD.bind(_this);
    handleChangeEUR = _this.handleChangeEUR.bind(_this);
    return _this;
  }
  //getting conversion rate from the API


  _createClass(CurrencyConverter, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var stockApiKey = "OMZGXK5NKES2KJV5";
      var webUrl = "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=EUR&apikey=" + stockApiKey;
      fetch(webUrl).then(function (response) {
        return response.json();
      }).then(function (data) {
        console.log(data);
        var rate = data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];

        _this2.setState({ rate: rate });
        console.log(_this2.state.rate);
      });
    }
    //conversion methods from usd to euro and vice versa

    //methods to handle the change in the input fields and update the state of the USD

    //methods to handle the change in the input fields and update the state of the EUR

  }, {
    key: "render",
    value: function render() {
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
            null,
            "USD to EUR ",
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
                "label",
                null,
                "$-USD-$"
              ),
              React.createElement("input", {
                type: "number",
                value: this.state.usd,
                onChange: this.handleChangeUSD
              })
            ),
            React.createElement(
              "div",
              { className: "eur" },
              React.createElement(
                "label",
                null,
                "\u20AC-EUR-\u20AC"
              ),
              React.createElement("input", {
                type: "number",
                value: this.state.eur,
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