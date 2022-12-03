#!/usr/bin/env node

const app = require("../app");
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
