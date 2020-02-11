const db = require("./db");
const cors = require("./cors");

module.exports = async (req, res) => {
  query = db.connect();

  res.set("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") {
    cors.handlePreflight(res);
  } else if (req.method === "GET") {
    console.log(req.query.tag);
    if (req.query.tag == undefined) {
      res.status(500).send({ error: "No clan tag" });
      return;
    }
    const tag = "#" + req.query.tag.replace("#", "");
    console.log(`Get clan ${tag}`);

    const clans = await query("SELECT * FROM clan WHERE tag = ?", [tag]);
    const clan = clans[0];

    const players = await query("SELECT * FROM player WHERE clan_tag = ?", [
      clan.tag
    ]);
    clan.players = players;

    const attacks = await query(
      `
     SELECT x.tag, 
    x.name, 
    x.rank, 
    x.thLevel, 
    x.warID,
    x.order_,
    x.attackerTag,
    x.defenderTag,
    x.stars,
    x.new_stars,
    x.destructionPercentage,
    war_player.tag as defenderTag, 
    war_player.name as defenderName, 
    war_player.rank as defenderRank, 
    war_player.thLevel as defenderTH, 
    x.attacker_is_home_clan,
    x.home_clan_tag,
    x.home_clan_name,
    x.home_clan_level,
    x.enemy_clan_tag,
    x.enemy_clan_name,
    x.enemy_clan_level, 
    x.war_start_time,
    x.war_size,
    x.type
    FROM
    (
    SELECT war_player.tag, 
    war_player.name, 
    war_player.rank, 
    war_player.thLevel, 
    war_attack.*, 
    war_player.isHome as attacker_is_home_clan,
    clan_war.tag as home_clan_tag,
    clan_war.name as home_clan_name,
    clan_war.clanLevel as home_clan_level,
    clan_war.opp_tag as enemy_clan_tag,
    clan_war.opp_name as enemy_clan_name,
    clan_war.opp_clanLevel as enemy_clan_level, 
    clan_war.startTime as war_start_time,
    clan_war.teamSize as war_size,
    clan_war.type as type
    FROM 
    ( 
    select * from war where tag = ?
    order by startTime DESC
    LIMIT 25
    ) as clan_war
    join war_player on war_player.warID = clan_war.warID 
    join war_attack on war_attack.attackerTag = war_player.tag and war_attack.warID = war_player.warID
    ) 
    as x 
    join war_player on war_player.tag = x.defenderTag and war_player.warID = x.warID
    `,
      [clan.tag]
    );

    res.status(200).send({ clan: clan, attacks: attacks });
  }
};
