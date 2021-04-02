import React from "react";
import fetcher from "../../components/Fetcher";
import useSWR from "swr";
import { useRouter } from "next/router";

const Clan = (props) => {
  const router = useRouter();

  const tag = router.query.tag;
  const apiURL = `/api/clan?tag=${tag}`;
  console.log(apiURL);
  const { data, error } = useSWR(apiURL, fetcher, { revalidateOnFocus: false });
  if (error) return <div>Error</div>;
  if (!data)
    return (
      <>
        <h1>Clan Page</h1>
        <h3>{tag}</h3>
        <div>Loading...</div>
      </>
    );

  console.log(data);
  const members = data.members;
  const clan_name = members[0].clan_name;
  return (
    <>
      <h1>{clan_name}</h1>
      <ul>
        {members.map((member) => (
          <li key={member.name}>
            {member.tag} {member.name} {member.clan_tag}
          </li>
        ))}
      </ul>

      <style jsx>{`
        li {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </>
  );
};

export default Clan;
