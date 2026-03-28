let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const storageKey = "tasks";
const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");
const templateElement = document.getElementById("to-do__item-template");

function loadTasks() {
	const savedTasks = localStorage.getItem(storageKey);
	return savedTasks ? JSON.parse(savedTasks) : items;
}

function createItem(item) {
	const clone = templateElement.content.querySelector(".to-do__item").cloneNode(true);
	const textElement = clone.querySelector(".to-do__item-text");
	const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
	const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
	const editButton = clone.querySelector(".to-do__item-button_type_edit");

	textElement.textContent = item;

	deleteButton.addEventListener("click", () => {
		clone.remove();
		syncTasks();
	});

	duplicateButton.addEventListener("click", () => {
		const itemName = textElement.textContent;
		const newItem = createItem(itemName);
		listElement.prepend(newItem);
		syncTasks();
	});

	editButton.addEventListener("click", () => {
		textElement.setAttribute("contenteditable", "true");
		textElement.focus();
	});

	textElement.addEventListener("blur", () => {
		textElement.setAttribute("contenteditable", "false");
		syncTasks();
	});

	return clone;
}

function getTasksFromDOM() {
	const itemsNamesElements = listElement.querySelectorAll(".to-do__item-text");
	const tasks = [];

	itemsNamesElements.forEach((itemNameElement) => {
		tasks.push(itemNameElement.textContent);
	});

	return tasks;
}

function saveTasks(tasks) {
	localStorage.setItem(storageKey, JSON.stringify(tasks));
}

function syncTasks() {
	items = getTasksFromDOM();
	saveTasks(items);
}

function renderTasks(tasks) {
	tasks.forEach((item) => {
		listElement.append(createItem(item));
	});
}

function handleFormSubmit(event) {
	event.preventDefault();

	const itemName = inputElement.value.trim();

	if (!itemName) {
		return;
	}

	const newItem = createItem(itemName);
	listElement.prepend(newItem);
	syncTasks();
	formElement.reset();
}

items = loadTasks();
renderTasks(items);

formElement.addEventListener("submit", handleFormSubmit);
