import { Component, input, ChangeDetectionStrategy } from '@angular/core';

export type IconName =
  | 'drop'
  | 'drop-fill'
  | 'calendar'
  | 'clock'
  | 'map'
  | 'pin'
  | 'trophy'
  | 'check'
  | 'chevron-right'
  | 'chevron-down'
  | 'arrow-left'
  | 'arrow-right'
  | 'bell'
  | 'user'
  | 'logout'
  | 'home'
  | 'history'
  | 'sparkle'
  | 'heart'
  | 'shield'
  | 'plus'
  | 'search';

@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<svg
  [attr.width]="size()" [attr.height]="size()"
  viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="1.6"
  stroke-linecap="round" stroke-linejoin="round"
  aria-hidden="true" focusable="false"
  [attr.data-icon]="name()">
  @switch (name()) {
    @case ('drop') {
      <path d="M12 3c-3.5 4.5-6 7.6-6 11a6 6 0 0 0 12 0c0-3.4-2.5-6.5-6-11Z"/>
    }
    @case ('drop-fill') {
      <path d="M12 3c-3.5 4.5-6 7.6-6 11a6 6 0 0 0 12 0c0-3.4-2.5-6.5-6-11Z" fill="currentColor"/>
    }
    @case ('calendar') {
      <rect x="3.5" y="5" width="17" height="15" rx="2.5"/>
      <path d="M3.5 10h17M8 3.5v3.5M16 3.5v3.5"/>
    }
    @case ('clock') {
      <circle cx="12" cy="12" r="8.5"/>
      <path d="M12 7.5V12l3 2"/>
    }
    @case ('map') {
      <path d="M3 6.5 9 4l6 2.5L21 4v13.5L15 20l-6-2.5L3 20Z"/>
      <path d="M9 4v13.5M15 6.5V20"/>
    }
    @case ('pin') {
      <path d="M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12Z"/>
      <circle cx="12" cy="9" r="2.5"/>
    }
    @case ('trophy') {
      <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z"/>
      <path d="M8 6H5a3 3 0 0 0 3 3M16 6h3a3 3 0 0 1-3 3"/>
      <path d="M10 13h4M9 20h6M11 20v-3h2v3"/>
    }
    @case ('check') {
      <path d="m5 12 4.5 4.5L19 7"/>
    }
    @case ('chevron-right') {
      <path d="m9 6 6 6-6 6"/>
    }
    @case ('chevron-down') {
      <path d="m6 9 6 6 6-6"/>
    }
    @case ('arrow-left') {
      <path d="M19 12H5M11 6l-6 6 6 6"/>
    }
    @case ('arrow-right') {
      <path d="M5 12h14M13 6l6 6-6 6"/>
    }
    @case ('bell') {
      <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z"/>
      <path d="M10 19a2 2 0 0 0 4 0"/>
    }
    @case ('user') {
      <circle cx="12" cy="8" r="3.5"/>
      <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6"/>
    }
    @case ('logout') {
      <path d="M14 4h4a1.5 1.5 0 0 1 1.5 1.5v13A1.5 1.5 0 0 1 18 20h-4"/>
      <path d="M9 8l-4 4 4 4M5 12h11"/>
    }
    @case ('home') {
      <path d="M4 11 12 4l8 7v8a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19Z"/>
      <path d="M9.5 20v-5h5v5"/>
    }
    @case ('history') {
      <path d="M3.5 12a8.5 8.5 0 1 0 2.5-6"/>
      <path d="M3.5 4v4.5H8M12 8v4.5l3 2"/>
    }
    @case ('sparkle') {
      <path d="M12 3v6M12 15v6M3 12h6M15 12h6"/>
      <path d="m6 6 3.5 3.5M14.5 14.5 18 18M6 18l3.5-3.5M14.5 9.5 18 6"/>
    }
    @case ('heart') {
      <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z"/>
    }
    @case ('shield') {
      <path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6Z"/>
      <path d="m9 12 2 2 4-4"/>
    }
    @case ('plus') {
      <path d="M12 5v14M5 12h14"/>
    }
    @case ('search') {
      <circle cx="11" cy="11" r="6.5"/>
      <path d="m20 20-4.5-4.5"/>
    }
  }
</svg>
  `,
  styles: [`
    :host { display: inline-flex; line-height: 0; }
    svg { display: block; }
  `]
})
export class Icon {
  name = input.required<IconName>();
  size = input<number>(20);
}
