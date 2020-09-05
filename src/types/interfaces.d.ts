interface IConfig {
  port: number;
  redis: {
    host: string;
    port: number;
  };
}

interface IStorage {
  get: (list_name: string) => string[];
  add: (list_name: string, item: string) => boolean;
  remove: (list_name: string, item: string) => boolean;
}

export { IConfig, IStorage };
