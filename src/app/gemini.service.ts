import { Injectable, InjectionToken, inject } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const GEMINI_API_KEY = new InjectionToken<string>('GEMINI_API_KEY');

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private readonly apiKey = inject(GEMINI_API_KEY, { optional: true });
  private genAI?: GoogleGenerativeAI;

  // English System Instruction for a Coding Assistant profile
  private readonly systemInstruction = `
    You are an expert Senior Front-End Developer specializing in Angular 21.
    - Provide solutions using the latest Angular features: Signals, Resource API, and standalone components.
    - Use SCSS for styling and follow Bootstrap 5 utility patterns.
    - Ensure code is clean, modular, and follows best practices for performance.
    - When asked about "fake-shop" or "logistics-manager", provide architecture advice specific to e-commerce and management systems.
    - Respond in English with clear technical explanations.
  `;

  constructor() {
    if (this.apiKey) {
      this.genAI = new GoogleGenerativeAI(this.apiKey);
    }
  }

  async generateText(prompt: string, modelName: string = 'gemini-1.5-flash'): Promise<string> {
    if (!this.genAI) {
      throw new Error('Gemini API key not provided.');
    }

    const model = this.genAI.getGenerativeModel({
      model: modelName,
      systemInstruction: this.systemInstruction,
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  }

  async *generateTextStream(prompt: string, modelName: string = 'gemini-1.5-flash') {
    if (!this.genAI) {
      throw new Error('Gemini API key not provided.');
    }

    const model = this.genAI.getGenerativeModel({
      model: modelName,
      systemInstruction: this.systemInstruction,
    });

    const result = await model.generateContentStream(prompt);

    for await (const chunk of result.stream) {
      yield chunk.text();
    }
  }
}
