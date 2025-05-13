import { Actor } from "scrapeless-actor-sdk-node";

async function main() {
  const actor = new Actor();
  try {
    const res = await actor.captcha.captchaSolver({
      actor: "captcha.recaptcha",
      input: {
        version: "v2",
        pageURL: "https://venue.cityline.com",
        siteKey: "6Le_J04UAAAAAIAfpxnuKMbLjH7ISXlMUzlIYwVw",
      },
    });

    console.log(res);
  } catch (error) {
    console.error("Error: ", error);
  }
}

main();
