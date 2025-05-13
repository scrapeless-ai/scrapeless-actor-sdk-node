import { Actor } from "scrapeless-actor-sdk-node";

async function main() {
  const actor = new Actor();
  try {
    const res = await actor.storage.dataset.addItems([
      {
        name: "John",
        age: 20,
      },
      {
        name: "lucy",
        age: 19,
      },
    ]);

    if (res.success) {
      const data = await actor.storage.dataset.getItems({
        page: 1,
        pageSize: 10,
      });

      console.log("items: ", data.items);
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}

main();
