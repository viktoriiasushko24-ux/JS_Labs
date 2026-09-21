(function () {
  // Функція для генерації базового масиву випадкових цілих чисел (довжина > 100)
  function generateRandomArray(length) {
    var arr = [];
    for (var i = 0; i < length; i++) {
      arr.push(Math.floor(Math.random() * 1000));
    }
    return arr;
  }

  var size = 105; // довжина не менше 100 елементів
  var normalArray = generateRandomArray(size);

  // Створення розрідженого масиву на базі копії (видаляємо частину індексів)
  var sparseArray = normalArray.slice();
  delete sparseArray[5];
  delete sparseArray[12];
  delete sparseArray[34];
  delete sparseArray[60];
  delete sparseArray[85];
  sparseArray[110] = 777; // розширення довжини за рахунок дірок

  var methods = [
    { name: "Сортування обміном (Bubble Sort)", func: SortLibrary.bubbleSort },
    { name: "Сортування мінімальних елементів (Selection Sort)", func: SortLibrary.selectionSort },
    { name: "Сортування вставками (Insertion Sort)", func: SortLibrary.insertionSort },
    { name: "Сортування Шелла (Shell Sort)", func: SortLibrary.shellSort },
    { name: "Сортування Хоара (Quick Sort)", func: SortLibrary.quickSort }
  ];

  function runTests(arrayToTest, isSparse) {
    var label = isSparse ? "РОЗРІДЖЕНИЙ МАСИВ (length: " + arrayToTest.length + ")" : "НЕРОЗРІДЖЕНИЙ МАСИВ (length: " + arrayToTest.length + ")";
    console.log("==================================================");
    console.log("ТЕСТУВАННЯ: " + label);
    console.log("==================================================");

    methods.forEach(function (method) {
      console.log("\n--- " + method.name + " ---");
      
      // За зростанням
      var resAsc = method.func(arrayToTest, true);
      console.log("[Зростання] Порівнянь: " + resAsc.comparisons + ", Обмінів/переміщень: " + resAsc.swaps + 
                  (resAsc.undefinedCount > 0 ? " | undefined-елементів: " + resAsc.undefinedCount : ""));
      
      // За спаданням
      var resDesc = method.func(arrayToTest, false);
      console.log("[Спадання]  Порівнянь: " + resDesc.comparisons + ", Обмінів/переміщень: " + resDesc.swaps + 
                  (resDesc.undefinedCount > 0 ? " | undefined-елементів: " + resDesc.undefinedCount : ""));
    });
  }

  // 1.2.3: Демонстрація на нерозрідженому масиві
  runTests(normalArray, false);

  // 1.2.4: Демонстрація на розрідженому масиві
  runTests(sparseArray, true);
})();
