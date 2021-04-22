import { useSession } from "next-auth/client";
import Layout from "../components/layout";
import AccessDenied from "../components/access-denied";
import useSWR from "swr";
import fetcher from "../components/Fetcher";
// import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import MaterialTable from "material-table";
import { theme } from "../theme/table-theme";
import { MuiThemeProvider, Box, Paper, Avatar } from "@material-ui/core";
import React from "react";

export default function Page() {
    const [session, loading] = useSession();
    // const [players, setPlayers] = useState();

    const apiURL = `/api/guilds`;
    const {data, error} = useSWR(apiURL, fetcher);
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
                <AccessDenied/>
            </Layout>
        );
    }
    return (
        <Layout>
            <MuiThemeProvider theme={theme}>
                <MaterialTable
                    title="Guilds"
                    columns={[
                        {title: "Options", field: "options"},
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
                    data={data.guilds}
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

                                    // const newRows = Object.values(changes);
                                    // for (let row in newRows) {
                                    //     const index = row[1].tableData.id;
                                    //     pings[index] = row[0]
                                    // }
                                    // setData([...pings]);
                                    // resolve();
                                }, 1000);
                            }),
                        onRowAddCancelled: (rowData) => console.log("Row adding cancelled"),
                        onRowUpdateCancelled: (rowData) =>
                            console.log("Row editing cancelled"),
                        onRowAdd: (newData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    pings.push(newData);
                                    setData([...pings]);

                                    resolve();
                                }, 1000);
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {

                                    // console.log("new data");
                                    // const index = oldData.tableData.id;
                                    // pings[index] = newData;
                                    // setData([...pings]);
                                    resolve();
                                }, 1000);
                            }),
                        onRowDelete: (oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    // const dataDelete = [...data];
                                    const index = oldData.tableData.id;
                                    pings.splice(index, 1);
                                    setData([...pings]);

                                    resolve();
                                }, 1000);
                            }),
                    }}
                />
            </MuiThemeProvider>
        </Layout>
    );
}
