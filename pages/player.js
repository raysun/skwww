import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import Layout from "../components/layout";
import AccessDenied from "../components/access-denied";
// import useSWR from "swr";
// import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

export default function Page() {
  const [session, loading] = useSession();
  const [players, setPlayers] = useState();

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/clan");
      const json = await res.json();
      if (json.players) {
        setPlayers(json.players);
      }
    };
    fetchData();
  }, [session]);

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null;

  // If no session exists, display access denied message
  if (!session || players.length == 0) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  }

  const clan_name = players[0].clan_name;
  return (
    <Layout>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>{clan_name}</h1>
          <ul>
            {players.map((member) => (
              <li key={member.name}>
                {member.tag} {member.name}
              </li>
            ))}
          </ul>
        </main>
      </div>
    </Layout>
  );
}

// // If session exists, display content
// return (
//   <Layout>
//     <h1>Protected Page</h1>
//     <p>
//       <strong>{content || "\u00a0"}</strong>
//     </p>
//   </Layout>
// );
// }
