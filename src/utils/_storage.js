export const fetchTodos = () => {
  return JSON.parse(localStorage.getItem('todos')) || [];
};

export const saveTodos = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};
