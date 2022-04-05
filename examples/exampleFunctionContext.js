function logggingGlobalContext() {
  // Всі ці записи відсутні на момент оголошення функції
  console.log("C1:", C1, "V1:", V1, "L1:", L1);
  // ПРОТЕ при викликові функції - змінні уже існують і додані до контексту
}

// Насправді є прихований аргутент: this
// тому оголошення функції виглядає: `function loggingLocalContext(this, value)`
function loggingThisContext(value) {
  // Всі ці записи відсутні на момент оголошення функції
  console.log("C1:", this.C1, "V1:", this.V1, "L1:", this.L1);
  // ПРОТЕ при викликові функції - змінні уже існують і додані до контексту
  if (value) {
    console.log("LOG value > ", value);
  }
}

// console.log(C1); // Не оголошено до поточної стрічки
console.log(V1); // Назва оголошена, але значення ще відсутнє
// console.log(L1); // Не оголошено до поточної стрічки

// Додаємо записи в глобальний контекст
const C1 = "C1";
var V1 = "V1";
let L1 = "L1";
// Усі записи уже оголошено і додано до контексту

logggingGlobalContext();
loggingThisContext();
console.log('-------------------------');
// Можемо викликати функцію за посиланням(назвою) і визначити thisContext
// Для цього є методи .apply, .call (різниця в передаванні аргументів)
logggingGlobalContext.apply({ C1: "C2", V1: "V2", L1: "L2" });
loggingThisContext.apply({ C1: "C2", V1: "V2", L1: "L2" }, [
  "Value from .apply",
]);
loggingThisContext.call({ C1: "C2", V1: "V2", L1: "L2" }, "Value from .call");
loggingThisContext.bind({ C1: "C2", V1: "V2", L1: "L2" })("Value from .bind");
console.log('-------------------------');

// Перевіримо глобальний контексті (globalThis та global це синоніми)
console.log(typeof global, Object.keys(global));
console.log(typeof globalThis, Object.keys(globalThis));
console.log('-------------------------');

// Перевіряємо, як працюють функції, що оголошені після виклику
loggingAfterCall();
console.log('-------------------------');

// Розглянемо, навіщо нам this. Яке практичне значення.

const product = {
  name: "iPhone 11X",
  // Method
  logFormattedName: function () {
    console.log("Name of this product:", this.name);
  },
  getFormattedName: () => typeof this.console, // Не працюватиме, адже this передається з контексту створення
  factoryNameFormatter: function (context) {
    return (prefix, suffix) =>
      `[${context}] ${prefix}: ${this.name} (${suffix})`;
  },
};

product.logFormattedName();
console.log(product.getFormattedName());
const factory = product.factoryNameFormatter("global_context");
console.log("Factory:", typeof factory);
console.log('-------------------------');

function loggingAfterCall() {
  console.log(
    "Ключове слово function та var будуть додані до контексту до виконання"
  );
}

console.log(factory("Ім'я має бути", "iPhone 11X"));

console.log('-------------------------');
