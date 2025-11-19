export default function useDevEnv() {
    const devEnv = "development";
    const productionEnv = "production";
    const appEnv = import.meta.env.VITE_APP_ENVIRONMENT;
    const currentEnv = appEnv ? appEnv : process.env.NODE_ENV;
    return { currentEnv, devEnv, productionEnv };
}