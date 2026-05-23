import { Component, ElementRef, signal, computed, viewChild, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Icon } from '../shared/icon/icon';

const MIN_KM = 5;
const MAX_KM = 50;
const SWEEP_DEG = 270;
const START_DEG = -225;
const RAIO = 120;
const CENTRO = 160;

@Component({
  selector: 'app-distancia',
  imports: [RouterLink, Icon],
  templateUrl: './distancia.html',
  styleUrl: './distancia.css',
})
export class Distancia {
  private router = inject(Router);

  svg = viewChild<ElementRef<SVGSVGElement>>('svgRef');

  km = signal(21);
  arrastando = signal(false);

  readonly raio = RAIO;
  readonly centro = CENTRO;
  readonly minKm = MIN_KM;
  readonly maxKm = MAX_KM;

  private circunferencia = 2 * Math.PI * RAIO;
  private comprimentoArco = (SWEEP_DEG / 360) * this.circunferencia;

  arcoBackgroundDash = `${this.comprimentoArco} ${this.circunferencia}`;

  progresso = computed(() => (this.km() - MIN_KM) / (MAX_KM - MIN_KM));

  arcoActiveDash = computed(
    () => `${this.comprimentoArco * this.progresso()} ${this.circunferencia}`
  );

  rotacaoArco = `rotate(${START_DEG} ${CENTRO} ${CENTRO})`;

  posicaoThumb = computed(() => {
    const anguloDeg = START_DEG + SWEEP_DEG * this.progresso();
    const rad = (anguloDeg * Math.PI) / 180;
    return {
      x: CENTRO + RAIO * Math.cos(rad),
      y: CENTRO + RAIO * Math.sin(rad),
    };
  });

  onPointerDown(ev: PointerEvent): void {
    (ev.target as Element).setPointerCapture?.(ev.pointerId);
    this.arrastando.set(true);
    this.atualizarPorPonteiro(ev);
  }

  onPointerMove(ev: PointerEvent): void {
    if (!this.arrastando()) return;
    this.atualizarPorPonteiro(ev);
  }

  onPointerUp(ev: PointerEvent): void {
    this.arrastando.set(false);
    (ev.target as Element).releasePointerCapture?.(ev.pointerId);
  }

  ajustar(delta: number): void {
    this.km.set(Math.max(MIN_KM, Math.min(MAX_KM, this.km() + delta)));
  }

  confirmar(): void {
    this.router.navigate(['/hemocentros'], { queryParams: { distancia: this.km() } });
  }

  private atualizarPorPonteiro(ev: PointerEvent): void {
    const svg = this.svg()?.nativeElement;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = ev.clientX - cx;
    const dy = ev.clientY - cy;
    const deg = (Math.atan2(dy, dx) * 180) / Math.PI;

    let rel = deg - START_DEG;
    rel = ((rel % 360) + 360) % 360;

    let ratio: number;
    if (rel <= SWEEP_DEG) {
      ratio = rel / SWEEP_DEG;
    } else {
      ratio = (rel - SWEEP_DEG) < (360 - SWEEP_DEG) / 2 ? 1 : 0;
    }

    const valor = Math.round(MIN_KM + ratio * (MAX_KM - MIN_KM));
    this.km.set(valor);
  }
}
