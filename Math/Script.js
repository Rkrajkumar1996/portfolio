const chatOutput = document.getElementById('chat-output');
const userMessageInput = document.getElementById('user-message');

function appendMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.innerHTML = `<strong>${sender}: </strong>${message}`;
  chatOutput.appendChild(messageElement);
}

function sendMessage() {
  const userMessage = userMessageInput.value.trim();
  if (userMessage !== '') {
    appendMessage('You', userMessage);
    userMessageInput.value = '';

    // Send the user message to the backend for processing
    fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    })
      .then((response) => response.json())
      .then((data) => {
        appendMessage('Bot', data.message);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}
