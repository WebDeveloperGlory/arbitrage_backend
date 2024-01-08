const db = require("../models");
const scraperMain = require("../functions/scraper");

exports.saveTodayGamesToDb = async (req, res) => {
    try {
        console.log('Running the scraper...');
        const scrapedData = await scraperMain(); // Run the scraper and get the data

        console.log('Saving data to MongoDB...');
        const games = await db.Sporty.insertMany(scrapedData);
        
        res.status(200).json({
            message: "Games Gotten Successfully",
            games
        });
    } catch( err ) {
        return res.status(400).json({ message: "An error occured", err });
    }
}

exports.getTodayGames = async (req, res) => {
    try {
        const games = await db.Sporty.find({});

        return res.status(200).json({ message: "All Sporty Games", games });
    } catch( err ) {
        return res.status(400).json({ message: "An error occured", err });
    }
}

module.exports = exports;