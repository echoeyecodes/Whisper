import OpenAi from "openai";
import envConfig from "../env";

const openAi = new OpenAi({
  apiKey: envConfig.get("OPENAI_API_KEY"),
});

export default openAi;
