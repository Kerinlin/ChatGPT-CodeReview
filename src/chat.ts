import { ChatGPTAPI } from 'chatgpt';
export class Chat {
  private chatAPI: ChatGPTAPI;

  constructor(apikey: string) {
    this.chatAPI = new ChatGPTAPI({
      apiKey: apikey,
    });
  }

  private generatePrompt = (patch: string) => {
    return `下面是一个代码片段，请帮我做一个简短的代码审查，如果有任何错误风险和改进建议都欢迎，请使用中文回答
    ${patch}
    `;
  };

  public codeReview = async (patch: string) => {
    if (!patch) {
      return '';
    }

    console.time('code-review cost');
    const prompt = this.generatePrompt(patch);

    const res = await this.chatAPI.sendMessage(prompt, {
      promptPrefix: 'hi,',
      promptSuffix: "\nlet's start",
    });

    console.timeEnd('code-review cost');
    return res.text;
  };
}
