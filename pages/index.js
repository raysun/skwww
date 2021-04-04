import Head from "next/head";
import styles from "../styles/Home.module.css";
import useSWR from "swr";
import fetcher from "../components/Fetcher";
import Layout from "../components/layout";
import MaterialTable from "material-table";
import {
  createMuiTheme,
  MuiThemeProvider,
  Box,
  Paper,
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

export default function Home() {
  const apiURL = `/api/hello`;
  const { data, error } = useSWR(apiURL, fetcher, {
    revalidateOnFocus: false,
  });
  if (error) return <div>Error</div>;
  if (!data)
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Clash Sidekick</h1>
          <h2>Loading...</h2>
        </main>
      </div>
    );
  console.log(data);

  return (
    <Layout>
      <MuiThemeProvider theme={theme}>
        <div className={styles.container}>
          <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main className={styles.main}>
            <h1 className={styles.title}>Clash Sidekick</h1>
            <h2>{data.tag}</h2>
            <p className={styles.description}>
              Get started by editing{" "}
              <code className={styles.code}>pages/index.js</code>
            </p>
            <p>
              <MaterialTable
                title="Auto-Pings"
                columns={[
                  { title: "Clan", field: "clan" },
                  { title: "Channel", field: "channel" },
                  {
                    title: "Hours Remaining",
                    field: "hoursRemaining",
                    type: "numeric",
                  },
                  {
                    title: "Message",
                    field: "message",
                  },
                ]}
                data={[
                  {
                    clan: "Reddit",
                    channel: "#reddit-mathsman",
                    hoursRemaining: 1,
                    message: "Only 1 hour left - Get your hits in!!",
                  },
                  {
                    clan: "Reddit",
                    channel: "#reddit-mathsman",
                    hoursRemaining: 2,
                    message:
                      "2 hours left in war! Get those hits in - Let's go!",
                  },
                ]}
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
              />
            </p>

            <div className={styles.grid}>
              <a href="https://nextjs.org/docs" className={styles.card}>
                <h3>Documentation &rarr;</h3>
                <p>Find in-depth information about Next.js features and API.</p>
              </a>

              <a href="https://nextjs.org/learn" className={styles.card}>
                <h3>Learn &rarr;</h3>
                <p>
                  Learn about Next.js in an interactive course with quizzes!
                </p>
              </a>

              <a
                href="https://github.com/vercel/next.js/tree/master/examples"
                className={styles.card}
              >
                <h3>Examples &rarr;</h3>
                <p>Discover and deploy boilerplate example Next.js projects.</p>
              </a>

              <a
                href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                className={styles.card}
              >
                <h3>Deploy &rarr;</h3>
                <p>
                  Instantly deploy your Next.js site to a public URL with
                  Vercel.
                </p>
              </a>
            </div>
          </main>

          <footer className={styles.footer}>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by{" "}
              <img
                src="/vercel.svg"
                alt="Vercel Logo"
                className={styles.logo}
              />
            </a>
          </footer>
        </div>
      </MuiThemeProvider>
    </Layout>
  );
}
