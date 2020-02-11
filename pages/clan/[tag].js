import { useRouter } from "next/router";
import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import { Chart } from "react-charts";
import useSWR from "swr";

import Layout from "../../components/layout";
import fetcher from "../../components/fetcher";
const constants = require("../../components/constants.json");

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

const Clan = props => {
  const router = useRouter();
  const classes = useStyles();
  var clanTag = router.query.tag;
  if (clanTag == undefined) return <div>No clan tag</div>;

  clanTag = clanTag.replace("#", "");
  const url = constants.baseURL + "/clan?tag=" + clanTag;
  const { data, error } = useSWR(url, fetcher);
  if (error)
    return (
      <Layout>
        <div>Clan tag {email} not found in Sidekick</div>
      </Layout>
    );
  if (!data)
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  const attacks = data.attacks;
  const clan = data.clan;
  // const players = clan.players;
  console.log(clan);
  console.log(attacks);

  const chartData = [
    {
      label: "Attacks",
      data: []
    },
    {
      label: "Defense",
      data: []
    }
  ];
  const finalChartData = [
    {
      label: "Attacks",
      data: []
    },
    {
      label: "Defense",
      data: []
    }
  ];
  const series = {
    type: "bar"
  };
  const axes = [
    { primary: true, type: "ordinal", position: "bottom" },
    {
      primary: false,
      type: "linear",
      position: "left",
      minimum: 0,
      maximum: 100,
      interval: 10
    }
  ];

  for (var i = 0; i < attacks.length; i++) {
    if (attacks[i].attacker_is_home_clan == 1) {
      var inList = false;
      for (var j = 0; j < chartData[0].data.length; j++) {
        if (chartData[0].data[j][0].tag == attacks[i].attackerTag) {
          chartData[0].data[j][1].goodAttacks += attacks[i].stars == 3 ? 1 : 0;
          chartData[0].data[j][1].totalAttacks += 1;
          inList = true;
          break;
        }
      }
      if (!inList) {
        chartData[0].data.push([
          {
            tag: attacks[i].attackerTag,
            name: attacks[i].name
          },
          {
            goodAttacks: attacks[i].stars == 3 ? 1 : 0,
            totalAttacks: 1
          }
        ]);
      }
    } else {
      var inList = false;
      for (var j = 0; j < chartData[1].data.length; j++) {
        if (chartData[1].data[j][0].tag == attacks[i].defenderTag) {
          chartData[1].data[j][1].goodAttacks += attacks[i].stars == 3 ? 0 : 1;
          chartData[1].data[j][1].totalAttacks += 1;
          inList = true;
          break;
        }
      }
      if (!inList) {
        chartData[1].data.push([
          {
            tag: attacks[i].defenderTag,
            name: attacks[i].defenderName
          },
          {
            goodAttacks: attacks[i].stars == 3 ? 0 : 1,
            totalAttacks: 1
          }
        ]);
      }
    }
  }
  const MIN_ATTACKS = 3;
  console.log(chartData);
  chartData[0].data = chartData[0].data.filter(
    d => d[1].totalAttacks > MIN_ATTACKS
  );
  chartData[1].data = chartData[1].data.filter(
    d => d[1].totalAttacks > MIN_ATTACKS
  );
  for (var i = 0; i < chartData[0].data.length; i++) {
    finalChartData[0].data.push([
      chartData[0].data[i][0].name,
      (chartData[0].data[i][1].goodAttacks /
        chartData[0].data[i][1].totalAttacks) *
        100
    ]);
  }
  for (var i = 0; i < chartData[1].data.length; i++) {
    finalChartData[1].data.push([
      chartData[1].data[i][0].name,
      (chartData[1].data[i][1].goodAttacks /
        chartData[1].data[i][1].totalAttacks) *
        100
    ]);
  }
  const sorter = (x, y) => y[1] - x[1];
  finalChartData[0].data = finalChartData[0].data.sort(sorter);
  console.log(finalChartData);

  return (
    <Layout>
      <h1>{clan.name}</h1>
      <div>{clan.tag}</div>
      <div
        style={{
          width: "1250px",
          height: "600px"
        }}
      >
        <Chart data={finalChartData} series={series} axes={axes} />
      </div>
    </Layout>
  );
};

export default Clan;
