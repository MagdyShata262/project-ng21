import { Component, signal, inject, resource } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GeminiService } from './gemini.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly geminiService = inject(GeminiService);

  protected readonly title = signal('project-ng21');
  protected readonly userPrompt = signal('');
  protected readonly activePrompt = signal('');

  protected readonly geminiResource = resource({
    params: () => ({ prompt: this.activePrompt() }),
    loader: async ({ params }) => {
      if (!params.prompt) return '';
      return await this.geminiService.generateText(params.prompt);
    }
  });

  protected sendPrompt() {
    this.activePrompt.set(this.userPrompt());
  }
}
