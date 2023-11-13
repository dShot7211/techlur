/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { mmddyyyy } from "../tableStyle";
import { useEffect } from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const CreateUser = ({ getAllUsers, view, row }) => {
  const [open, setOpen] = useState(false);
  const [dobValue, setDobValue] = useState();
  const [jDateValue, setJDateValue] = useState();
  const [rDateValue, setRDateValue] = useState();

  useEffect(() => {
    if (view === "edit") {
      setRDateValue(dayjs(mmddyyyy(row?.relievingDate)));
      setJDateValue(dayjs(mmddyyyy(row?.joinDate)));
      setDobValue(dayjs(mmddyyyy(row?.dob)));
    }
  }, [row, open]);

  console.log("dobValue", dobValue);
  console.log("jDateValue", jDateValue);
  console.log("rDateValue", rDateValue);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setDobValue();
    setRDateValue();
    setJDateValue();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    let data = {
      name: form.name.value,
      email: form.email.value,
      dob: dobValue,
      joinDate: jDateValue,
      relievingDate: rDateValue,
      salary: form.salary.value,
    };
    try {
      if (view === "edit") {
        const res = await axios.patch(
          `http://localhost:8080/api/v1/users/${row._id}`,
          data
        );
        toast.success(res?.data.message);
      } else {
        const res = await axios.post(
          "http://localhost:8080/api/v1/users/signUp",
          data
        );
        toast.success(res?.data.message);
      }
      if (getAllUsers) getAllUsers();

      handleClose();
    } catch (error) {
      toast.error(error.response.data.message);
      if (getAllUsers) getAllUsers();
    }
  };

  // const d = dayjs("2006-01-01");

  return (
    <React.Fragment>
      {view === "edit" ? (
        <Icon
          icon="basil:edit-solid"
          style={{ fontSize: "25px" }}
          className="just-hover"
          onClick={handleClickOpen}
        />
      ) : (
        <Button
          variant="contained"
          onClick={handleClickOpen}
          sx={{
            py: 0.5,
            px: 2,
            backgroundColor: "#75A734",
            color: "#fff",
            textTransform: "none",
          }}
        >
          Add New Employe
        </Button>
      )}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add New Employe
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Icon icon="mdi:close" />
        </IconButton>
        <DialogContent dividers>
          <Box
            component="form"
            id="signUp"
            validate
            autoComplete="off"
            onSubmit={handleSubmit}
            sx={{
              width: "100%",
              "& .MuiTextField-root": { m: 2 },
              objectFit: "contain",
              overflowY: "scroll",
            }}
          >
            <Grid container>
              <Grid item md={6} xs={12}>
                <FormControl fullWidth>
                  <TextField
                    label="Name"
                    id="name"
                    size="small"
                    required
                    defaultValue={view === "edit" ? row?.name : ""}
                  />
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12}>
                <FormControl fullWidth>
                  <TextField
                    label="Email"
                    id="email"
                    size="small"
                    required
                    defaultValue={view === "edit" ? row?.email : ""}
                  />
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12}>
                <FormControl fullWidth>
                  <TextField
                    label="Salary"
                    id="salary"
                    size="small"
                    required
                    defaultValue={view === "edit" ? row?.salary : ""}
                  />
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date of birth"
                    slotProps={{
                      textField: {
                        helperText: "MM/DD/YYYY",
                      },
                    }}
                    value={dobValue}
                    onChange={(newValue) => setDobValue(newValue)}
                    disableFuture
                    // defaultValue={view === "edit" && dayjs(ddmmyyyy(row?.dob))}
                    renderInput={(params) => (
                      <TextField {...params} size="small" error={false} />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item md={6} xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Joining Date"
                    slotProps={{
                      textField: {
                        helperText: "MM/DD/YYYY",
                      },
                    }}
                    value={jDateValue}
                    onChange={(newValue) => setJDateValue(newValue)}
                    disableFuture
                    // defaultValue={
                    //   view === "edit" && dayjs(ddmmyyyy(row?.joinDate))
                    // }
                    renderInput={(params) => (
                      <TextField {...params} size="small" error={false} />
                    )}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item md={6} xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Relieving Date"
                    slotProps={{
                      textField: {
                        helperText: "MM/DD/YYYY",
                      },
                    }}
                    value={rDateValue}
                    onChange={(newValue) => setRDateValue(newValue)}
                    // defaultValue={
                    //   view === "edit" && dayjs(ddmmyyyy(row?.relievingDate))
                    // }
                    renderInput={(params) => (
                      <TextField {...params} size="small" error={false} />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus type="submit" form="signUp">
            {view === "edit" ? "Save" : "Create"}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default CreateUser;
