import React from "react";
import fetcher from "../../components/Fetcher";
import useSWR from "swr";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";

const Clan = () => {
  const router = useRouter();

  const tag = router.query.tag;
  const apiURL = `/api/clan?tag=${tag}`;
  console.log(apiURL);
  const { data, error } = useSWR(apiURL, fetcher, { revalidateOnFocus: false });
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
  );
};

export default Clan;
