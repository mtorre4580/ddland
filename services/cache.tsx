import NodeCache from 'node-cache';

class CacheService {
  private cache: NodeCache;
  private TTL_ONE_DAY_SECONDS = 86400;

  constructor() {
    this.cache = new NodeCache({
      stdTTL: this.TTL_ONE_DAY_SECONDS,
    });
  }

  /**
   * Save the key with the current data recived
   * @param {string} key
   * @param {object} data
   * @return {boolean}
   */
  public set(key: string, data: any): boolean {
    return this.cache.set(key, data);
  }

  /**
   * Remove the current key in the cache
   * @return {number} total
   */
  public delete(key: string): number {
    return this.cache.del(key);
  }

  /**
   * Retrieve the data from the key
   * @return {object|undefined}
   */
  public get(key: string): any {
    return this.cache.get(key);
  }

  /**
   * Retrieve the data from the key and delete the key from cache
   * Equivalent to calling get(key) + del(key)
   * @param {string} key
   * @returns {object}
   */
  public take(key: string): any {
    return this.cache.take(key);
  }

  /**
   * Retrieve the list of the keys store
   * @return {string[]}
   */
  public keys(): string[] {
    return this.cache.keys();
  }

  /**
   * Clean all the keys
   */
  public flush(): void {
    return this.cache.flushAll();
  }
}

export default new CacheService();
