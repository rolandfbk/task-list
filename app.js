const listBlock = document.querySelector('.list-block');
const listForm = document.getElementById('list-form');
const clearCompleted = document.getElementById('clear-completed');
const refresh = document.getElementById('refresh');

const resetObjIndex = () => {
  const setTaskListSet = JSON.parse(JSON.stringify(localStorage.getItem('taskList')));
  const newTaskListObjSet = JSON.parse(setTaskListSet);

  if (newTaskListObjSet.length > 0) {
    for (let i = 0; i < newTaskListObjSet.length; i += 1) {
      newTaskListObjSet[i].index = i + 1;
    }

    localStorage.setItem('taskList', JSON.stringify(newTaskListObjSet));
  }
};

const loadObj = () => {
  const block = document.querySelector('.list-block');
  let first = block.firstElementChild;
  while (first) {
    first.remove();
    first = block.firstElementChild;
  }

  const setTaskList = JSON.parse(JSON.stringify(localStorage.getItem('taskList')));
  const newTaskObj = JSON.parse(setTaskList);

  const div = [];
  const template = [];
  if (newTaskObj.length > 0) {
    for (let i = 0; i < newTaskObj.length; i += 1) {
      if (newTaskObj[i].completed === false) {
        div[i] = document.createElement('div');
        div[i].className = 'list-item';
        template[i] = `
        <div class="list-item-first" id="list-item-first_${i}">
          <span class="task-item"><input type="checkbox" class="task-check" name="task-check"><label id="label_${i}" for="task-check">${newTaskObj[i].description}</label></span>
          <a href="#" type="button" class="task-option"><i class="fa fa-ellipsis-v"></i></a>
        </div>
        <div class="list-item-second" id="list-item-second_${i}">
          <span class="task-item"><input class="input-item" type="text" name="input-item" minlength="3" value="${newTaskObj[i].description}"></span>
          <a href="#" type="button" class="task-option-remove"><i class="fa fa-trash"></i></a>
        </div>
        `;
        div[i].innerHTML = template[i];
        listBlock.appendChild(div[i]);
      } else {
        div[i] = document.createElement('div');
        div[i].className = 'list-item';
        template[i] = `
        <div class="list-item-first" id="list-item-first_${i}">
          <span class="task-item"><input type="checkbox" class="task-check" name="task-check" checked><label class="label-check" id="label_${i}" for="task-check">${newTaskObj[i].description}</label></span>
          <a href="#" type="button" class="task-option"><i class="fa fa-ellipsis-v"></i></a>
        </div>
        <div class="list-item-second" id="list-item-second_${i}">
          <span class="task-item"><input class="input-item" type="text" name="input-item" minlength="3" value="${newTaskObj[i].description}"></span>
          <a href="#" type="button" class="task-option-remove"><i class="fa fa-trash"></i></a>
        </div>
        `;
        div[i].innerHTML = template[i];
        listBlock.appendChild(div[i]);
      }
    }
  }

  const update = () => {
    const taskUpdate = document.querySelectorAll('.input-item');
    taskUpdate.forEach((input, index) => {
      input.addEventListener('click', () => {
        const set = () => {
          const updateTaskContent = JSON.parse(JSON.stringify(localStorage.getItem('taskList')));
          const newUpdateTaskObj = JSON.parse(updateTaskContent);
          newUpdateTaskObj[index].description = input.value;
          localStorage.setItem('taskList', JSON.stringify(newUpdateTaskObj));
          loadObj();
        };
        input.onchange = set;
      });
    });
  };

  const remove = (btn, key) => {
    btn.addEventListener('click', () => {
      const setTaskListR = JSON.parse(JSON.stringify(localStorage.getItem('taskList')));
      const newTaskListObjR = JSON.parse(setTaskListR);

      newTaskListObjR.splice(key, 1);

      localStorage.setItem('taskList', JSON.stringify(newTaskListObjR));

      resetObjIndex();
      loadObj();
    });
  };

  const taskOption = document.querySelectorAll('.task-option');
  taskOption.forEach((button, index) => {
    button.addEventListener('click', () => {
      loadObj();

      document.getElementById(`list-item-first_${index}`).style.display = 'none';
      document.getElementById(`list-item-second_${index}`).style.display = 'flex';
    });
  });

  const unselectTaskEntry = document.querySelectorAll('.list-entry');
  unselectTaskEntry.forEach((divElement) => {
    divElement.addEventListener('click', () => {
      loadObj();
    });
  });

  const taskOptionRemove = document.querySelectorAll('.task-option-remove');
  taskOptionRemove.forEach((button, index) => {
    remove(button, index);
  });

  update();


  const taskCheck = document.querySelectorAll('.task-check');
  taskCheck.forEach((chk, index) => {
    chk.addEventListener('click', () => {
      if (chk.checked === true) {
        document.getElementById(`label_${index}`).style.textDecoration = 'line-through';
        document.getElementById(`label_${index}`).style.color = '#a9a9a9';

        const chkTaskListSet = JSON.parse(JSON.stringify(localStorage.getItem('taskList')));
        const newChkTaskListObjSet = JSON.parse(chkTaskListSet);
        newChkTaskListObjSet[index].completed = true;
        localStorage.setItem('taskList', JSON.stringify(newChkTaskListObjSet));
      } else {
        document.getElementById(`label_${index}`).style.textDecoration = 'none';
        document.getElementById(`label_${index}`).style.color = '#000';

        const chkTaskListSet = JSON.parse(JSON.stringify(localStorage.getItem('taskList')));
        const newChkTaskListObjSet = JSON.parse(chkTaskListSet);
        newChkTaskListObjSet[index].completed = false;
        localStorage.setItem('taskList', JSON.stringify(newChkTaskListObjSet));
      }
    });
  });

  clearCompleted.addEventListener('click', () => {
    const clearTaskListSet = JSON.parse(JSON.stringify(localStorage.getItem('taskList')));
    const newClearTaskListObjSet = JSON.parse(clearTaskListSet);
    let newArray = [];

    newArray = newClearTaskListObjSet.filter((e) => e.completed === false);

    localStorage.setItem('taskList', JSON.stringify(newArray));
    resetObjIndex();
    loadObj();
  });

  refresh.addEventListener('click', () => {
    const newArray = [];
    localStorage.setItem('taskList', JSON.stringify(newArray));
    loadObj();
  });
};

const saveToLocal = () => {
  const task = [];
  localStorage.setItem('taskList', JSON.stringify(task));
};

const add = (text) => {
  const taskListArray = JSON.parse(JSON.stringify(localStorage.getItem('taskList')));
  const newTaskListArray = JSON.parse(taskListArray);

  let position;
  if (newTaskListArray.length === 0) {
    position = 1;
  } else {
    position = newTaskListArray.length + 1;
  }
  const addTask = {
    description: text,
    completed: false,
    index: position,
  };

  newTaskListArray.push(addTask);
  localStorage.setItem('taskList', JSON.stringify(newTaskListArray));
  loadObj();
};

if (localStorage.getItem('taskList')) {
  loadObj();
} else {
  saveToLocal();
}

listForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const taskInput = document.getElementById('task').value;
  add(taskInput);
  listForm.reset();
});