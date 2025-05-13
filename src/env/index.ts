export enum ActorEnv {
  EnvActorId = "SCRAPELESS_ACTOR_ID",
  EnvRunId = "SCRAPELESS_RUN_ID",
  EnvUserId = "SCRAPELESS_USER_ID",
  EnvTeamId = "SCRAPELESS_TEAM_ID",
  EnvInput = "SCRAPELESS_INPUT",
  EnvApiKey = "SCRAPELESS_API_KEY",
  EnvToken = "SCRAPELESS_TOKEN",
  EnvXApiKey = "SCRAPELESS_X_API_KEY",
  EnvKvNamespaceId = "SCRAPELESS_KV_NAMESPACE_ID",
  EnvDatasetId = "SCRAPELESS_DATASET_ID",
  EnvBucketId = "SCRAPELESS_BUCKET_ID",
  EnvQueueId = "SCRAPELESS_QUEUE_ID",
  EnvScrapelessApiHost = "SCRAPELESS_API_HOST",
  EnvScrapelessCaptchaHost = "SCRAPELESS_CAPTCHA_HOST",
}

export function getEnv(key: keyof typeof ActorEnv) {
  const env = process.env[key];
  if (env === undefined) {
    // TODO - add a logger
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return env;
}
