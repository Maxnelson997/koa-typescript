interface IConfig {
    port: number;
}

export const config: IConfig = {
    port: parseInt(process.env.PORT!) || 8080
};