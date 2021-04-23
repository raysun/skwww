import { useSession } from "next-auth/client";
import Layout from "../../components/layout";
import AccessDenied from "../../components/access-denied";
import fetcher from "../../components/Fetcher";
// import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import MaterialTable from "material-table";
import {
  createMuiTheme,
  MuiThemeProvider,
  Box,
  Paper,
  Avatar,
} from "@material-ui/core";
import React from "react";
import useSWR from "swr";
import { useRouter } from "next/router";

const theme = createMuiTheme({
  typography: {
    fontSize: 30,
  },
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

const Clan = () => {
  const router = useRouter();

  const tag = router.query.tag;
  const apiURL = `/api/clan?tag=${tag}`;
  const { data, error } = useSWR(apiURL, fetcher, { revalidateOnFocus: false });
  if (error) return <div>Error</div>;
  if (!data)
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Loading...</h1>
        </main>
      </div>
    );

  const players = data.players;
  const clan_name = players[0].clan_name;
  return (
    <Layout>
      <MuiThemeProvider theme={theme}>
        <MaterialTable
          title={clan_name}
          columns={[
            { title: "Tag", field: "tag" },
            {
              title: "Name",
              field: "name",
            },
            {
              title: "👑",
              field: "barbarian_king",
            },
            {
              title: "👸",
              field: "archer_queen",
            },
            {
              title: "❤️",
              field: "grand_warden",
            },
            {
              title: "🧗",
              field: "royal_champion",
            },
            {
              title: "🧗",
              field: "barbarian_king",
            },
            {
              title: "🧗",
              field: "archer_queen",
            },
            {
              title: "🧗",
              field: "grand_warden",
            },
            {
              title: "🧗",
              field: "royal_champion",
            },
          ]}
          data={players}
          options={{
            draggable: false,
            headerStyle: {
              backgroundColor: "darkblue",
              position: "sticky",
              top: 0,
            },
            // maxBodyHeight: "calc(100vh - 341px)",
            search: false,
            // toolbar: false,
            pageSize: 25,
            pageSizeOptions: [10, 25, 50, 100],
            emptyRowsWhenPaging: false,
            cellStyle: {
              fontSize: "34pt",
              fontWeight: "bold",
              padding: "0%",
            },
          }}
          editable={{
            isEditable: (rowData) => false,
            isEditHidden: (rowData) => true,
            isDeletable: (rowData) => false,
            isDeleteHidden: (rowData) => true,
          }}
        />
      </MuiThemeProvider>
    </Layout>
  );
};

export default Clan;
