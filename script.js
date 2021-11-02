/* 1 Добавление новой задачи с чекбоксом, текстом, 
кнопкой del и edit*/

const formNewTaskElement = document.querySelector('#formNewTask')

const [formInputElement, listNewTaskElement, selectElement] = [
  formNewTaskElement.querySelector('input'),
  document.querySelector('#listCurrentTask'),
  formNewTaskElement.querySelector('select'),
]

listNewTaskElement.style.listStyleType = 'none'

function handleSubmitForm(event) {
  event.preventDefault()

  const listItemElement = document.createElement('li')
  listItemElement.innerHTML = `
<div class= "new-task col-10 align-items-start" style="display:inline-flex">
<input  type="checkbox">
  <p class="content-task col-5"></p>  
  <button class="task-edit btn btn-outline-success"><i class="fas fa-edit" ></i></button>
  <button class = "task-delete btn btn-outline-danger"><i class="fas fa-trash-alt" ></i></button>
</div>`

  const { value } = formInputElement
  const paragraphElement = listItemElement.querySelector('.content-task')
  paragraphElement.textContent = value

  /* 6 . Категории задач, заданные изначально. Напр. "срочные",
  "несрочные". Выбор категории при создании задачи. Отображение в списке, 
  редактирование*/

  let n = selectElement.options.selectedIndex
  const resultSelectElement = document.createElement('div')
  paragraphElement.before(resultSelectElement)

  if (n == 0) {
    resultSelectElement.innerHTML =
      '<i class="fas fa-exclamation-circle btn btn-outline-danger" ></i>'
  } else {
    resultSelectElement.innerHTML =
      '<i class="fas fa-couch btn btn-outline-success"></i>'
  }

  listNewTaskElement.append(listItemElement)
  formNewTaskElement.reset()

  // п.1 Перечеркивание задачи при маркировке как сделанной
  // 3*. Перемещение задачи в конец списка при маркировке как сделанной

  const checkboxInputElement = listItemElement.querySelector('input')

  function handleClickСheckbox() {
    if (checkboxInputElement.checked) {
      paragraphElement.style.textDecoration = 'line-through'
      listNewTaskElement.append(listItemElement)
    } else {
      paragraphElement.style.textDecoration = 'none'
      listNewTaskElement.prepend(listItemElement)
    }
  }

  checkboxInputElement.addEventListener('click', handleClickСheckbox)

  // 2. Удаление задач
  const buttonDeleteElement = listItemElement.querySelector('.task-delete')

  buttonDeleteElement.addEventListener('click', () => listItemElement.remove())

  // 4*. Редактирование задач
  const buttonEditElement = listItemElement.querySelector('.task-edit')

  function handleClickEditButton(event) {
    event.preventDefault()
    let newValue = prompt('Введите отредактированную задачу')
    paragraphElement.textContent = newValue

    let nNew = confirm('Задача срочная?')

    if (nNew) {
      resultSelectElement.innerHTML =
        '<i class="fas fa-exclamation-circle btn btn-outline-danger" ></i>'
    } else {
      resultSelectElement.innerHTML =
        '<i class="fas fa-couch btn btn-outline-success"></i>'
    }
  }

  buttonEditElement.addEventListener('click', handleClickEditButton)
}

formNewTaskElement.addEventListener('submit', handleSubmitForm)
