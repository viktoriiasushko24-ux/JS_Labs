console.log(
  "Інструкція:\nВикористовуйте функцію triangle(val1, type1, val2, type2);\nДопустимі типи: 'leg', 'hypotenuse', 'adjacent angle', 'opposite angle', 'angle'.\nКути задаються в градусах."
);

function toRad(deg) {
  return (deg * Math.PI) / 180;
}

function toDeg(rad) {
  return (rad * 180) / Math.PI;
}

function triangle(v1, t1, v2, t2) {
  // 1 тип даних та від'ємні значення/нуль на вході
  const EPSILON = 0.000001;
  if (typeof v1 !== "number" || typeof v2 !== "number" || v1 <= EPSILON || v2 <= EPSILON) {
    return "Zero or negative input";
  }

  let a, b, c, alpha, beta;

  // 2 Катет і гіпотенуза
  if ((t1 === "leg" && t2 === "hypotenuse") || (t1 === "hypotenuse" && t2 === "leg")) {
    a = (t1 === "leg") ? v1 : v2;
    c = (t1 === "hypotenuse") ? v1 : v2;

    if (a >= c) {
      return "Failed: leg must be smaller than hypotenuse";
    }
    b = Math.sqrt(c * c - a * a);
    alpha = toDeg(Math.asin(a / c));
    beta = 90 - alpha;
  }
  // 3 Два катети
  else if (t1 === "leg" && t2 === "leg") {
    a = v1;
    b = v2;
    c = Math.sqrt(a * a + b * b);
    alpha = toDeg(Math.atan(a / b));
    beta = 90 - alpha;
  }
  // 4 Катет і прилеглий кут
  else if ((t1 === "leg" && t2 === "adjacent angle") || (t1 === "adjacent angle" && t2 === "leg")) {
    b = (t1 === "leg") ? v1 : v2;
    alpha = (t1 === "adjacent angle") ? v1 : v2;

    beta = 90 - alpha;
    c = b / Math.cos(toRad(alpha));
    a = Math.sqrt(c * c - b * b);
  }
  // 5. Катет і протилежний кут
  else if ((t1 === "leg" && t2 === "opposite angle") || (t1 === "opposite angle" && t2 === "leg")) {
    a = (t1 === "leg") ? v1 : v2;
    alpha = (t1 === "opposite angle") ? v1 : v2;

    beta = 90 - alpha;
    c = a / Math.sin(toRad(alpha));
    b = Math.sqrt(c * c - a * a);
  }
  // 6 Гіпотенуза і кут
  else if ((t1 === "hypotenuse" && t2 === "angle") || (t1 === "angle" && t2 === "hypotenuse")) {
    c = (t1 === "hypotenuse") ? v1 : v2;
    alpha = (t1 === "angle") ? v1 : v2;

    beta = 90 - alpha;
    a = c * Math.sin(toRad(alpha));
    b = c * Math.cos(toRad(alpha));
  }
  // 7 Помилки в типах аргументів
  else {
    console.log("Помилка: Неправильні типи аргументів. Перечитайте інструкцію.");
    return "failed";
  }

  //перевірка сторін (a, b, c) та кутів (alpha, beta)
  if (
    alpha <= EPSILON || alpha >= 90 ||
    beta <= EPSILON || beta >= 90 ||
    isNaN(alpha) || isNaN(beta)
  ) {
    return "Failed: angle must be acute (< 90° and > 0.000001)";
  }

  if (
    a <= EPSILON || b <= EPSILON || c <= EPSILON ||
    isNaN(a) || isNaN(b) || isNaN(c) ||
    !isFinite(a) || !isFinite(b) || !isFinite(c) ||
    a >= c || b >= c
  ) {
    return "Failed: invalid sides values";
  }

  console.log("a = " + a);
  console.log("b = " + b);
  console.log("c = " + c);
  console.log("alpha = " + alpha);
  console.log("beta = " + beta);

  return "success";
}
