import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  filterMode: { value: 'all', label: 'All' },
  sortingMode: { value: 'name', label: 'Name' }
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState: { value: initialState },
  reducers: {
    updateTodos: (state, action) => {
      state.value.todos = action.payload;
    },
    addTodo: (state, action) => {
      state.value.todos.push(action.payload);
    },
    toggleCheckTodo: (state, action) => {
      state.value.todos = state.value.todos.map(todo => todo.id === action.payload ? { ...todo, checked: !todo.checked } : todo);
    },
    deleteTodo: (state, action) => {
      state.value.todos = state.value.todos.filter(todo => todo.id !== action.payload);
    },
    setFilterMode: (state, action) => {
      state.value.filterMode = action.payload;
    },
    setSortingMode: (state, action) => {
      state.value.sortingMode = action.payload;
    }
  }
});

export const { updateTodos, addTodo, toggleCheckTodo, deleteTodo, setFilterMode, setSortingMode } = todosSlice.actions;

export default todosSlice.reducer;