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
    <Toolbar>
      <Typography variant="h5" className={classes.title}>
        Clash Sidekick
      </Typography>
      {session && session.user.image && (
        <Avatar className={styles.avatar} src={session.user.image}></Avatar>
      )}
      <strong>{session && session.user.name}</strong>
      <Button
        color="inherit"
        href={`/api/auth/signin`}
        className={styles.buttonPrimary}
        onClick={(e) => {
          e.preventDefault();
          session ? signOut() : signIn("discord");
        }}
      >
        {session ? "Logout" : "Login"}
      </Button>
    </Toolbar>
  );
  return (
    <header>
      <p
        className={`nojs-show ${
          !session && loading ? styles.loading : styles.loaded
        }`}
      >
        <Grid container>
          <Grid className={styles.title} item>
            Clash Sidekick
          </Grid>
          {!session && (
            <Grid item container justify="flex-end">
              <Grid item>You are not signed in</Grid>
              <Grid item>
                <a
                  href={`/api/auth/signin`}
                  className={styles.buttonPrimary}
                  onClick={(e) => {
                    e.preventDefault();
                    signIn("discord");
                  }}
                >
                  Sign in
                </a>
              </Grid>
            </Grid>
          )}
          {session && (
            <Grid item container justify="flex-end" alignItems="center">
              <Grid item>
                {session.user.image && (
                  <Avatar
                    className={styles.avatar}
                    src={session.user.image}
                  ></Avatar>
                )}
              </Grid>
              <Grid item>
                <strong>{session.user.name}</strong>
              </Grid>
              <Grid item>
                <a
                  href={`/api/auth/signout`}
                  className={styles.button}
                  onClick={(e) => {
                    e.preventDefault();
                    signOut();
                  }}
                >
                  Sign out
                </a>
              </Grid>
            </Grid>
          )}
        </Grid>
      </p>
      <nav>
        <ul className={styles.navItems}>
          {/* <li className={styles.navItem}>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li> */}
          <li className={styles.navItem}>
            <Link href="/">
              <a>Guilds</a>
            </Link>
          </li>
          {/* <li className={styles.navItem}>
            <Link href="/client">
              <a>Client</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/server">
              <a>Server</a>
            </Link>
          </li> */}
          <li className={styles.navItem}>
            <Link href="/clan">
              <a>Clan</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/me">
              <a>Me</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/autoping">
              <a>Autoping</a>
            </Link>
          </li>

          {/* <li className={styles.navItem}>
            <Link href="/api-example">
              <a>API</a>
            </Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}
