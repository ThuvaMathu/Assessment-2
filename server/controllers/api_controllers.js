const axios = require("axios");
const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
const FMP_API_KEY = process.env.FMP_API_KEY;
const RAPID_API_KEY = process.env.RAPID_API_KEY;

const getNews = async (req, res, next) => {
  const bdata = req.body;
  const options = {
    method: "GET",
    url: "https://free-news.p.rapidapi.com/v1/search",
    params: { q: bdata.symbol, lang: "en" },
    headers: {
      //"X-RapidAPI-Key": "4f192eeccemsh43fef53656ace90p1fb5a8jsn5d4aa797ea54",
      "X-RapidAPI-Key": RAPID_API_KEY,

      "X-RapidAPI-Host": "free-news.p.rapidapi.com",
    },
  };
  axios
    .request(options)
    .then(function (response) {
      res.json(response.data);
      console.log("\u001b[1;32m  successfully sent NEWS response\u001b[0m");
    })
    .catch(function (error) {
      res.json({ status: 500 });
      console.log("\u001b[1;31m Red Error sent NEWS response \u001b[0m");
    });
};

const getSymbol = async (req, res) => {
  const bdata = req.body;
  //const FMP_API_KEY = "f09e040716cb0920a7927288d97a5067";

  const options = {
    method: "GET",
    url: `https://financialmodelingprep.com/api/v3/${bdata.exchange}?apikey=${FMP_API_KEY}`,
  };
  axios
    .request(options)
    .then(function (response) {
      res.json(response.data);
      console.log("\u001b[1;32m  successfully sent SYMBOL response\u001b[0m");
    })
    .catch(function (error) {
      res.json({ status: 500 });
      console.log("\u001b[1;31m Red Error sent SYMBOL response \u001b[0m");
    });
};

const getPrice = async (req, res) => {
  const bdata = req.body;
  //const FINNHUB_API_KEY = "c96jtgqad3icjtt5skjg";

  const options = {
    method: "GET",
    url: `https://finnhub.io/api/v1/quote?symbol=${bdata.symbol}&token=${FINNHUB_API_KEY}`,
  };
  axios
    .request(options)
    .then(function (response) {
      res.json(response.data);
      console.log("\u001b[1;32m  successfully sent PRICE response\u001b[0m");
    })
    .catch(function (error) {
      res.json({ status: 500 });
      console.log("\u001b[1;31m Red Error sent PRICE response \u001b[0m");
    });
};

const getInfo = async (req, res) => {
  const bdata = req.body;
  //const FINNHUB_API_KEY = "c96jtgqad3icjtt5skjg";

  const options = {
    method: "GET",
    url: `https://finnhub.io/api/v1/stock/profile2?symbol=${bdata.symbol}&token=${FINNHUB_API_KEY}`,
  };
  axios
    .request(options)
    .then(function (response) {
      res.json(response.data);

      console.log("\u001b[1;32m  successfully sent INFO response\u001b[0m");
    })
    .catch(function (error) {
      res.json({ status: 500 });
      console.log("\u001b[1;31m Red Error sent INFO response \u001b[0m");
    });
};

const getChart = async (req, res) => {
  const bdata = req.body;
  const options = {
    method: "GET",
    url: "https://chart-img.p.rapidapi.com/mini-chart",
    params: {
      symbol: bdata.symbol,
      interval: bdata.period,
      theme: "dark",
      width: "800",
      height: "400",
      format: "jpeg",
    },
    headers: {
      //"X-RapidAPI-Key": "c2ad33e329msh5ae5eed64b2c321p1501edjsn57f7ac1ab1f1",
      //"X-RapidAPI-Key": "4f192eeccemsh43fef53656ace90p1fb5a8jsn5d4aa797ea54",
      "X-RapidAPI-Key": RAPID_API_KEY,
      "X-RapidAPI-Host": "chart-img.p.rapidapi.com",
    },
    responseType: "arraybuffer",
  };
  axios
    .request(options)
    .then(function (response) {
      res.json(response.data);
      console.log("\u001b[1;32m  successfully sent CHART response\u001b[0m");
    })
    .catch(function (error) {
      res.json(error.response.data);
      console.log(
        "\u001b[1;31m Red Error sent CHART response \u001b[0m",
        error
      );
    });
};

module.exports.getNews = getNews;
module.exports.getSymbol = getSymbol;
module.exports.getInfo = getInfo;
module.exports.getPrice = getPrice;
module.exports.getChart = getChart;
