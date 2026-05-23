import { Component, input, ChangeDetectionStrategy } from '@angular/core';

export type EmptyAnimVariant =
  | 'gota'
  | 'calendario'
  | 'sino'
  | 'busca';

@Component({
  selector: 'app-empty-anim',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="empty-anim-wrap" [attr.data-variant]="variant()">
  @switch (variant()) {
    @case ('gota') {
      <svg viewBox="0 0 160 160" class="anim">
        <defs>
          <radialGradient id="ea-grad-gota" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="var(--red-100)" stop-opacity="0.9"/>
            <stop offset="100%" stop-color="var(--red-100)" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <circle class="halo" cx="80" cy="92" r="48" fill="url(#ea-grad-gota)"/>
        <circle class="ondinha o1" cx="80" cy="92" r="32" fill="none" stroke="var(--primary)" stroke-width="1.2" stroke-opacity="0.55"/>
        <circle class="ondinha o2" cx="80" cy="92" r="32" fill="none" stroke="var(--primary)" stroke-width="1.2" stroke-opacity="0.55"/>
        <g class="gota-anim">
          <path d="M80 50 C 64 78, 56 96, 64 110 C 70 120, 90 120, 96 110 C 104 96, 96 78, 80 50 Z" fill="var(--primary)"/>
          <ellipse cx="73" cy="80" rx="4" ry="6" fill="#fff" opacity="0.45"/>
        </g>
      </svg>
    }
    @case ('calendario') {
      <svg viewBox="0 0 160 160" class="anim">
        <g class="cal">
          <rect x="38" y="42" width="84" height="80" rx="10" fill="var(--surface)" stroke="var(--primary)" stroke-width="2"/>
          <rect x="38" y="42" width="84" height="20" rx="10" fill="var(--primary)"/>
          <line x1="38" y1="62" x2="122" y2="62" stroke="var(--red-200)" stroke-width="1.5"/>
          <circle cx="58" cy="40" r="4" fill="var(--primary)"/>
          <circle cx="102" cy="40" r="4" fill="var(--primary)"/>
          <line x1="58" y1="34" x2="58" y2="48" stroke="var(--primary)" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="102" y1="34" x2="102" y2="48" stroke="var(--primary)" stroke-width="2.5" stroke-linecap="round"/>
        </g>
        <g class="marcacao">
          <rect x="62" y="78" width="12" height="12" rx="2" fill="var(--red-100)"/>
          <rect x="82" y="78" width="12" height="12" rx="2" fill="var(--red-100)"/>
          <rect x="102" y="78" width="12" height="12" rx="2" fill="var(--red-100)"/>
          <rect x="62" y="96" width="12" height="12" rx="2" fill="var(--red-100)"/>
          <rect class="dia-ativo" x="82" y="96" width="12" height="12" rx="2" fill="var(--primary)"/>
          <rect x="102" y="96" width="12" height="12" rx="2" fill="var(--red-100)"/>
        </g>
        <g class="checkmark">
          <circle cx="100" cy="106" r="14" fill="var(--primary)"/>
          <path d="M93 106 l5 5 l9 -9" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
      </svg>
    }
    @case ('sino') {
      <svg viewBox="0 0 160 160" class="anim">
        <g class="sino-anim">
          <path d="M80 38 C 100 38, 110 58, 110 78 V 92 L 118 102 H 42 L 50 92 V 78 C 50 58, 60 38, 80 38 Z"
                fill="var(--surface)" stroke="var(--primary)" stroke-width="2.5" stroke-linejoin="round"/>
          <circle cx="80" cy="38" r="4" fill="var(--primary)"/>
          <path d="M72 108 a 8 6 0 0 0 16 0" fill="var(--primary)"/>
        </g>
        <circle class="zzz z1" cx="116" cy="60" r="3" fill="var(--red-300)"/>
        <circle class="zzz z2" cx="128" cy="46" r="2.5" fill="var(--red-300)"/>
        <circle class="zzz z3" cx="42" cy="58" r="2.5" fill="var(--red-300)"/>
      </svg>
    }
    @case ('busca') {
      <svg viewBox="0 0 160 160" class="anim">
        <g class="lupa">
          <circle cx="72" cy="72" r="28" fill="none" stroke="var(--primary)" stroke-width="3"/>
          <line x1="92" y1="92" x2="112" y2="112" stroke="var(--primary)" stroke-width="4" stroke-linecap="round"/>
        </g>
        <circle class="pontinho p1" cx="64" cy="64" r="2" fill="var(--primary)"/>
        <circle class="pontinho p2" cx="80" cy="68" r="2" fill="var(--primary)"/>
        <circle class="pontinho p3" cx="72" cy="80" r="2" fill="var(--primary)"/>
      </svg>
    }
  }
</div>
  `,
  styles: [`
:host { display: inline-block; }

.empty-anim-wrap {
  width: 160px;
  height: 160px;
  margin: 0 auto;
}

.anim { width: 100%; height: 100%; overflow: visible; }

/* ----- Gota ----- */
.gota-anim {
  transform-origin: 80px 92px;
  transform-box: view-box;
  animation: ea-gota-quica 2.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
@keyframes ea-gota-quica {
  0%, 100% { transform: translateY(0)    scale(1);    }
  40%      { transform: translateY(-12px) scale(1.04); }
  55%      { transform: translateY(0)    scale(0.95) scaleY(0.92); }
  70%      { transform: translateY(0)    scale(1);    }
}

.halo {
  transform-origin: 80px 92px;
  transform-box: view-box;
  animation: ea-halo-pulsa 2.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
@keyframes ea-halo-pulsa {
  0%, 100% { transform: scale(1); opacity: 0.7; }
  50%      { transform: scale(1.15); opacity: 1; }
}

.ondinha {
  transform-origin: 80px 92px;
  transform-box: view-box;
  opacity: 0;
}
.ondinha.o1 { animation: ea-ondinha 2.4s ease-out 0s infinite; }
.ondinha.o2 { animation: ea-ondinha 2.4s ease-out 1.2s infinite; }
@keyframes ea-ondinha {
  0%   { transform: scale(0.6); opacity: 0.55; }
  100% { transform: scale(1.4); opacity: 0;    }
}

/* ----- Calendário ----- */
.cal {
  transform-origin: 80px 82px;
  transform-box: view-box;
  animation: ea-cal-pulsa 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
@keyframes ea-cal-pulsa {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(1.025); }
}

.dia-ativo {
  transform-origin: 88px 102px;
  transform-box: view-box;
  animation: ea-dia 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
@keyframes ea-dia {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(1.15); }
}

.checkmark {
  transform-origin: 100px 106px;
  transform-box: view-box;
  animation: ea-check-pop 2.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
@keyframes ea-check-pop {
  0%, 10%   { transform: scale(0); opacity: 0; }
  25%       { transform: scale(1.2); opacity: 1; }
  35%, 80%  { transform: scale(1); opacity: 1; }
  100%      { transform: scale(0); opacity: 0; }
}

/* ----- Sino ----- */
.sino-anim {
  transform-origin: 80px 42px;
  transform-box: view-box;
  animation: ea-sino-balanca 2.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
@keyframes ea-sino-balanca {
  0%, 100% { transform: rotate(0); }
  15%      { transform: rotate(8deg); }
  30%      { transform: rotate(-6deg); }
  45%      { transform: rotate(4deg); }
  60%      { transform: rotate(-2deg); }
  75%      { transform: rotate(0); }
}

.zzz { opacity: 0; }
.zzz.z1 { animation: ea-flutua 3s ease-in-out 0s infinite; }
.zzz.z2 { animation: ea-flutua 3s ease-in-out 0.8s infinite; }
.zzz.z3 { animation: ea-flutua 3s ease-in-out 1.6s infinite; }
@keyframes ea-flutua {
  0%   { transform: translateY(0);   opacity: 0; }
  25%  { transform: translateY(-6px); opacity: 0.8; }
  100% { transform: translateY(-18px); opacity: 0; }
}

/* ----- Busca ----- */
.lupa {
  transform-origin: 72px 72px;
  transform-box: view-box;
  animation: ea-lupa 4s ease-in-out infinite;
}
@keyframes ea-lupa {
  0%, 100% { transform: rotate(0) translate(0,0); }
  25%      { transform: rotate(-8deg) translate(-6px, -2px); }
  50%      { transform: rotate(0) translate(0, 4px); }
  75%      { transform: rotate(6deg) translate(4px, 0); }
}

.pontinho { opacity: 0; }
.pontinho.p1 { animation: ea-pontinho 3s ease-in-out 0s infinite; }
.pontinho.p2 { animation: ea-pontinho 3s ease-in-out 1s infinite; }
.pontinho.p3 { animation: ea-pontinho 3s ease-in-out 2s infinite; }
@keyframes ea-pontinho {
  0%, 100% { opacity: 0; transform: scale(0.5); }
  50%      { opacity: 1; transform: scale(1); }
}

@media (prefers-reduced-motion: reduce) {
  .gota-anim, .halo, .ondinha, .cal, .dia-ativo, .checkmark,
  .sino-anim, .zzz, .lupa, .pontinho {
    animation: none !important;
  }
}
  `]
})
export class EmptyAnim {
  variant = input.required<EmptyAnimVariant>();
}
