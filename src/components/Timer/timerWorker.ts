let seconds = 0;
let timerId: number;

onmessage = (event) => {
  if (event.data === 'start') {
    timerId = setInterval(() => {
      if (seconds >= 999) return;

      seconds += 1;
      self.postMessage(seconds);
    }, 1000);
  } else if (event.data === 'stop') {
    seconds = 0;
    self.postMessage(seconds);
    clearInterval(timerId);
  }
};
