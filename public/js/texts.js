const button = document.getElementById('send-btn'),
    numberInput = document.getElementById('phone'),
    textInput = document.getElementById('text-message'),
    response = document.querySelector('.response'),
    scheduleSelect = document.getElementById('schedule');

button.addEventListener('click', send, false);

let timeOut;
const getTimeSchedule = ({ time, number, text }) => {
  if(timeOut) clearTimeout(timeOut);
  timeOut = setTimeout(() => {
    fetchServer({ number, text });
  }, time * 60 * 1000);
};

const fetchServer = ({ number, text }) => {
  console.log('send');
  fetch('/text', {
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ number, text })
  })
    .then(function (res) {
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    });
};

function send() {
  const number = numberInput.value.replace(/\D/g, '');
  const text = textInput.value;
  const time = parseInt(scheduleSelect.value, 10);
  getTimeSchedule({ number, text, time });
}
