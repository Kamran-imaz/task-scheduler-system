function addTask() {
    const taskInput = document.getElementById('taskInput');
    const dateTimeInput = document.getElementById('dateTimeInput');
    const taskList = document.getElementById('taskList');
  
    const taskText = taskInput.value;
    const dateTimeValue = dateTimeInput.value;
  
    if (taskText !== '' && dateTimeValue !== '') {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${taskText}</span>
        <span>${dateTimeValue}</span>
        <button onclick="deleteTask(this)">Delete</button>
        <button onclick="setReminder('${taskText}', '${dateTimeValue}')">Set Reminder</button>
      `;
      taskList.appendChild(li);
      taskInput.value = '';
      dateTimeInput.value = '';
    } else {
      alert('Please enter a task and deadline!');
    }
  }
  
  function deleteTask(element) {
    const taskItem = element.parentElement;
    taskItem.remove();
  }
  
  function setReminder(taskText, dateTimeValue) {
  
    const now = new Date().getTime();
    const selectedTime = new Date(dateTimeValue).getTime();
    const timeDifference = selectedTime - now;
  
    if (timeDifference > 0) {
      setTimeout(() => {
        const notification = new Notification('Task Reminder', {
          body: `Reminder: "${taskText}" is due now!`
        });
      }, timeDifference);
    } else {
      alert('This task is already past due.');
    }
  }
  
  if (Notification.permission !== 'granted') {
    Notification.requestPermission();
  }
  