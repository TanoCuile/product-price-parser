// Бізнес логіка, яка може бути використана в різних місцях.
// Така логіка посиння бути максимально простою і незалежною, 
// важлива логіка повинна мабути маломінлива
function isProductPriceIncreased(previousPrice, currentPrice) {
    if (previousPrice > 0 && currentPrice > 0) { 
        return previousPrice < currentPrice;
    }
    
    return false;
}

// Варіант використання бізнес логіки, це змінна частина коду
// тому ми повинні мало покладатись на такий функціонал 
function logProductPriceChange(previousPrice, currentPrice) {
    console.log(isProductPriceIncreased(previousPrice, currentPrice) ? 'Price increased': 'Price decreased');
}

const product1price1 = 100;
const product1price2 = 105;

logProductPriceChange(product1price1, product1price2);

const product2price1 = 200;
const product2price2 = 157;

logProductPriceChange(product2price1, product2price2);