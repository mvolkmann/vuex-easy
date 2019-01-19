let lastId = 0;

export const createTodo = (text, done = false) => ({id: ++lastId, text, done});
