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
  Grid,
  GridListTileBar,
  Typography,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const discordCDNBase = "https://cdn.discordapp.com/icons/";
const skBlackAndWhiteAvatar =
  "https://cdn.discordapp.com/avatars/296718635513413632/52b80dbbe9ece30338ecc3733934795b.webp";


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function GridItem({ classes }) {
  return (
    // From 0 to 600px wide (smart-phones), I take up 12 columns, or the whole device width!
    // From 600-690px wide (tablets), I take up 6 out of 12 columns, so 2 columns fit the screen.
    // From 960px wide and above, I take up 25% of the device (3/12), so 4 columns fit the screen.
    <Grid></Grid>
  );
}

export default function Page() {
  const [session, loading] = useSession();
  // const [players, setPlayers] = useState();

  const apiURL = `/api/guilds`;
  const { data, error } = useSWR(apiURL, fetcher, { revalidateOnFocus: false });
  if (error) return <div>Error</div>;
  if (!data) return <div>Loading...</div>;

  console.log(session);
  const guilds = data.guilds;
  console.log(guilds);

  return (
      <Layout>
        <Grid container spacing={3} sm={6} md={8} xl={8} align={"center"} justify={"center"}>
          {!guilds && <div>No Servers</div>}
          {guilds &&
            guilds.map((guild) => (
              <Button
                  key={guild.id}>
                <Grid item>
                  <Grid item>
                    <Button href={"/guilds/" + guild.id}>
                        <img src={
                          guild.icon !== null
                              ? discordCDNBase +
                              guild.id +
                              "/" +
                              guild.icon +
                              ".webp"
                              : skBlackAndWhiteAvatar
                        }
                        alt={guild.name}
                    />
                  </Button>
                  </Grid>
                  <Grid>
                    <Typography>{guild.name}</Typography>
                  </Grid>
                </Grid>
              </Button>
          ))}
      </Grid>
    </Layout>
  );
}
