import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import Layout from "../components/layout";
import AccessDenied from "../components/access-denied";
import useSWR from "swr";
import fetcher from "../components/Fetcher";
// import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import MaterialTable from "material-table";
import {
  createMuiTheme,
  MuiThemeProvider,
  Box,
  Paper,
  Avatar,
} from "@material-ui/core";

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

export default function Page() {
  const [session, loading] = useSession();
  // const [players, setPlayers] = useState();

  const apiURL = `/api/autoping`;
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
  // Fetch content from protected route
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch("/api/clan");
  //     const json = await res.json();
  //     if (json.players) {
  //       setPlayers(json.players);
  //     }
  //   };
  //   fetchData();
  // }, [session]);

  // When rendering client side don't display anything until loading is complete
  // if (
  //   (typeof window !== "undefined" && loading) ||
  //   !players ||
  //   players.length == 0
  // )
  //   return null;

  // If no session exists, display access denied message
  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  }

  const pings = data.pings;
  const discord_name = pings[0].discord_name;
  return (
    <Layout>
      <MuiThemeProvider theme={theme}>
        <MaterialTable
          title="Autopings"
          columns={[
            { title: "Options", field: "options" },
            {
              title: "Hours Remaining",
              field: "hours_remaining",
              type: "numeric",
            },
            {
              title: "Message",
              field: "message",
            },
          ]}
          data={data.pings}
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
            isDeletable: (rowData) => true,
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

// const clan_name = players[0].clan_name;
// const discord_name = players[0].discord_name;
// const players = data.players;
// Players in clan
// <div className={styles.container}>
//   <main className={styles.main}>
//     <h1 className={styles.title}>{discord_name}'s players</h1>
//     <ul>
//       {players.map((member) => (
//         <li key={member.name}>
//           {member.tag} {member.name}
//         </li>
//       ))}
//     </ul>
//   </main>
// </div>;

// // If session exists, display content
// return (
//   <Layout>
//     <h1>Protected Page</h1>
//     <p>
//       <strong>{content || "\u00a0"}</strong>
//     </p>
//   </Layout>
// );
// }
