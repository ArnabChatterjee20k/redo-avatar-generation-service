const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { HumanMessage } = require("@langchain/core/messages");
const {JsonOutputParser} = require("@langchain/core/output_parsers")
const Replicate = require("replicate");
const downloadImage = require("./downloadImage");
async function getHobbies(file,mime) {
  const MODEL_NAME = "gemini-1.0-pro-vision-latest";
  const API_KEY = "AIzaSyADvNJTyhWsNgUbPACWx3eJ8jX6uWtCn8Y";
  const model = new ChatGoogleGenerativeAI({
    modelName:MODEL_NAME
  })
  const input = [
    new HumanMessage({
      content: [
        {
          type: "text",
          text: `You are a hobbie generator from images. Generate me hobbies from the image in the format {"hobbies":[]}`,
        },
        { type: "image_url", image_url: `data:${mime};base64,${file}`},
      ],
    }),
  ];
  const res = await model.invoke(input)
  const parser = new JsonOutputParser()
  return parser.invoke(res)
}
async function generateBitmoji(hobbies){
  const replicate = new Replicate({auth: process.env.REPLICATE_API_TOKEN});
  const output = await replicate.run(
    "ai-forever/kandinsky-2.2:ea1addaab376f4dc227f5368bbd8eff901820fd1cc14ed8cad63b29249e9d463",
    {
      input: {
        prompt: `Create a Bitmoji representing the following hobbies: ${hobbies}

        Ensure the Bitmoji has a transparent background.
        
        `
      }
    }
  );
  return output[0]
  
}
module.exports = {generateBitmoji,getHobbies}