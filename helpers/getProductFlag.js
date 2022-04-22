const {
  FLAG_PRICE_HUGE_DECREASE,
  FLAG_PRICE_DECREASE,
  FLAG_PRICE_INCREASE,
} = require("../constants");
const { getIsHugeDecrease } = require("./index");

exports.getProductFlag = (prevPrice, latestPrice) => {
  //   let productFlag = NO_FLAG;
  if (prevPrice > latestPrice) {
    if (getIsHugeDecrease(prevPrice, latestPrice)) {
      return FLAG_PRICE_HUGE_DECREASE;
    } else {
      return FLAG_PRICE_DECREASE;
    }
  }
  return FLAG_PRICE_INCREASE;
};
