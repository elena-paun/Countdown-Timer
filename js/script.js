const show = id => {
  document.getElementById(id).style.display = "block";
};

const hide = id => {
  document.getElementById(id).style.display = "none";
};
hide("countdown");
// select the values offered by the date and time inputs and subtract the now date() to get the final value
var y, d, h, m, s, ms, dateNow, date, dateFuture, action;
let option, json, optionDates, newDate;
//let yearsValue = document.getElementById("yearsValue");
let interval = document.getElementById("interval");
let timeLeftUntil = document.getElementById("timeLeftUntil");
let inputEvent = document.querySelector("#event");
let outputEvent = document.querySelector("#outputEvent");
let clock = document.getElementById("clock");
// create the START button

start.addEventListener("click", e => {
  show("countdown");
  date = document.querySelector("#dates");
  // let dropdown = document.getElementById("locality-dropdown");

  //if (dropdown.value == "History") return;

  dateFuture = date.valueAsDate;
  dateFuture.setHours(0);
  dateNow = new Date();

  // subtract the current date from the input date

  ms = Math.abs(dateFuture - dateNow);
  s = Math.floor(ms / 1000);
  m = Math.floor(s / 60);
  s = s % 60;
  h = Math.floor(m / 60);
  m = m % 60;
  d = Math.floor(h / 24);
  h = h % 24;
  y = Math.floor(d / 365);
  d = d % 365;

  clearInterval(action);
  action = setInterval(decrement => {
    if (s > 0) {
      s--;
    } else if (m > 0 && s == 0) {
      m - 1;
      s = 60;
      s--;
    } else if (h > 0 && m == 0) {
      h - 1;
      m = 60;
      m - 1;

      s = 60;
      s--;
    } else if (d > 0 && h == 0) {
      d--;
      h = 24;
      m = 60;
      s = 60;
      s--;
    } else if (y > 0 && d == 0) {
      y--;
      d = 365;

      h = 24;
      m = 60;
      s = 60;
      s--;
    }
    if (s == 0) {
      m--;
    } else if (m == 0) {
      h--;
    } else if (h == 0) {
      d--;
    }

    myClock();
  }, 1000);
  myClock();
});

let dropdown = document.getElementById("locality-dropdown");
let defaultOption = document.createElement("option");
defaultOption.text = " ";
dropdown.add(defaultOption);

dropdown.selectedIndex = 0;
const url = "https://api.myjson.com/bins/10paqc";
//const url2 = readTextFile("");
fetch(url).then(function(response) {
  // Examine the text in the response
  response.json().then(function(data) {
    for (let i = 0; i < data.length; i++) {
      option = document.createElement("option");
      option.text = data[i].date;
      option.value = data[i].date;
      dropdown.add(option);
    }
  });
});

dropdown.addEventListener("change", e => {
  optionDates = new Date(e.target.value);
  newDate = new Date();
  ms = Math.abs(optionDates - newDate);
  s = Math.floor(ms / 1000);
  m = Math.floor(s / 60);
  s = s % 60;
  h = Math.floor(m / 60);
  m = m % 60;
  d = Math.floor(h / 24);
  h = h % 24;
  y = Math.floor(d / 365);
  d = d % 365;

  show("countdown");

  myClock();

  clearInterval(action);
  action = setInterval(decrement => {
    if (s > 0) {
      s--;
    } else if (m > 0 && s == 0) {
      m - 1;
      s = 60;
      s--;
    } else if (h > 0 && m == 0) {
      h - 1;
      m = 60;
      m - 1;

      s = 60;
      s--;
    } else if (d > 0 && h == 0) {
      d--;
      h = 24;
      m = 60;
      s = 60;
      s--;
    } else if (y > 0 && d == 0) {
      y--;
      d = 365;

      h = 24;
      m = 60;
      s = 60;
      s--;
    }
    if (s == 0) {
      m--;
    } else if (m == 0) {
      h--;
    } else if (h == 0) {
      d--;
    }

    myClock();
  }, 1000);
});

const myClock = () => {
  if (inputEvent.value != 0) {
    timeLeftUntil.textContent = "TIME LEFT UNTIL" + " " + inputEvent.value;
  }

  clock.textContent = y + "  " + d + "    " + h + " " + m + " " + s;
  interval.textContent =
    "YEARS" + " " + "DAYS" + " " + "HOURS" + " " + "MINUTES" + " " + "SECONDS";
};
