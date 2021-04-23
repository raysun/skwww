import {useRouter} from "next/router";
import useSWR from "swr";
import fetcher from "../../components/Fetcher";
import styles from "../../styles/Home.module.css";
import React from "react";
import {MuiThemeProvider} from "@material-ui/core";
import MaterialTable from "material-table";
import Layout from "../../components/layout";
import { theme } from "../../theme/table-theme";


const Guild = () => {
    const router = useRouter();

    const guildId = router.query.guildId;
    console.log(guildId, 'ok');

    const apiURL = `/api/guilds?guildId=${guildId}`;
    const { data, error } = useSWR(apiURL, fetcher);
    if (error) return <div>Error</div>;
    console.log(data, 'ok');

    if (!data)
        return (
            <div className={styles.container}>
                <main className={styles.main}>
                    <h1 className={styles.title}>Loading...</h1>
                </main>
            </div>
        );

    console.log(data, 'ok');
    return (
        <Layout>
        <MuiThemeProvider theme={theme}>
            <MaterialTable
                title={guildId}
                columns={[
                    {title: "Clan Tag",  field: "clan_tag"},
                    {title: "War Enabled", field: "war"},
                    {title: "Feed Enabled", field: "feed"}
                ]}
                data={data.channels}
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
export default Guild;