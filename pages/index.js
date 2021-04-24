import { useSession } from "next-auth/client";
import Layout from "../components/layout";
import AccessDenied from "../components/access-denied";
import useSWR from "swr";
import fetcher from "../components/Fetcher";
// import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import MaterialTable from "material-table";
import { theme } from "../theme/table-theme";
import {
  MuiThemeProvider,
  Box,
  Paper,
  Avatar,
  GridList,
  GridListTile,
  GridListTileBar,
  Grid,
} from "@material-ui/core";
import React from "react";

const discordCDNBase = "https://cdn.discordapp.com/icons/";
const skBlackAndWhiteAvatar =
  "https://cdn.discordapp.com/avatars/296718635513413632/52b80dbbe9ece30338ecc3733934795b.webp";

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//     },
//     paper: {
//         padding: theme.spacing(2),
//         textAlign: 'center',
//         color: theme.palette.text.secondary,
//     },
// }));

export default function Page() {
  const [session, loading] = useSession();
  // const [players, setPlayers] = useState();

  const apiURL = `/api/guilds`;
  const { data, error } = useSWR(apiURL, fetcher);
  if (error) return <div>Error</div>;
  if (!data) return <div>Loading...</div>;

  console.log(session);
  const guilds = data.guilds;
  console.log(guilds);

  return (
    <Layout>
      <Grid container spacing={3} alignItems="center" justify="center">
        {!guilds && <div>No Servers</div>}
        {guilds &&
          guilds.map((guild) => (
            <Grid
              item
              xs
              key={guild.id}
              href={"/guilds/" + guild.id}
              component={"a"}
            >
              <img
                src={
                  guild.icon !== null
                    ? discordCDNBase + guild.id + "/" + guild.icon + ".webp"
                    : skBlackAndWhiteAvatar
                }
                alt={guild.name}
              />
            </Grid>
          ))}
      </Grid>
    </Layout>
  );
}
