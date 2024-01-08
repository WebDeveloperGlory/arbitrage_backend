const { Router } = require("express");
const controller = require("../controllers/scraperControllers");

const router = Router();

router.get("/sporty", controller.getTodayGames);
router.post("/sporty", controller.saveTodayGamesToDb);

module.exports = router;