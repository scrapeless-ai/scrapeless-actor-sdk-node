export enum ScrapelessCaptchaEnum {
  RecaptchaVersionV2 = "v2",
  RecaptchaVersionV3 = "v3",
}

export interface IPagination<T> {
  total: number;
  totalPage: number;
  page: number;
  pageSize: number;
  items: T[];
}

export interface IActorRunOptions {
  CPU?: number;
  memory?: number;
  timeout?: number;
  version?: string;
}

export interface IStorageCreateData {
  actorId?: string;
  name: string;
  runId?: string;
}

export interface IStorageCommonResponse {
  success: boolean;
  message: string;
}

export interface IPaginationParams {
  page: number;
  pageSize: number;
  desc?: boolean;
}

export interface ICreateActorData {
  description?: string;
  gitRepo: string;
  isPublic?: boolean;
  name: string;
  defaultRunOptions?: IActorRunOptions;
  title: string;
  version: string;
}

export interface ICreateActorResponse {
  actorId: string;
  userId: string;
  teamId: string;
  name: string;
  title: string;
  description: string;
  version: string;
  gitRepo: string;
  imageURL: string;
  isPublic: boolean;
  inputSchema: Record<string, any>;
  defaultRunOptions: IActorRunOptions;
}

export interface IRunActorData<T> {
  input: T;
  runOptions: IActorRunOptions;
}

export interface IRunActorResponse<T> {
  actorId: string;
  finishedAt: Date;
  input: T;
  runId: string;
  runOptions: IActorRunOptions;
  startedAt: Date;
  stats: {
    CPU: number;
    memory: number;
    timeout: number;
    version: string;
  };
  status: string;
  teamId: string;
  userId: string;
}

export type IActorUpdateData = Partial<ICreateActorData>;

export interface IActorBuildResponse {
  buildId: string;
  finishedAt: string;
  logs: string[];
  message: string;
  startedAt: string;
  status: string;
}

export interface IDatasetListParams extends IPaginationParams {
  actorId?: string;
  runId?: string;
}

export interface IDatasetList {
  id: string;
  name: string;
  actorId: string;
  runId: string;
  fields: string[] | null;
  createdAt: Date;
  updatedAt: Date;
  accessedAt: Date;
  stats: {
    itemCount: number;
    cleanItemCount: number;
  };
}

export interface IKVNamespaceItem {
  accessedAt: Date;
  actorId: string;
  createdAt: Date;
  id: string;
  name: string;
  runId: string;
  updatedAt: Date;
}

export type IKVCommonResponse = Pick<IStorageCommonResponse, "success">;
export type IObjectCommonResponse = Pick<IStorageCommonResponse, "success">;
export type IQueueCommonResponse = Pick<IStorageCommonResponse, "success">;

export interface IKVListItem {
  key: string;
  size: number;
}

export interface IKVValueData {
  key: string;
  value: string;
  expiration?: number;
}

export interface IObjectListParams extends IPaginationParams {
  actor?: string;
  runId?: string;
}

export interface IObjectBucketItem {
  actorId: string;
  createdAt: Date;
  description: string;
  id: string;
  name: string;
  runId: string;
  size: number;
  updatedAt: Date;
}

export type IObjectBucketsPagination<T> = Omit<IPagination<T>, "items"> & {
  buckets: T[];
};

export type IObjectObjectsPagination<T> = Omit<IPagination<T>, "items"> & {
  objects: T[];
};

export interface IObjectCreateData {
  description?: string;
  name: string;
}

export type IObjectPaginationParams = Omit<IPaginationParams, "desc"> & {
  search?: string;
};

export interface IObjectBucketObjectItem {
  actorId: string;
  bucketId: string;
  createdAt: Date;
  fileType: string;
  filename: string;
  id: string;
  path: string;
  runId: string;
  size: number;
  updatedAt: Date;
}

export interface IObjectBucketUploadData {
  actorId?: string;
  runId?: string;
  file: string;
}

export interface IObjectUploadResponse extends IObjectCommonResponse {
  size: number;
  object_id: string;
}

export interface IQueueItem {
  actor_id: string;
  created_at: {
    nanos: number;
    seconds: number;
  };
  description: string;
  id: string;
  name: string;
  run_id: string;
  stats: {
    failed: number;
    pending: number;
    running: number;
    success: number;
  };
  team_id: string;
  updated_at: {
    nanos: number;
    seconds: number;
  };
  user_id: string;
}

export interface IQueueMessageItem {
  deadline: number;
  desc: string;
  failedAt: number;
  id: string;
  name: string;
  payload: string;
  queueId: string;
  retried: number;
  retry: number;
  successAt: Date;
  timeout: number;
}

export interface IQueueCreateData {
  name: string;
  description?: string;
}

export interface IQueueUpdateData {
  description?: string;
  name: string;
}

