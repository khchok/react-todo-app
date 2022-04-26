import axios from "axios";
import { todoActions } from "./todo-slice";

export const getTodos = () => {
  return (dispatch) => {
    axios.get(`http://localhost:8000/todo`).then((res) => {
      const array = res.data;
      dispatch(todoActions.fetchTodo(array ?? []));
    });
  };
};

export const postTodos = (todo) => {
  return (dispatch) => {
    axios.post(`http://localhost:8000/todo`, todo).then((res) => {
      dispatch(todoActions.addTodo(todo));
    });
  };
};


export const completeTodo = (ids) => {
  return (dispatch) => {
    axios.put(`http://localhost:8000/todo`, ids).then((res) => {
      dispatch(todoActions.completeTodo(ids));
    });
  };
};


export const deleteTodo = (ids) => {
  return (dispatch) => {
    axios.delete(`http://localhost:8000/todo/${ids.join(',')}`).then((res) => {
      dispatch(todoActions.removeTodo(ids));
    });
  };
};
