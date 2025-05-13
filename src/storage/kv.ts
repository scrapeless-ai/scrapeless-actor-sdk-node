import * as kvApi from "@/http-client/api/kv";
import { getEnv } from "@/env";

import type { IKVStorage, IKVValueData, IPaginationParams } from "@/types";

export class KVStorage implements IKVStorage {
  private namespaceId: string;
  constructor() {
    this.namespaceId = getEnv("EnvKvNamespaceId");
  }

  async listNamespaces(params: IPaginationParams) {
    return await kvApi.listNamespaces(params);
  }

  async createNamespace(name: string) {
    const actorId = getEnv("EnvActorId");
    const runId = getEnv("EnvRunId");
    return await kvApi.createNamespace({
      actorId,
      runId,
      name,
    });
  }

  async getNamespace(namespaceId: string) {
    return await kvApi.getNamespace(namespaceId);
  }

  async delNamespace() {
    return await kvApi.delNamespace(this.namespaceId);
  }

  async renameNamespace(name: string) {
    return await kvApi.renameNamespace(this.namespaceId, name);
  }

  async listKeys(params: Omit<IPaginationParams, "desc">) {
    return await kvApi.listKeys(this.namespaceId, params);
  }

  async delValue(key: string) {
    return await kvApi.delValue(this.namespaceId, key);
  }

  async bulkSetValue(data: IKVValueData[]) {
    return await kvApi.bulkSetValue(this.namespaceId, data);
  }

  async bulkDelValue(keys: string[]) {
    return await kvApi.bulkDelValue(this.namespaceId, keys);
  }

  async setValue(data: IKVValueData) {
    return await this.setValueWithId(this.namespaceId, data);
  }

  async getValue(key: string) {
    return await this.getValueWithId(this.namespaceId, key);
  }

  private async setValueWithId(namespaceId: string, data: IKVValueData) {
    return await kvApi.setValueWithId(namespaceId, data);
  }

  private async getValueWithId(namespaceId: string, key: string) {
    return await kvApi.getValueWithId(namespaceId, key);
  }
}
