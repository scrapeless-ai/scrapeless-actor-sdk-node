import { Actor } from "scrapeless-actor-sdk-node";

async function main() {
  const actor = new Actor();

  try {
    const res = await actor.storage.queue.push({
      name: "test",
      payload: "queue test",
      retry: 3,
      timeout: 60000,
      deadline: 0,
    });

    if (res.msgId) {
      const queue = await actor.storage.queue.pull();

      for (const item of queue) {
        actor.storage.queue.ack(item.id);
      }
    }
  } catch (error) {}
}

main();
