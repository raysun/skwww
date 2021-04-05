import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  overrides: {
    MuiTableSortLabel: {
      root: {
        color: "#fff",
        "&:hover": {
          color: "#fff",
        },
      },
      active: {
        color: "#fff !important",
        "&:hover": {
          color: "#fff",
        },
      },
      icon: {
        color: "#fff !important",
        "&:hover": {
          color: "#fff !important",
        },
      },
    },
  },
});

module.exports.theme = theme;
