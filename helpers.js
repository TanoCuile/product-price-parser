const {FLAG_PRICE_HUGE_DECREASE, FLAG_PRICE_DECREASE, FLAG_PRICE_INCREASE} = require('./constants');

function getProductFlag(prevPrice, latestPrice) {
  //   let productFlag = NO_FLAG;

  if (prevPrice > latestPrice) {
    if (getIsHugeDecrease(prevPrice, latestPrice)) {
      return FLAG_PRICE_HUGE_DECREASE;
    } else {
      return FLAG_PRICE_DECREASE;
    }
  }
  return FLAG_PRICE_INCREASE;
}

function getIsHugeDecrease(prevPrice, latestPrice) {
  return (prevPrice - latestPrice) / prevPrice > 0.1;
}

module.exports = {
    getProductFlag,
    getIsHugeDecrease
}
