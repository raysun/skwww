import React, { useState } from "react";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "next/link";

const Home = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    clanTag: "y9llc99r"
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const go = () => {
    const { clanTag } = values;
    if (!clanTag) return;
    router.push(`/clan/${clanTag}`);
  };

  return (
    <Layout>
      <h1>Sidekick</h1>
      <TextField
        name="clanTag"
        label="Clan Tag"
        onChange={handleInputChange}
        value={values.clanTag}
      />
      <Link href="/clan/[tag]" as={`/clan/${values.clanTag}`}>
        <Button color="primary" variant="contained">
          Go
        </Button>
      </Link>

      <style jsx>{`
        li {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </Layout>
  );
};

export default Home;
