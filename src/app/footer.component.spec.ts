import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FooterComponent } from './footer.component';
import { GeminiService } from './gemini.service';

class MockGeminiService {
  generateText = vi.fn(async () => 'AI-powered status delivered.');
}

describe('FooterComponent', () => {
  let mockGeminiService: MockGeminiService;

  beforeEach(async () => {
    mockGeminiService = new MockGeminiService();

    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [{ provide: GeminiService, useValue: mockGeminiService }],
    }).compileComponents();
  });

  it('should create the footer', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display the current year', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain(new Date().getFullYear().toString());
  });
});
