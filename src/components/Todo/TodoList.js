import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Fab,
  FormLabel,
  IconButton,
  Skeleton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AddTodo from "./AddTodo";
import "./TodoList.css";
import { useDispatch, useSelector } from "react-redux";
import { todoActions } from "../../store/todo-slice";
import { getTodos } from "../../store/todo-actions";

const TodoList = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    var timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const todoItems = useSelector((store) => store.todo.todoItems);
  const hasItem = todoItems?.length > 0;
  const columns = [
    { field: "title", headerName: "Title", width: 300 },
    { field: "deadline", headerName: "Deadline", width: 150 },
    { field: "priority", headerName: "Priority", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
  ];

  const selectionChangedHandler = (ids) => {
    setSelectedIds(ids);
  };

  const onFabClickHandler = () => {
    setOpen(true);
  };

  const onAddTodoCloseHandler = () => {
    setOpen(false);
  };

  const onDeleteHandler = () => {
    dispatch(todoActions.removeTodo(selectedIds));
  };

  const onCompleteHandler = () => {
    dispatch(todoActions.completeTodo(selectedIds));
  };

  return (
    <>
      {hasItem && !isLoading && (
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            sx={{ margin: "10px 0" }}
            rows={todoItems}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableMultipleColumnsSorting={false}
            onSelectionModelChange={selectionChangedHandler}
            getRowClassName={(param) => `todo-${param.row.status}`}
          />
          <IconButton onClick={onDeleteHandler}>
            <DeleteIcon fontSize="large" color="primary" />
          </IconButton>
          <IconButton onClick={onCompleteHandler}>
            <AssignmentTurnedInIcon fontSize="large" color="primary" />
          </IconButton>
          <Fab
            color="primary"
            aria-label="add"
            className="fab-right"
            sx={{ margin: "10px 0" }}
            onClick={onFabClickHandler}
          >
            <AddIcon />
          </Fab>
        </div>
      )}
      {!hasItem && !isLoading && (
        <Box textAlign="center" sx={{ margin: "10px 0" }}>
          <FormLabel>Please add an item to proceed</FormLabel>
          <br />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onFabClickHandler}
          >
            Add
          </Button>
        </Box>
      )}
      {!hasItem && isLoading && (
        <>
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
        </>
      )}
      <AddTodo open={open} onClose={onAddTodoCloseHandler} />
    </>
  );
};

export default TodoList;
