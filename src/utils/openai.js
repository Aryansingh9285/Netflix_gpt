import OpenAI from 'openai';
import { OPEN_AI_API_KEY } from '../../../.env';

const openai = new OpenAI({
  apiKey: OPEN_AI_API_KEY,
  dangerouslyAllowBrowser: true, // This is only for browser usage
});

export default openai;