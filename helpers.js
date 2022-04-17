const {
  FLAG_PRICE_HUGE_DECREASE,
  FLAG_PRICE_DECREASE,
  FLAG_PRICE_INCREASE,
} = require("./constants");

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

function getIsHugeDecrease(basePrice, newPrice) {
  if (!basePrice || !newPrice) {
    return 0;
  }

  // Ми дістаємо модуль різниці і визначаємо відсоток зміни відносно базової ціни
  return Math.abs(basePrice - newPrice) / basePrice > 0.1;
}

module.exports = {
  getProductFlag,
  getIsHugeDecrease,
};
