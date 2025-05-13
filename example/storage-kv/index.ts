import { Actor } from "scrapeless-actor-sdk-node";

async function main() {
  const actor = new Actor();

  try {
    const res = await actor.storage.kv.setValue({
      key: "key",
      value: "nice boy",
    });

    if (res.success) {
      const data = await actor.storage.kv.getValue("key");

      console.log("items: ", data);
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}

main();
