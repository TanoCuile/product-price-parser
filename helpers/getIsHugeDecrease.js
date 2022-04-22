exports.getIsHugeDecrease = (basePrice, newPrice) => {
  if (!basePrice || !newPrice) {
    return 0;
  }

  // Ми дістаємо модуль різниці і визначаємо відсоток зміни відносно базової ціни
  return Math.abs(basePrice - newPrice) / basePrice > 0.1;
}
