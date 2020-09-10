interface IConfig {
  port: number;
  redis: {
    host: string;
    port: number;
  };
}

interface IStorage {
  get: (list_name: string) => Promise<string[]>;
  add: (list_name: string, item: string) => Promise<boolean>;
  remove: (list_name: string, item: string) => Promise<boolean>;
}

export { IConfig, IStorage };
