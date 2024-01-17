window.onload = function () {
  var body = document.getElementsByTagName("body")[0];
  var alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
  ];
  var letter_count = 0;
  var el = document.getElementById("loading");
  var word = el.textContent.trim();
  var finished = false;

  el.textContent = "";
  for (var i = 0; i < word.length; i++) {
    var span = document.createElement("span");
    span.textContent = word.charAt(i);
    span.className = "span_load";
    el.appendChild(span);
  }

  setTimeout(write, 75);
  var incrementer = setTimeout(inc, 100);

  function write() {
    var spans = document.getElementsByClassName("span_load");
    for (var i = letter_count; i < word.length; i++) {
      var c = Math.floor(Math.random() * 36);
      spans[i].textContent = alphabet[c];
    }
    if (!finished) {
      setTimeout(write, 145); // letters changing animation delay
    }
  }

  function inc() {
    var spans = document.getElementsByClassName("span_load");
    spans[letter_count].textContent = word[letter_count];
    spans[letter_count].classList.add("glow");
    letter_count++;
    if (letter_count >= word.length) {
      finished = true;
      setTimeout(reset, 300000); //timeout before new cycle millisec
    } else {
      setTimeout(inc, 3000); // timeout between letters
    }
  }

  function reset() {
    letter_count = 0;
    finished = false;
    setTimeout(inc, 1100);
    setTimeout(write, 75);
    var spans = document.getElementsByClassName("span_load");
    for (var i = 0; i < spans.length; i++) {
      spans[i].classList.remove("glow");
    }
  }
};
