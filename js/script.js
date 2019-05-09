// create stopwatch class

class Stopwatch {
  constructor(display) {
    this.running = false;
    this.display = display;
    this.reset();
    this.print(this.times);
  }

  // method: reset counters
  reset() {
    this.times = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };
  }

  // method: display the formatted time
  print() {
    this.display.innerText = this.format(this.times);
  }

  // method: format the timer display according to the template 00:00:00 /m:s:ms
  format(times) {
    return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(
      Math.floor(times.miliseconds)
    )}`;
  }

  // method: start if it is not running and count (step)
  start() {
    if (!this.running) {
      this.running = true;
      this.watch = setInterval(() => this.step(), 10);
    }
  }

  // method: step - triggers calculate and print if the stopwatch is running
  step() {
    if (!this.running) return;
    this.calculate();
    this.print();
  }

  // method: calculate time to m/s/ms adding each time 1 ms
  calculate() {
    this.times.miliseconds += 1;
    if (this.times.miliseconds >= 100) {
      this.times.seconds += 1;
      this.times.miliseconds = 0;
    }
    if (this.times.seconds >= 60) {
      this.times.minutes += 1;
      this.times.seconds = 0;
    }
  }
  // method: stop - stops the count and clears interval
  stop() {
    this.running = false;
    clearInterval(this.watch);
  }
}
// ----------------------- Stopwatch Class end ----------------------------------

// function formatting the numbers : add 0 in the front of the number if the value has less than 2 digits
function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
    result = "0" + result;
  }
  return result;
}

// stopwatch class instance
const stopwatch = new Stopwatch(document.querySelector(".stopwatch"));

// buttons and listerners
let startButton = document.getElementById("start");
startButton.addEventListener("click", () => stopwatch.start());

let stopButton = document.getElementById("stop");
stopButton.addEventListener("click", () => stopwatch.stop());
