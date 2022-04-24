import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todoItems: [],
  },
  reducers: {
    addTodo(state, action) {
      state.todoItems.push(action.payload);
    },
    removeTodo(state, action) {
      const id = action.payload;
      state.todoItems.filter((item) => item.id !== id);
    },
    completeTodo(state, action) {
      const existingTodo = state.todoItems.find(
        (item) => item.id === action.payload
      );
      existingTodo.status = "Completed";
    },
  },
});

export const todoActions = todoSlice.actions;
export default todoSlice