console.log(`Інструкція:
Використовуйте функцію triangle(val1, type1, val2, type2);
Допустимі типи: "leg", "hypotenuse", "adjacent angle", "opposite angle", "angle".
Кути задаються в градусах.`);

function triangle(v1, t1, v2, t2) {
  if (typeof v1 !== "number" || typeof v2 !== "number" || v1 <= 0 || v2 <= 0) {
    return "Zero or negative input";
  }

  let a, b, c, alpha, beta;
  const toRad = deg => (deg * Math.PI) / 180;
  const toDeg = rad => (rad * 180) / Math.PI;

  let p = {};
  p[t1] = v1;
  p[t2] = v2;

  // 1. leg & hypotenuse
  if (p["leg"] && p["hypotenuse"]) {
    a = p["leg"];
    c = p["hypotenuse"];
    if (a >= c) return "Failed: leg must be smaller than hypotenuse";
    b = Math.sqrt(c * c - a * a);
    alpha = toDeg(Math.asin(a / c));
    beta = 90 - alpha;
  }
  // 2. leg & leg
  else if (t1 === "leg" && t2 === "leg") {
    a = v1;
    b = v2;
    c = Math.sqrt(a * a + b * b);
    alpha = toDeg(Math.atan(a / b));
    beta = 90 - alpha;
  }
  // 3. leg & adjacent angle
  else if (p["leg"] && p["adjacent angle"]) {
    b = p["leg"];
    alpha = p["adjacent angle"];
    if (alpha >= 90) return "Failed: angle must be acute (< 90°)";
    beta = 90 - alpha;
    c = b / Math.cos(toRad(alpha));
    a = Math.sqrt(c * c - b * b);
  }
  // 4. leg & opposite angle
  else if (p["leg"] && p["opposite angle"]) {
    a = p["leg"];
    alpha = p["opposite angle"];
    if (alpha >= 90) return "Failed: angle must be acute (< 90°)";
    beta = 90 - alpha;
    c = a / Math.sin(toRad(alpha));
    b = Math.sqrt(c * c - a * a);
  }
  // 5. hypotenuse & angle
  else if (p["hypotenuse"] && p["angle"]) {
    c = p["hypotenuse"];
    alpha = p["angle"];
    if (alpha >= 90) return "Failed: angle must be acute (< 90°)";
    beta = 90 - alpha;
    a = c * Math.sin(toRad(alpha));
    b = c * Math.cos(toRad(alpha));
  } else {
    console.log("Помилка: Неправильні типи аргументів. Перечитайте інструкцію.");
    return "failed";
  }

  console.log(`a = ${a}`);
  console.log(`b = ${b}`);
  console.log(`c = ${c}`);
  console.log(`alpha = ${alpha}`);
  console.log(`beta = ${beta}`);
  return "success";
}
