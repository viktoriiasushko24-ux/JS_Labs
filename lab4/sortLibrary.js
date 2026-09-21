(function (window) {
  var SortLibrary = {};

  function prepareArray(arr) {
    var validItems = [];
    var undefinedCount = 0;

    for (var i = 0; i < arr.length; i++) {
      if (i in arr && arr[i] !== undefined) {
        validItems.push(arr[i]);
      } else {
        undefinedCount++;
      }
    }

    if (undefinedCount > 0) {
      console.warn("Увага: виявлено розріджений масив! Кількість undefined/пропущених елементів: " + undefinedCount);
    }

    return {
      items: validItems,
      undefinedCount: undefinedCount
    };
  }

  //для порівняння двох значень
  function shouldSwap(a, b, ascending) {
    return ascending ? a > b : a < b;
  }

  //для формування фінального масиву
  function assembleResult(items, undefinedCount) {
    var result = items.slice();
    for (var i = 0; i < undefinedCount; i++) {
      result.push(undefined);
    }
    return result;
  }

  //метод обміну
  SortLibrary.bubbleSort = function (arr, ascending) {
    if (ascending === undefined) ascending = true;
    var prep = prepareArray(arr);
    var a = prep.items.slice();
    var comparisons = 0;
    var swaps = 0;
    var n = a.length;

    for (var i = 0; i < n - 1; i++) {
      for (var j = 0; j < n - 1 - i; j++) {
        comparisons++;
        if (shouldSwap(a[j], a[j + 1], ascending)) {
          var temp = a[j];
          a[j] = a[j + 1];
          a[j + 1] = temp;
          swaps++;
        }
      }
    }

    return {
      sortedArray: assembleResult(a, prep.undefinedCount),
      comparisons: comparisons,
      swaps: swaps,
      undefinedCount: prep.undefinedCount
    };
  };

  // метод мінімальних елементів
  SortLibrary.selectionSort = function (arr, ascending) {
    if (ascending === undefined) ascending = true;
    var prep = prepareArray(arr);
    var a = prep.items.slice();
    var comparisons = 0;
    var swaps = 0;
    var n = a.length;

    for (var i = 0; i < n - 1; i++) {
      var targetIdx = i;
      for (var j = i + 1; j < n; j++) {
        comparisons++;
        if (shouldSwap(a[targetIdx], a[j], ascending)) {
          targetIdx = j;
        }
      }
      if (targetIdx !== i) {
        var temp = a[i];
        a[i] = a[targetIdx];
        a[targetIdx] = temp;
        swaps++;
      }
    }

    return {
      sortedArray: assembleResult(a, prep.undefinedCount),
      comparisons: comparisons,
      swaps: swaps,
      undefinedCount: prep.undefinedCount
    };
  };

  // Метод вставок
  SortLibrary.insertionSort = function (arr, ascending) {
    if (ascending === undefined) ascending = true;
    var prep = prepareArray(arr);
    var a = prep.items.slice();
    var comparisons = 0;
    var moves = 0;
    var n = a.length;

    for (var i = 1; i < n; i++) {
      var key = a[i];
      var j = i - 1;

      while (j >= 0) {
        comparisons++;
        if (shouldSwap(a[j], key, ascending)) {
          a[j + 1] = a[j];
          moves++;
          j--;
        } else {
          break;
        }
      }
      a[j + 1] = key;
    }

    return {
      sortedArray: assembleResult(a, prep.undefinedCount),
      comparisons: comparisons,
      swaps: moves, // кількість переміщень елементів
      undefinedCount: prep.undefinedCount
    };
  };

  // метод Шелла
  SortLibrary.shellSort = function (arr, ascending) {
    if (ascending === undefined) ascending = true;
    var prep = prepareArray(arr);
    var a = prep.items.slice();
    var comparisons = 0;
    var moves = 0;
    var n = a.length;

    for (var gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      for (var i = gap; i < n; i++) {
        var temp = a[i];
        var j = i;

        while (j >= gap) {
          comparisons++;
          if (shouldSwap(a[j - gap], temp, ascending)) {
            a[j] = a[j - gap];
            moves++;
            j -= gap;
          } else {
            break;
          }
        }
        a[j] = temp;
      }
    }

    return {
      sortedArray: assembleResult(a, prep.undefinedCount),
      comparisons: comparisons,
      swaps: moves,
      undefinedCount: prep.undefinedCount
    };
  };

  //метод Хоара
  SortLibrary.quickSort = function (arr, ascending) {
    if (ascending === undefined) ascending = true;
    var prep = prepareArray(arr);
    var a = prep.items.slice();
    var comparisons = 0;
    var swaps = 0;

    function partition(low, high) {
      var pivot = a[Math.floor((low + high) / 2)];
      var i = low;
      var j = high;

      while (i <= j) {
        while (ascending ? a[i] < pivot : a[i] > pivot) {
          comparisons++;
          i++;
        }
        comparisons++; // коли шось іде не так при виході з циклу

        while (ascending ? a[j] > pivot : a[j] < pivot) {
          comparisons++;
          j--;
        }
        comparisons++;

        if (i <= j) {
          if (i !== j) {
            var temp = a[i];
            a[i] = a[j];
            a[j] = temp;
            swaps++;
          }
          i++;
          j--;
        }
      }
      return i;
    }

    function quickSortRecursive(low, high) {
      if (low < high) {
        var index = partition(low, high);
        if (low < index - 1) {
          quickSortRecursive(low, index - 1);
        }
        if (index < high) {
          quickSortRecursive(index, high);
        }
      }
    }

    if (a.length > 1) {
      quickSortRecursive(0, a.length - 1);
    }

    return {
      sortedArray: assembleResult(a, prep.undefinedCount),
      comparisons: comparisons,
      swaps: swaps,
      undefinedCount: prep.undefinedCount
    };
  };

  window.SortLibrary = SortLibrary;
})(window);
