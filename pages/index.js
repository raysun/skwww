import Head from "next/head";
import styles from "../styles/Home.module.css";
import useSWR from "swr";
import fetcher from "../components/Fetcher";
import Layout from "../components/layout";

export default function Home() {
  // const apiURL = `/api/hello`;
  // const { data, error } = useSWR(apiURL, fetcher, {
  //   revalidateOnFocus: false,
  // });
  // if (error) return <div>Error</div>;
  // if (!data)
  //   return (
  //     <div className={styles.container}>
  //       <main className={styles.main}>
  //         <h1 className={styles.title}>Clash Sidekick</h1>
  //         <h2>Loading...</h2>
  //       </main>
  //     </div>
  //   );
  // console.log(data);

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Clash Sidekick</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>Clash Sidekick</h1>
          {/* 
          <p className={styles.description}>
            Get started by editing{" "}
            <code className={styles.code}>pages/index.js</code>
          </p>
          <p></p>

          <div className={styles.grid}>
            <a href="https://nextjs.org/docs" className={styles.card}>
              <h3>Documentation &rarr;</h3>
              <p>Find in-depth information about Next.js features and API.</p>
            </a>

            <a href="https://nextjs.org/learn" className={styles.card}>
              <h3>Learn &rarr;</h3>
              <p>Learn about Next.js in an interactive course with quizzes!</p>
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
                Instantly deploy your Next.js site to a public URL with Vercel.
              </p>
            </a>
          </div> */}
        </main>

        <footer className={styles.footer}>
          {/* <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
          </a> */}
        </footer>
      </div>
    </Layout>
  );
}
