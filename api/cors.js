function handlePreflight(res) {
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600");
  res.status(204).send("");
}

exports.handlePreflight = handlePreflight;
