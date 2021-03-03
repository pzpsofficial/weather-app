console.log('Witaj użytkowniku');

const input = document.querySelector('input');
const button = document.querySelector('button');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

button.addEventListener('click', (e) => {
  e.preventDefault();

  message1.textContent = 'Loading...';
  message2.textContent = '';

  const query = input.value;

  fetch(`/weather?address=${query}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        message1.textContent = data.error;
      } else {
        message1.textContent = '';
        console.log(data);
        message2.innerHTML = `${data.data} <br> ${data.location}`;
      }
    });
});