export interface IQueuePushParams {
  name: string;
  payload: string;
  retry: number;
  timeout: number;
  deadline: number;
}

export interface IQueuePushResponse {
  msgId: string;
}

export interface ICreateCaptcha {
  actor: string;
  input: object;
  proxy?: string;
}

export interface ICreateCaptchaResponse {
  state: "idle";
  success: boolean;
  taskId: string;
}

export interface IGetCaptchaResult {
  actor: string;
  createTime: number;
  elapsed: number;
  state?: string;
  solution: {
    token: string;
  };
  success: boolean;
  taskId: string;
}

export interface ICreateBrowser {
  session_ttl?: number;
  proxy_country?: string;
  fingerprint?: object;
}

export interface ICreateBrowserResponse {
  devtoolsUrl: string;
}

export interface ICreateProxy {
  country: string;
  sessionDuration: number;
  sessionId: string;
  gateway: string;
}

export interface IDatasetStorage {
  listDatasets: (
    params: IDatasetListParams
  ) => Promise<IPagination<IDatasetList>>;
  createDataset: (name: string) => Promise<IDatasetList>;
  updateDataset: (name: string) => Promise<IDatasetList>;
  delDataset: () => Promise<IStorageCommonResponse>;
  addItems: <T extends object>(
    items: Array<T>
  ) => Promise<IStorageCommonResponse>;
  getItems: <T>(params: IPaginationParams) => Promise<IPagination<T>>;
}

export interface IKVStorage {
  listNamespaces: (
    params: IPaginationParams
  ) => Promise<IPagination<IKVNamespaceItem>>;
  createNamespace: (name: string) => Promise<IKVNamespaceItem>;
  getNamespace: (namespaceId: string) => Promise<IKVNamespaceItem>;
  delNamespace: () => Promise<IKVCommonResponse>;
  renameNamespace: (name: string) => Promise<IKVCommonResponse>;
  listKeys: (
    params: Omit<IPaginationParams, "desc">
  ) => Promise<IPagination<IKVListItem>>;
  delValue: (key: string) => Promise<IKVCommonResponse>;
  bulkSetValue: (data: IKVValueData[]) => Promise<IKVCommonResponse>;
  bulkDelValue: (keys: string[]) => Promise<IKVCommonResponse>;
  setValue: (data: IKVValueData) => Promise<IKVCommonResponse>;
  getValue: (key: string) => Promise<string>;
}

export interface IObjectStorage {
  listBuckets: (
    params: IObjectListParams
  ) => Promise<IObjectBucketsPagination<IObjectBucketItem>>;
  createBucket: (data: IObjectCreateData) => Promise<IObjectBucketItem>;
  deleteBucket: () => Promise<IObjectCommonResponse>;
  getBucket: () => Promise<IObjectBucketItem>;
  list: (
    params: IObjectPaginationParams
  ) => Promise<IObjectObjectsPagination<IObjectBucketObjectItem>>;
  get: (objectId: string) => Promise<Blob>;
  put: (data: IObjectBucketUploadData) => Promise<IObjectUploadResponse>;
  delete: (objectId: string) => Promise<IObjectCommonResponse>;
}

export interface IQueueStorage {
  list: (params: IPaginationParams) => Promise<IPagination<IQueueItem>>;
  create: (data: IQueueCreateData) => Promise<Pick<IQueueItem, "id" | "name">>;
  get: (name: string) => Promise<IQueueItem>;
  update: (data: IQueueUpdateData) => Promise<void>;
  delete: () => Promise<IQueueCommonResponse>;
  push: (params: IQueuePushParams) => Promise<IQueuePushResponse>;
  pull: () => Promise<IQueueMessageItem[]>;
  ack: (msgId: string) => Promise<IQueueCommonResponse>;
}

export interface ScrapelessActorStorage {
  dataset: IDatasetStorage;
  kv: IKVStorage;
  object: IObjectStorage;
  queue: IQueueStorage;
}

export interface ScrapelessCaptcha {
  captchaCreate: (data: ICreateCaptcha) => Promise<ICreateCaptchaResponse>;
  captchaResultGet: (taskId: string) => Promise<IGetCaptchaResult>;
  captchaSolver: (data: ICreateCaptcha) => Promise<IGetCaptchaResult>;
}

export interface ScrapelessBrowser {
  create: (data: ICreateBrowser) => ICreateBrowserResponse;
}

export interface ScrapelessProxy {
  proxy: (proxy: ICreateProxy) => string;
}

export interface ScrapelessRunner {
  abort: () => Promise<boolean>;
}

export class ScrapelessActor {
  storage: ScrapelessActorStorage;
  captcha: ScrapelessCaptcha;
  browser: ScrapelessBrowser;
  proxy: ScrapelessProxy;
  runner: ScrapelessRunner;
}
