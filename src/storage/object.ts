import fs from "node:fs";
import path from "node:path";
import { FormData } from "formdata-node";
import * as objectApi from "@/http-client/api/object";
import { getEnv } from "@/env";

import type {
  IObjectStorage,
  IObjectBucketUploadData,
  IObjectCreateData,
  IObjectListParams,
  IObjectPaginationParams,
} from "@/types";

export class ObjectStorage implements IObjectStorage {
  private bucketId: string;
  constructor() {
    this.bucketId = getEnv("EnvBucketId");
  }

  async listBuckets(params: IObjectListParams) {
    return await objectApi.objectListBuckets(params);
  }

  async createBucket(data: IObjectCreateData) {
    return await objectApi.objectCreateBucket(data);
  }

  async deleteBucket() {
    return await objectApi.objectDeleteBucket(this.bucketId);
  }

  async getBucket() {
    return await objectApi.objectGetBucket(this.bucketId);
  }

  async list(params: IObjectPaginationParams) {
    return await objectApi.objectList(this.bucketId, params);
  }

  async get(objectId: string) {
    const bucketId = getEnv("EnvBucketId");
    return await this.getWithId(bucketId, objectId);
  }

  async put(data: IObjectBucketUploadData) {
    const bucketId = getEnv("EnvBucketId");
    return await this.putWithId(bucketId, data);
  }

  async delete(objectId: string) {
    return await objectApi.objectDelete(this.bucketId, objectId);
  }

  private async getWithId(bucketId: string, objectId: string) {
    return await objectApi.objectGetWithId(bucketId, objectId);
  }

  private async putWithId(bucketId: string, data: IObjectBucketUploadData) {
    const formData = new FormData();

    try {
      const fileStream = fs.createReadStream(data.file);
      const fileName = path.basename(data.file);
      formData.append("file", fileStream, fileName);
    } catch (error) {
      throw new Error(`Error reading file: ${error}`);
    }

    return await objectApi.objectPutWithId(bucketId, formData);
  }
}
