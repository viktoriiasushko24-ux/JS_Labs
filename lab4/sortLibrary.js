(function (window) {
  let SortLibrary = {};

  function prepareArray(arr) {
    let validItems = [];
    let undefinedCount = 0;

    for (let i = 0; i < arr.length; i++) {
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

  function shouldSwap(a, b, ascending) {
    return ascending ? a > b : a < b;
  }

  function assembleResult(items, undefinedCount) {
    let result = items.slice();
    for (let i = 0; i < undefinedCount; i++) {
      result.push(undefined);
    }
    return result;
  }

  SortLibrary.bubbleSort = function (arr, ascending) {
    if (ascending === undefined) ascending = true;
    let prep = prepareArray(arr);
    let a = prep.items.slice();
    let comparisons = 0;
    let swaps = 0;
    let n = a.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - 1 - i; j++) {
        comparisons++;
        if (shouldSwap(a[j], a[j + 1], ascending)) {
          let temp = a[j];
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

  SortLibrary.selectionSort = function (arr, ascending) {
    if (ascending === undefined) ascending = true;
    let prep = prepareArray(arr);
    let a = prep.items.slice();
    let comparisons = 0;
    let swaps = 0;
    let n = a.length;

    for (let i = 0; i < n - 1; i++) {
      let targetIdx = i;
      for (let j = i + 1; j < n; j++) {
        comparisons++;
        if (shouldSwap(a[targetIdx], a[j], ascending)) {
          targetIdx = j;
        }
      }
      if (targetIdx !== i) {
        let temp = a[i];
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

  SortLibrary.insertionSort = function (arr, ascending) {
    if (ascending === undefined) ascending = true;
    let prep = prepareArray(arr);
    let a = prep.items.slice();
    let comparisons = 0;
    let moves = 0;
    let n = a.length;

    for (let i = 1; i < n; i++) {
      let key = a[i];
      let j = i - 1;

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
      swaps: moves,
      undefinedCount: prep.undefinedCount
    };
  };

  SortLibrary.shellSort = function (arr, ascending) {
    if (ascending === undefined) ascending = true;
    let prep = prepareArray(arr);
    let a = prep.items.slice();
    let comparisons = 0;
    let moves = 0;
    let n = a.length;

    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      for (let i = gap; i < n; i++) {
        let temp = a[i];
        let j = i;

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

  SortLibrary.quickSort = function (arr, ascending) {
    if (ascending === undefined) ascending = true;
    let prep = prepareArray(arr);
    let a = prep.items.slice();
    let comparisons = 0;
    let swaps = 0;

    function partition(low, high) {
      let pivot = a[Math.floor((low + high) / 2)];
      let i = low;
      let j = high;

      while (i <= j) {
        while (ascending ? a[i] < pivot : a[i] > pivot) {
          comparisons++;
          i++;
        }
        comparisons++;

        while (ascending ? a[j] > pivot : a[j] < pivot) {
          comparisons++;
          j--;
        }
        comparisons++;

        if (i <= j) {
          if (i !== j) {
            let temp = a[i];
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
        let index = partition(low, high);
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
