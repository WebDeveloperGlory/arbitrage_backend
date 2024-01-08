const express = require("express");
const scraperRoutes = require("./routes/scraperRoutes");

const app = express();
const PORT = process.env.PORT || 3002;

// MIDDLEWARES //
app.use(express.json());
// END OF MIDDLEWARES //

app.use(scraperRoutes);

app.listen( PORT, () => {
    console.log(`Product service running on port ${PORT}`)
} )