import * as queueApi from "@/http-client/api/queue";
import { getEnv } from "@/env";

import type {
  IQueueStorage,
  IPaginationParams,
  IQueueCreateData,
  IQueueUpdateData,
  IQueuePushParams,
} from "@/types";

export class QueueStorage implements IQueueStorage {
  private queueId: string;
  constructor() {
    this.queueId = getEnv("EnvQueueId");
  }

  async list(params: IPaginationParams) {
    return await queueApi.queueList(params);
  }

  async create(data: IQueueCreateData) {
    const q = await queueApi.createQueue(data);
    return {
      id: q.id,
      name: q.name,
    };
  }

  async get(name: string) {
    return await queueApi.queueGet(this.queueId, name);
  }

  async update(data: IQueueUpdateData) {
    await queueApi.queueUpdate(this.queueId, data);
  }

  async delete() {
    return await queueApi.queueDelete(this.queueId);
  }

  async push(params: IQueuePushParams) {
    const q = await queueApi.createMessage(this.queueId, params);
    return {
      msgId: q.msg_id,
    };
  }

  async pull() {
    return await queueApi.queueGetMessage(this.queueId);
  }

  async ack(msgId: string) {
    return await queueApi.queueAckMessage(this.queueId, msgId);
  }
}
