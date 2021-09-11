const Binance = require('node-binance-api');
const { apiKey, secret, operation_list } = require('./config.json');
const Dao = require('./dao');
const Database = require('better-sqlite3');
const db = new Database('sqlite.db', { verbose: console.log });
const sendMail = require('./sendMail');

const binance = new Binance().options({
  APIKEY: apiKey,
  APISECRET: secret,
  recvWindow: 10000
});
const dao = new Dao(db);
// dao.save({
//   symbol: 'BNBUSDT',
//   base_price: 421.199,
//   holding: 0,
//   updated_at: Date.now()
// });

// console.log(data);
// const db = new sqlite3.Database("sqlite.db", function(err) {
//   if (err) {
//     console.error(err);
//     return;
//   }
// });



const main = async () => {
  const base = dao.get({
    symbols: operation_list
  });
  const prices = (await binance.futuresPrices())
  const result = base.map(({symbol, base_price,holding, updated_at }) => ({
    symbol,
    base_price,
    holding,
    updated_at,
    movement: (prices[symbol] - base_price) / base_price
  }))

  hightestItem = result.find(item => item.movement === Math.max(...result.map(el => el.movement)))
  holdingItem = result.find(item => item.holding === 1)
  console.log('hightestItem', hightestItem);
  console.log('holdingItem', holdingItem);
  if (hightestItem.movement - holdingItem.movement > 0.03) {
    sendMail('tszhanghb@126.com', '轮动提醒', `${hightestItem.symbol}比${holdingItem.symbol}的涨幅高${(hightestItem.movement -  holdingItem.movement) * 100}%`)
    // console.info( await binance.futuresMarketBuy( holdingItem.symbol, holdingItem.position_mount ) );
    // console.info( await binance.futuresMarketSell( hightestItem.symbol,  holdingItem.position_mount * prices[holdingItem.symbol] / prices[hightestItem.symbol]) );
  }
}

setInterval(main, 60000);

