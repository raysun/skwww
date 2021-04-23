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
    if (!data) return <div>Error</div>;

    console.log(session);
    const guilds = data.guilds;
    console.log(guilds)

    if (!guilds) return <div>No Servers</div>

    return (
        <Layout>
            <MuiThemeProvider theme={theme}>
                <MaterialTable
                    title="Servers"
                    columns={[
                        { title: "Name", field: "name" },
                        {
                            title: "ID",
                            field: "id",
                        },
                        {
                            title: "icon",
                            field: "icon",
                        }
                    ]}
                    data={guilds}
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
