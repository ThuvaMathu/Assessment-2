const axios = require("axios");
const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
const FMP_API_KEY = process.env.FMP_API_KEY;
const RAPID_API_KEY = process.env.RAPID_API_KEY;

const getImages = async (req, res, next) => {
  const bdata = req.body.reqData;
  const options = {
    method: "GET",
    url: "https://pexelsdimasv1.p.rapidapi.com/v1/search",
    params: { query: bdata, locale: "en-US", per_page: "100", page: "1" },
    headers: {
      Authorization: "563492ad6f917000010000010bc59003765749af8c148450380a1309",
      "X-RapidAPI-Key": "c2ad33e329msh5ae5eed64b2c321p1501edjsn57f7ac1ab1f1",
      "X-RapidAPI-Host": "PexelsdimasV1.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      res.json(response.data);
      //console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
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

module.exports.getImages = getImages;
module.exports.getSymbol = getSymbol;
module.exports.getInfo = getInfo;
module.exports.getPrice = getPrice;
