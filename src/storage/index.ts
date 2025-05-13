import { DatasetStorage } from "./dataset";
import { KVStorage } from "./kv";
import { ObjectStorage } from "./object";
import { QueueStorage } from "./queues";

import type { ScrapelessActorStorage } from "@/types";

export class Storage implements ScrapelessActorStorage {
  dataset = new DatasetStorage();
  kv = new KVStorage();
  object = new ObjectStorage();
  queue = new QueueStorage();

  //   datasetListDatasets: this.dataset.datasetListDatasets,
  //   datasetCreateDataset: this.dataset.datasetCreateDataset,
  //   datasetUpdateDataset: this.dataset.datasetUpdateDataset,
  //   datasetDelDataset: this.dataset.datasetDelDataset,
  //   datasetAddItemsWithId: this.dataset.datasetAddItemsWithId,
  //   datasetGetItemsWithId: this.dataset.datasetGetItemsWithId,
  //   datasetAddItems: this.dataset.datasetAddItems,
  //   datasetGetItems: this.dataset.datasetGetItems,
  // kvListNamespaces = this.kv.kvListNamespaces;
  // kvCreateNamespace = this.kv.kvCreateNamespace;
  // kvGetNamespace = this.kv.kvGetNamespace;
  // kvDelNamespace = this.kv.kvDelNamespace;
  // kvRenameNamespace = this.kv.kvRenameNamespace;
  // kvListKeys = this.kv.kvListKeys;
  // kvSetValueWithId = this.kv.kvSetValueWithId;
  // kvDelValue = this.kv.kvDelValue;
  // kvGetValueWithId = this.kv.kvGetValueWithId;
  // kvBulkSetValue = this.kv.kvBulkSetValue;
  // kvBulkDelValue = this.kv.kvBulkDelValue;
  // kvSetValue = this.kv.kvSetValue;
  // kvGetValue = this.kv.kvGetValue;
  // objectListBuckets = this.object.objectListBuckets;
  // objectCreateBucket = this.object.objectCreateBucket;
  // objectDeleteBucket = this.object.objectDeleteBucket;
  // objectGetBucket = this.object.objectGetBucket;
  // objectList = this.object.objectList;
  // objectGetWithId = this.object.objectGetWithId;
  // objectGet = this.object.objectGet;
  // objectPutWithId = this.object.objectPutWithId;
  // objectPut = this.object.objectPut;
  // objectDelete = this.object.objectDelete;
  // queueList = this.queue.queueList;
  // createQueue = this.queue.createQueue;
  // queueGet = this.queue.queueGet;
  // queueUpdate = this.queue.queueUpdate;
  // queueDelete = this.queue.queueDelete;
}
