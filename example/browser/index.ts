import { Actor } from "scrapeless-actor-sdk-node";
import puppeteer from "puppeteer-core";

async function main() {
  const actor = new Actor();

  const { devtoolsUrl } = actor.browser.create({
    session_ttl: 180,
    proxy_country: "US",
  });

  const browser = await puppeteer.connect({ browserWSEndpoint: devtoolsUrl });
  const page = await browser.newPage();
  await page.goto("https://www.scrapeless.com");
  console.log(await page.title());
  await browser.close();
}

main();
