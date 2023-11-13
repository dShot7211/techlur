export const CustomStyles = {
  table: {},
  tableWrapper: {
    style: {
      display: "table",
      borderRadius: "0px",
    },
  },
  headRow: {
    style: {
      border: "none",
      color: "#fff",
      backgroundColor: "#75A734",
      fontFamily: "Poppins",
      paddingLeft: "8px",
      minHeight: "55px",
      maxHeight: "55px",
      borderBottom: "0.5px solid #DBDDDF",
      paddingBottom: "4px",
      paddingTop: "4px",
    },
  },
  headCells: {
    style: {
      color: "#fff",
      fontSize: "13px",
      paddingLeft: "0px",
      fontWeight: "bold",
      justifyContent: "flex-start",
    },
  },
  cells: {
    style: {
      paddingLeft: "6px",
      paddingRight: "0px",
      margin: "0px",
      justifyContent: "flex-start",
    },
  },
  rows: {
    highlightOnHoverStyle: {
      backgroundColor: "#ecf39e",
      borderBottomColor: "#FFFFFF",
      outline: "1px solid #ffffff",
    },
    stripedStyle: {
      color: "rgba(0, 0, 0, 0.87)",
      backgroundColor: "rgba(242, 244, 244, 1)",
    },
    style: {
      minHeight: "50px",
      padding: "8px",
      fontSize: "12px",
      textTransform: "none",
      border: "none",
    },
  },
};

export const ddmmyyyy = (dateObj) => {
  const d = new Date(dateObj);
  return d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
};

export const mmddyyyy = (dateObj) => {
  const d = new Date(dateObj);
  return d.getMonth() + 1 + "-" + d.getDate() + "-" + d.getFullYear();
};
