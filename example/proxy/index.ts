import { Actor } from "scrapeless-actor-sdk-node";

function main() {
  const actor = new Actor();
  const proxyURL = actor.proxy.proxy({
    country: "US",
    sessionDuration: 180,
    sessionId: "your-session-id",
    gateway: "your-gateway",
  });

  console.log(`Proxy URL: ${proxyURL}`);
}

main();
