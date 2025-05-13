import * as datasetApi from "@/http-client/api/dataset";
import { getEnv } from "@/env";

import type {
  IDatasetStorage,
  IDatasetListParams,
  IPaginationParams,
} from "@/types";

export class DatasetStorage implements IDatasetStorage {
  private datasetId: string;
  constructor() {
    this.datasetId = getEnv("EnvDatasetId");
  }

  async listDatasets(params: IDatasetListParams) {
    return await datasetApi.listDatasets(params);
  }

  async createDataset(name: string) {
    return await datasetApi.createDataset({
      name,
      actorId: getEnv("EnvActorId"),
      runId: getEnv("EnvRunId"),
    });
  }

  async updateDataset(name: string) {
    return await datasetApi.updateDataset(this.datasetId, name);
  }

  async delDataset() {
    return await datasetApi.delDataset(this.datasetId);
  }

  async addItems<T extends object>(items: Array<T>) {
    const datasetId = getEnv("EnvDatasetId");
    return await this.addItemsWithId(datasetId, items);
  }

  async getItems<T>(params: IPaginationParams) {
    const datasetId = getEnv("EnvDatasetId");
    return await this.getItemsWithId<T>(datasetId, params);
  }

  private async addItemsWithId<T extends object>(
    datasetId: string,
    items: Array<T>
  ) {
    return await datasetApi.addItemsWithId(datasetId, items);
  }

  private async getItemsWithId<T>(
    datasetId: string,
    params: IPaginationParams
  ) {
    return await datasetApi.getItemsWithId<T>(datasetId, params);
  }
}
