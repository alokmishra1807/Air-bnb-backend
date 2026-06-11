require("ts-node/register");

const config = require("./db.config").default


module.exports = config;



//ts-node/register on the runtime itself convert ts files into js file