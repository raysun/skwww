import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import Layout from "../components/layout";
import AccessDenied from "../components/access-denied";
import useSWR from "swr";
import fetcher from "../components/Fetcher";
// import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import MaterialTable from "material-table";
import { theme } from "../../theme/table-theme";
import { MuiThemeProvider, Box, Paper, Avatar } from "@material-ui/core";

export default function Page() {
  const [session, loading] = useSession();
  // const [players, setPlayers] = useState();

  const apiURL = `/api/me`;
  const { data, error } = useSWR(apiURL, fetcher);
  if (error) return <div>Error</div>;
  console.log("data", data);
  if (!data)
    return (
      <Layout>
        <div className={styles.container}>
          <main className={styles.main}>
            <h2>Loading...</h2>
          </main>
        </div>
      </Layout>
    );

  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  }

  const players = data.players;
  const discord_name = players[0].discord_name;
  return (
    <Layout>
      <MuiThemeProvider theme={theme}>
        <MaterialTable
          title={discord_name}
          columns={[
            { title: "Tag", field: "tag" },
            {
              title: "Name",
              field: "name",
            },
            {
              title: "Clan",
              field: "clan_name",
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
          }}
          editable={{
            isEditable: (rowData) => true,
            // isEditHidden: (rowData) => rowData.name === "x",
            isDeletable: (rowData) => true,
            // isDeleteHidden: (rowData) => rowData.name === "y",
            onBulkUpdate: (changes) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  /* setData([...data, newData]); */

                  resolve();
                }, 1000);
              }),
            onRowAddCancelled: (rowData) => console.log("Row adding cancelled"),
            onRowUpdateCancelled: (rowData) =>
              console.log("Row editing cancelled"),
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  /* setData([...data, newData]); */

                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...data];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setData([...dataUpdate]);

                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...data];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  setData([...dataDelete]);

                  resolve();
                }, 1000);
              }),
          }}
        />
      </MuiThemeProvider>
    </Layout>
  );
}
