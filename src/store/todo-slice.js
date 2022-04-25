import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todoItems: [],
  },
  reducers: {
    fetchTodo(state,action){
      state.todoItems.push(...action.payload);
    },
    addTodo(state, action) {
      state.todoItems.push(action.payload);
    },
    removeTodo(state, action) {
      const idArr = action.payload;
      state.todoItems = state.todoItems.filter(
        (item) => !idArr.includes(item.id)
      );
    },
    completeTodo(state, action) {
      const idArr = action.payload;
      idArr.forEach((id) => {
        const existingTodo = state.todoItems.find((item) => item.id === id);
        existingTodo.status = "Completed";
      });
    },
  },
});

export const todoActions = todoSlice.actions;
export default todoSlice;
