import puppeteer from "puppeteer-core";

const url = "https://www.sportybet.com/ng/sport/football/today";
const SBR_WS_ENDPOINT = 'wss://chrome.browserless.io?token=ce3864d2-5ac9-4051-b0e2-286342d0f7d4';

export async function main() {
    console.log('Connecting to Scraping Browser...');
    const browser = await puppeteer.connect({
        browserWSEndpoint: SBR_WS_ENDPOINT,
    });

    try {
        console.log('Connected! Navigating to', url);
        const page = await browser.newPage();
        await page.goto(url);

        console.log('Navigated! Waiting for ".match-league" class...');
        await page.waitForSelector('.match-league');
        console.log('Scraping class text...');

        const scrapedData = await page.evaluate(() => {
            const matchRows = document.querySelectorAll('.m-table-row.match-row');

            return Array.from(matchRows).map(row => {
                const homeTeam = row.querySelector('.home-team').textContent.trim();
                const awayTeam = row.querySelector('.away-team').textContent.trim();
                const gameId = row.querySelector('.game-id').textContent.trim().replace('ID: ', '');
                const clockTime = row.querySelector('.clock-time').textContent.trim();
                const odds = Array.from(row.querySelectorAll('.m-outcome-odds')).map(odd => odd.textContent.trim());

                const oddsObj = {
                    '1': odds[0],
                    'X': odds[1],
                    '2': odds[2],
                    'Over': odds[3],
                    'Under': odds[4]
                };

                const afSelectInputText = row.querySelector('.af-select-input').textContent.trim();

                return {
                    homeTeam,
                    awayTeam,
                    gameId,
                    clockTime,
                    odds: oddsObj,
                    afSelectInputText
                };
            });
        });

        // console.log('Scraped Data:', scrapedData);
        console.log('done');
    } finally {
        await browser.close();
    }
}

// main();
// main().catch(err => {
//     console.error(err.stack || err);
//     process.exit(1);
// });