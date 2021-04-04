import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import Layout from "../components/layout";
import AccessDenied from "../components/access-denied";
// import styles from "../styles/Home.module.css";
// import useSWR from "swr";
// import fetcher from "../components/Fetcher";

export default function Page() {
  const [session, loading] = useSession();
  const [content, setContent] = useState();

  // const apiURL = `/api/examples/protected`;
  // const { data, error } = useSWR(apiURL, fetcher, {
  //   revalidateOnFocus: false,
  // });
  // if (error) return <div>Error</div>;
  // if (!data)
  //   return (
  //     <Layout>
  //       <div className={styles.container}>
  //         <main className={styles.main}>
  //           <h1 className={styles.title}>Clash Sidekick</h1>
  //           <h2>Loading...</h2>
  //         </main>
  //       </div>
  //     </Layout>
  //   );
  // console.log(data);
  // console.log(session);

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/examples/protected");
      const json = await res.json();
      if (json.content) {
        setContent(json.content);
      }
    };
    fetchData();
  }, [session]);

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null;

  // If no session exists, display access denied message
  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  }

  // If session exists, display content
  return (
    <Layout>
      <h1>Protected Page</h1>
      <p>
        <strong>{content || "\u00a0"}</strong>
      </p>
      <p>{session}</p>
    </Layout>
  );
}
