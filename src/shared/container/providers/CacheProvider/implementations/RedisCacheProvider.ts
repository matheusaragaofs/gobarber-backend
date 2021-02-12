import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '@config/cache';
import ICacheProvider from '../models/ICacheProvider';

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: any): Promise<void> {
    console.log(key, value);
    await this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }
    const parsedData = JSON.parse(data) as T;
    return parsedData;
  }

  // public async invalidate(key: string): Promise<void> {}
  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = await this.client.keys(`${prefix}:*`); // meu prefixo, "dois pontos": tudo que vem depois dele
    const pipeline = await this.client.pipeline();
    // executar múltiplas operações ao mesmo tempo, ele é mais performático, não vai bloquear a execução do restante
    keys.forEach(key => pipeline.del(key));
    await pipeline.exec(); // executar essa pipeline, fazer todos os deletes ao memso tempo
  }
}
