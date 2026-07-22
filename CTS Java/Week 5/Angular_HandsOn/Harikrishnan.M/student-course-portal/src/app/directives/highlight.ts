import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  // Configurable highlight color passed via input (default is 'yellow')
  @Input() appHighlight: string = 'yellow';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  // @HostListener('mouseenter') binds to host element events without needing manual event listener setup
  @HostListener('mouseenter') onMouseEnter(): void {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', this.appHighlight || 'yellow');
  }

  // Angular automatically handles cleanup of event listeners registered via @HostListener
  @HostListener('mouseleave') onMouseLeave(): void {
    this.renderer.removeStyle(this.el.nativeElement, 'backgroundColor');
  }
}

export { HighlightDirective as Highlight };
