import axios from "axios";
import { todoActions } from "./todo-slice";

export const getTodos = () => {
  return (dispatch) => {
    axios
      .get(
        `https://react-http-bbe1c-default-rtdb.asia-southeast1.firebasedatabase.app/todo.json`
      )
      .then((res) => {
        const todos = res.data;
        const array = [];
        Object.keys(todos).forEach((key) => {         
          let inner =  todos[key];
          array.push({ ...inner });
        });
        
        dispatch(todoActions.fetchTodo(array ?? []));
      });
  };
};

export const postTodos = (todo) => {
  return (dispatch) => {
    axios
      .post(
        `https://react-http-bbe1c-default-rtdb.asia-southeast1.firebasedatabase.app/todo.json`,
        todo
      )
      .then((res) => {
        dispatch(todoActions.addTodo(todo));
      });
  };
};
