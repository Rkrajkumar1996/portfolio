const chatOutput = document.getElementById('chat-output');
const userMessageInput = document.getElementById('user-message');

function appendMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.innerHTML = `<strong>${sender}: </strong>${message}`;
  chatOutput.appendChild(messageElement);
  chatOutput.scrollTop = chatOutput.scrollHeight; // Scroll to bottom
}

function sendMessage() {
  const userMessage = userMessageInput.value.trim();
  if (userMessage !== '') {
    appendMessage('You', userMessage);
    userMessageInput.value = '';

    // Perform math calculations
    try {
      const result = math.evaluate(userMessage);
      appendMessage('Bot', result);
    } catch (error) {
      appendMessage('Bot', 'Invalid expression.');
    }
  }
}
