import dotenv from "dotenv";
dotenv.config();

type ResourceManagerParams = {
  resources: Promise<any>[];
  onReady?: () => void;
  onShutdown?: () => void;
};

const start = async (params: ResourceManagerParams) => {
  await Promise.all(params.resources).catch(console.error);

  params.onReady?.();
  process.on("SIGINT", () => {
    params.onShutdown?.();
  });
};

const resourceManager = {
  start,
};

export default resourceManager;
