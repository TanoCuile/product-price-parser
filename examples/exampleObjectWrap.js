// Перевіряємо дані та їх тип
console.log(123, typeof 123);

// Просто записуємо ці дані
const record = 123;
console.log(record, typeof record);

// Просто для перевірки
console.log('Перевіряємо наявність методу .getVal:', `"${typeof record.getVal}"`);

// Але, не все так просто
console.log(record.toString()); // Ми бачимо що ЧИСЛОВИЙ запис має інтерфейс об'єкту
console.log(record.valueOf());
// Ми не можемо переглянути всю інформацію про системні типи(такі як Number, String, Boolean)
// Але ми можемо цими типами керувати
Number.prototype.getVal = function () {return `Value of this record: ${this.valueOf()}`;};
// Перевіряємо
console.log('Перевіряємо наявність методу .getVal після оголошення в Number.prototype.getVal:', `"${typeof record.getVal}"`);
console.log(record.getVal());
// Зауважимо: створили ми запис в 5й стрічці, АЛЕ нові методи типу з'являються й надалі
