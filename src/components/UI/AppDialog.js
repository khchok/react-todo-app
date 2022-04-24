import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const AppDialog = (props) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>{props.children}</DialogContent>
      <DialogActions>
          {props.actions}
      </DialogActions>
    </Dialog>
  );
};

export default AppDialog;
