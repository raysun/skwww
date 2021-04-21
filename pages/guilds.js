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

export default function Page() {
    const [session, loading] = useSession();
    // const [players, setPlayers] = useState();

    const apiURL = `/api/guilds`;
