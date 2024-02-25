import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const todosSlice = createSlice({
  name: 'todos',
  initialState: { value: initialState },
  reducers: {
    updateTodos: (state, action) => {
      state.value = action.payload;
    },
    addTodo: (state, action) => {
      state.value.push(action.payload);
    },
    toggleCheckTodo: (state, action) => {
      state.value = state.value.map(todo => todo.id === action.payload ? { ...todo, checked: !todo.checked } : todo);
    },
    deleteTodo: (state, action) => {
      state.value = state.value.filter(todo => todo.id !== action.payload);
    }
  }
});

export const { updateTodos, addTodo, toggleCheckTodo, deleteTodo } = todosSlice.actions;

export default todosSlice.reducer;