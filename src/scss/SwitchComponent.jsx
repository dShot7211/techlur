import { FormControlLabel, FormGroup, Grid, Switch } from "@mui/material";

import { styled } from "@mui/material/styles";
import axios from "axios";
import { toast } from "react-toastify";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 40,
  height: 22,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "& + .MuiSwitch-track": {
      backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "red",
      opacity: 1,
      border: 0,
    },
    "&.Mui-checked": {
      transform: "translateX(17px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor:
          theme.palette.mode === "dark" ? "#2ECA45" : "#49af4150",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 18,
    height: 18,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const SwitchComponent = ({ row, getAllUsers }) => {
  const changeUserStatus = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:8080/api/v1/users/${row._id}`,
        { status: !row.status }
      );
      if (getAllUsers) getAllUsers();
      toast.success(res?.data?.message);
    } catch (error) {
      if (getAllUsers) getAllUsers();
      toast.error(error.response.data.message);
    }
  };

  return (
    <Grid>
      <FormGroup>
        <FormControlLabel
          sx={{
            mt: { md: 0, sm: 2, xs: 2 },
            mb: { md: 0, sm: 2, xs: 2 },
            pl: 2,
          }}
          control={
            <IOSSwitch
              size="small"
              sx={{
                "&.MuiSwitch-root .MuiSwitch-switchBase": {
                  color: "#fff",
                },
                "&.MuiSwitch-root .Mui-checked": {
                  color: "#49af41",
                },
              }}
              defaultChecked={row?.status}
              onChange={changeUserStatus}
            />
          }
        />
      </FormGroup>
    </Grid>
  );
};

export default SwitchComponent;
