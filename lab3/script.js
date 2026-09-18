(function () {
  var names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Lora", "Paula", "Laura", "Jim"];

  console.log("За першою літерою 'j' / 'J')");
  for (var i = 0; i < names.length; i++) {
    var firstLetter = names[i].charAt(0).toLowerCase();

    if (firstLetter === 'j') {
      byeSpeaker.speak(names[i]);
    } else {
      helloSpeaker.speak(names[i]);
    }
  }

  // Критерій: обчислення суми ASCII-кодів літер імені. 
  // Якщо сума парна — Good Bye, якщо непарна — Hello.
  console.log("\nПарність суми ASCII-кодів літер імені");
  for (var k = 0; k < names.length; k++) {
    var currentName = names[k];
    var asciiSum = 0;

    for (var j = 0; j < currentName.length; j++) {
      asciiSum += currentName.charCodeAt(j);
    }

    if (asciiSum % 2 === 0) {
      byeSpeaker.speak(currentName + " (ASCII sum: " + asciiSum + " - even)");
    } else {
      helloSpeaker.speak(currentName + " (ASCII sum: " + asciiSum + " - odd)");
    }
  }
})();
