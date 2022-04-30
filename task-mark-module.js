export const taskMarking = () => {
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
};

export const clearCompletedtask = (clearbtn, resetObjIndexFunction, loadObjFunction) => {
  clearbtn.addEventListener('click', () => {
    const clearTaskListSet = JSON.parse(JSON.stringify(localStorage.getItem('taskList')));
    const newClearTaskListObjSet = JSON.parse(clearTaskListSet);
    let newArray = [];

    newArray = newClearTaskListObjSet.filter((e) => e.completed === false);

    localStorage.setItem('taskList', JSON.stringify(newArray));
    resetObjIndexFunction();
    loadObjFunction();
  });
};