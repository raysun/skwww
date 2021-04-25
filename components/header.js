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
} from "@material-ui/core";

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const [session, loading] = useSession();

  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <p
        className={`nojs-show ${
          !session && loading ? styles.loading : styles.loaded
        }`}
      >
        <GridList container spacing="4">
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
        </GridList>
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
