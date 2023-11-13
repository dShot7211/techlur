import { Box, Grid, Typography } from "@mui/material";
import logo from "./assets/logo.png";
import "./App.css";
import CreateUser from "./scss/CreateUser";
import DataTable from "react-data-table-component";
import { CustomStyles, ddmmyyyy } from "./tableStyle";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Icon } from "@iconify/react";
import ConfirmationModal from "./scss/ConfirmationModal";
import SwitchComponent from "./scss/SwitchComponent";

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getAllUsers = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/users/getAllUsers"
      );
      setUsers(res?.data?.data);
    } catch (error) {
      console.log("err", error.response.data.message);
      toast.error(error.response.data.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const columns = [
    {
      name: "Name",
      selector: (row) => <div style={{ textAlign: "left" }}>{row.name}</div>,
    },
    {
      name: "Email",
      selector: (row) => <div style={{ textAlign: "left" }}>{row.email}</div>,
      width: "200px",
    },
    {
      name: "Salary",
      selector: (row) => (
        <div style={{ textAlign: "left" }}> ₹ {row.salary}</div>
      ),
    },
    {
      name: "DOB",
      selector: (row) => (
        <div style={{ textAlign: "left" }}>{ddmmyyyy(row.dob)}</div>
      ),
    },
    {
      name: "Joining Date",
      selector: (row) => (
        <div style={{ textAlign: "left" }}>{ddmmyyyy(row.joinDate)}</div>
      ),
    },
    {
      name: "Relieving Date",
      selector: (row) => (
        <div style={{ textAlign: "left" }}>{ddmmyyyy(row.relievingDate)}</div>
      ),
    },
    {
      name: "Status",
      selector: (row) => (
        <div style={{ textAlign: "left" }}>
          <SwitchComponent row={row} getAllUsers={getAllUsers} />
          <span
            style={{
              color: row.status === true ? "#49af41" : "gray",
              fontSize: "10px",
              marginLeft: "8px",
            }}
          >
            {row.status === true ? "Active" : "Inactive"}
          </span>
        </div>
      ),
    },
    {
      name: "Action",
      selector: (row) => (
        <div style={{ display: "flex" }}>
          <Box sx={{ mr: 0.7 }}>
            <CreateUser view="edit" row={row} getAllUsers={getAllUsers} />
          </Box>
          <ConfirmationModal row={row} getAllUsers={getAllUsers} />
        </div>
      ),
      right: true,
    },
  ];

  return (
    <Grid container sx={{ width: "100vw", py: 5, px: 8 }}>
      <ToastContainer position="top-right" theme="dark" />
      <Grid md={12} sx={{ textAlign: "center", mb: 4 }}>
        <img src={logo} alt="logo" width="80px" />
      </Grid>
      <Grid
        md={12}
        sm={12}
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography sx={{ fontSize: "30px", color: "green" }}>
          Employe Management
        </Typography>
        <div>
          <Icon
            icon="mdi:reload"
            style={{ fontSize: "24px", marginRight: "8px" }}
            onClick={() => getAllUsers()}
            className="just-hover"
          />
          <CreateUser getAllUsers={getAllUsers} />
        </div>
      </Grid>
      <Grid item md={12} xs={12}>
        <Typography sx={{ fontSize: "30px", color: "green" }}>
          Employe List
        </Typography>
      </Grid>

      <Grid item md={12} xs={12}>
        {isLoading ? (
          <div
            style={{ width: "100%", textAlign: "center", marginTop: "40px" }}
          >
            {" "}
            <h2>Loading.....</h2>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={users}
            fixedHeader
            paginationPerPage={15}
            pagination
            customStyles={CustomStyles}
            highlightOnHover
            dense={false}
          />
        )}
      </Grid>
    </Grid>
  );
}

export default App;
