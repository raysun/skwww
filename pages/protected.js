import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import Layout from "../components/layout";
import AccessDenied from "../components/access-denied";
import useSWR from "swr";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

export default function Page() {
  const [session, loading] = useSession();
  const [content, setContent] = useState();

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

  const router = useRouter();

  const tag = router.query.tag;
  const apiURL = `/api/clan?tag=${tag}`;
  console.log(apiURL);
  const { data, error } = useSWR(apiURL, fetcher, {
    revalidateOnFocus: false,
  });
  if (error) return <div>Error</div>;
  if (!data)
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Loading...</h1>
        </main>
      </div>
    );

  console.log(data);
  const members = data.members;
  const clan_name = members[0].clan_name;
  return (
    <Layout>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>{clan_name}</h1>
          <ul>
            {members.map((member) => (
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
