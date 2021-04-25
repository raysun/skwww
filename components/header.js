import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";
import styles from "./header.module.css";
import {
  MuiThemeProvider,
  Box,
  Paper,
  Avatar,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const classes = useStyles();
  const [session, loading] = useSession();

  return (
    <>
      <Toolbar>
        <Typography variant="h5" className={classes.title}>
          <Link href="/">Clash Sidekick</Link>
        </Typography>
        <li className={styles.navItem}>
          <Link href="/clan">
            <a>Clan</a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/autoping">
            <a>Autoping</a>
          </Link>
        </li>
        {session && session.user.image && (
          <Avatar className={styles.avatar} src={session.user.image}></Avatar>
        )}
        <strong>{session && session.user.name}</strong>
        <Button
          color="inherit"
          href={`/api/auth/signin`}
          onClick={(e) => {
            e.preventDefault();
            session ? signOut() : signIn("discord");
          }}
        >
          {session ? "Logout" : "Login"}
        </Button>
      </Toolbar>
    </>
  );
}
