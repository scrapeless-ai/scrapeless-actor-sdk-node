import { Actor } from "scrapeless-actor-sdk-node";

async function main() {
  const actor = new Actor();

  const res = await actor.storage.object.put({
    file: "/object.json",
  });
}
