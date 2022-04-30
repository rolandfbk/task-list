import './style.css';

const listBlock = document.querySelector('.list-block');
const task = [
  {
    description: 'Wash the dishes',
    completed: false,
    index: 1,
  },
  {
    description: 'Clean the house',
    completed: false,
    index: 2,
  },
  {
    description: 'Cut the grass',
    completed: false,
    index: 3,
  },
];

const div = [];
const template = [];
for (let i = 0; i < task.length; i += 1) {
  div[i] = document.createElement('div');
  div[i].className = 'list-item';
  template[i] = `
    <span class="task-item"><input type="checkbox" class="task-check" id="task-check" name="task-check"><label for="task-check">${task[i].description}</label></span>
    <a href="#" class="task-option"><i class="fa fa-ellipsis-v"></i></a>
  `;

  div[i].innerHTML = template[i];
  listBlock.appendChild(div[i]);
}