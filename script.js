function handleUniqueTask() {
  const uniqueTaskInput = document.getElementById('uniqueTaskInput');
  const uniqueDateTimeInput = document.getElementById('uniqueDateTimeInput');
  const uniqueTaskList = document.getElementById('uniqueTaskList');

  const uniqueTaskText = uniqueTaskInput.value;
  const uniqueDateTimeValue = uniqueDateTimeInput.value;

  if (uniqueTaskText !== '' && uniqueDateTimeValue !== '') {
      const li = document.createElement('li');
      li.innerHTML = `
    <span>${uniqueTaskText}</span>
    <span>${uniqueDateTimeValue}</span>
    <button onclick="removeUniqueTask(this)">Remove</button>
    <button onclick="scheduleUniqueTask('${uniqueTaskText}', '${uniqueDateTimeValue}')">Schedule Task</button>
  `;
      uniqueTaskList.appendChild(li);
      uniqueTaskInput.value = '';
      uniqueDateTimeInput.value = '';
  } else {
      alert('Please enter a unique task and set a deadline!');
  }
}

function removeUniqueTask(element) {
  const taskItem = element.parentElement;
  taskItem.remove();
}

function scheduleUniqueTask(uniqueTaskText, uniqueDateTimeValue) {
  if (Notification.permission !== 'granted') {
      Notification.requestPermission();
  } else {
      const now = new Date().getTime();
      const selectedTime = new Date(uniqueDateTimeValue).getTime();
      const timeDifference = selectedTime - now;

      if (timeDifference > 0) {
          setTimeout(() => {
              const notification = new Notification('Unique Task Reminder', {
                  body: `Reminder: "${uniqueTaskText}" is due now!`
              });
          }, timeDifference);
      } else {
          alert('This unique task is already past due.');
      }
  }
}

if (Notification.permission !== 'granted') {
  Notification.requestPermission();
}
