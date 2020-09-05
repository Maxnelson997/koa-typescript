import * as Interfaces from "./types/interfaces";

export const config: Interfaces.IConfig = {
  port: parseInt(process.env.PORT!) || 8080,
  redis: {
    host: process.env.REDIS__HOST || "0.0.0.0",
    port:
      (process.env.REDIS__PORT && parseInt(process.env.REDIS__PORT)) || "6401"
  }
};
