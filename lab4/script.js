(function () {
  function generateRandomArray(length) {
    let arr = [];
    for (let i = 0; i < length; i++) {
      arr.push(Math.floor(Math.random() * 1000));
    }
    return arr;
  }

  let size = 105;
  let normalArray = generateRandomArray(size);

  let sparseArray = normalArray.slice();
  delete sparseArray[5];
  delete sparseArray[12];
  delete sparseArray[34];
  delete sparseArray[60];
  delete sparseArray[85];
  sparseArray[110] = 777;

  let methods = [
    { name: "Сортування обміном (Bubble Sort)", func: SortLibrary.bubbleSort },
    { name: "Сортування мінімальних елементів (Selection Sort)", func: SortLibrary.selectionSort },
    { name: "Сортування вставками (Insertion Sort)", func: SortLibrary.insertionSort },
    { name: "Сортування Шелла (Shell Sort)", func: SortLibrary.shellSort },
    { name: "Сортування Хоара (Quick Sort)", func: SortLibrary.quickSort }
  ];

  function runTests(arrayToTest, isSparse) {
    let label = isSparse ? "РОЗРІДЖЕНИЙ МАСИВ (length: " + arrayToTest.length + ")" : "НЕРОЗРІДЖЕНИЙ МАСИВ (length: " + arrayToTest.length + ")";
    console.log("ТЕСТУВАННЯ: " + label);

    methods.forEach(function (method) {
      console.log(method.name);

      let resAsc = method.func(arrayToTest, true);
      console.log("[Зростання] Порівнянь: " + resAsc.comparisons + ", Обмінів/переміщень: " + resAsc.swaps + 
                  (resAsc.undefinedCount > 0 ? " | undefined-елементів: " + resAsc.undefinedCount : ""));

      let resDesc = method.func(arrayToTest, false);
      console.log("[Спадання]  Порівнянь: " + resDesc.comparisons + ", Обмінів/переміщень: " + resDesc.swaps + 
                  (resDesc.undefinedCount > 0 ? " | undefined-елементів: " + resDesc.undefinedCount : ""));
    });
  }

  runTests(normalArray, false);
  runTests(sparseArray, true);
})();
