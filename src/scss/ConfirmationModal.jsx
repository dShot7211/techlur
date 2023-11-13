import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Icon } from "@iconify/react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ConfirmationModal({ row, getAllUsers }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteUser = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/api/v1/users/${row._id}`
      );
      if (res.status === 204) {
        toast.success("User Deleted Successfully");
        if (getAllUsers) getAllUsers();
        handleClose();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <React.Fragment>
      <Icon
        icon="mingcute:delete-line"
        style={{ fontSize: "25px" }}
        className="just-hover"
        onClick={handleClickOpen}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => deleteUser()}>OK</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
