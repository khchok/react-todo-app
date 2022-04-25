import { TextField, Button, Grid, Slider, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { todoActions } from "../../store/todo-slice";
import { postTodos } from "../../store/todo-actions";
import AppDialog from "../UI/AppDialog";
import Moment from "moment";

const AddTodo = (props) => {
  const dispatch = useDispatch();
  const [deadline, setDeadline] = useState(Moment());
  const [priorityVal, setPriorityVal] = useState(1);
  const titleRef = useRef();
  const deadlineRef = useRef();

  const marks = [
    {
      value: 1,
      label: "High",
    },
    {
      value: 10,
      label: "Low",
    },
  ];

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let todo = {
      id: Math.random().toFixed(3),
      title: titleRef.current.value,
      deadline: deadlineRef.current.value,
      priority: priorityVal,
      status: "Active",
    };
    dispatch(postTodos(todo));
    // dispatch(
    //   todoActions.addTodo({
    //     id: Math.random().toFixed(3),
    //     title: titleRef.current.value,
    //     deadline: deadlineRef.current.value,
    //     priority: priorityVal,
    //     status: "Active",
    //   })
    // );
    props.onClose();
  };
  return (
    <AppDialog
      open={props.open}
      onClose={props.onClose}
      actions={<Button onClick={onSubmitHandler}>Submit</Button>}
      title="Add To Do"
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            inputProps={{ ref: titleRef }}
            id="todo-title"
            label="Title"
            variant="standard"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <DatePicker
            inputRef={deadlineRef}
            label="Deadline"
            mask="__/__/____"
            inputFormat="DD/MM/yyyy"
            value={deadline}
            onChange={(val) => setDeadline(val)}
            renderInput={(params) => <TextField {...params} />}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography gutterBottom>Priority</Typography>
          <Slider
            value={priorityVal}
            onChange={(e, val) => {
              setPriorityVal(val);
            }}
            marks={marks}
            defaultValue={1}
            valueLabelDisplay="auto"
            step={1}
            min={1}
            max={10}
          />
        </Grid>
      </Grid>
    </AppDialog>
  );
};

export default AddTodo;
