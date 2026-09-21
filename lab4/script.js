(function () {
  function generateRandomArray(length) {
    var arr = [];
    for (var i = 0; i < length; i++) {
      arr.push(Math.floor(Math.random() * 1000));
    }
    return arr;
  }

  var size = 105;
  var normalArray = generateRandomArray(size);

  var sparseArray = normalArray.slice();
  delete sparseArray[5];
  delete sparseArray[12];
  delete sparseArray[34];
  delete sparseArray[60];
  delete sparseArray[85];
  sparseArray[110] = 777;

  var methods = [
    { name: "Сортування обміном (Bubble Sort)", func: SortLibrary.bubbleSort },
    { name: "Сортування мінімальних елементів (Selection Sort)", func: SortLibrary.selectionSort },
    { name: "Сортування вставками (Insertion Sort)", func: SortLibrary.insertionSort },
    { name: "Сортування Шелла (Shell Sort)", func: SortLibrary.shellSort },
    { name: "Сортування Хоара (Quick Sort)", func: SortLibrary.quickSort }
  ];

  function runTests(arrayToTest, isSparse) {
    var label = isSparse ? "РОЗРІДЖЕНИЙ МАСИВ (length: " + arrayToTest.length + ")" : "НЕРОЗРІДЖЕНИЙ МАСИВ (length: " + arrayToTest.length + ")";
    console.log("ТЕСТУВАННЯ: " + label);

    for (var m = 0; m < methods.length; m++) {
      var currentMethod = methods[m];
      console.log("\n--- " + currentMethod.name + " ---");
      
      var resAsc = currentMethod.func(arrayToTest, true);
      console.log("[Зростання] Порівнянь: " + resAsc.comparisons + ", Обмінів/переміщень: " + resAsc.swaps + 
                  (resAsc.undefinedCount > 0 ? " | undefined-елементів: " + resAsc.undefinedCount : ""));
      
      var resDesc = currentMethod.func(arrayToTest, false);
      console.log("[Спадання]  Порівнянь: " + resDesc.comparisons + ", Обмінів/переміщень: " + resDesc.swaps + 
                  (resDesc.undefinedCount > 0 ? " | undefined-елементів: " + resDesc.undefinedCount : ""));
    }
  }

  runTests(normalArray, false);
  runTests(sparseArray, true);
})();
