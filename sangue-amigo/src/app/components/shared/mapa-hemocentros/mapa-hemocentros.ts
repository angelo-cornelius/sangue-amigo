import {
  Component,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  input,
  effect,
  viewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import * as L from 'leaflet';

import { Hemocentro } from '../../../models/hemocentro';

@Component({
  selector: 'app-mapa-hemocentros',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div #mapEl class="mapa-leaflet"></div>`,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      min-height: 460px;
    }
    .mapa-leaflet {
      width: 100%;
      height: 100%;
      min-height: 460px;
      border-radius: var(--radius-md, 14px);
      overflow: hidden;
      border: 1px solid var(--border, #eee);
      isolation: isolate;
      z-index: 0;
    }
  `],
})
export class MapaHemocentros implements AfterViewInit, OnDestroy {
  hemocentros = input<Hemocentro[]>([]);
  hemocentroSelecionadoId = input<number | null>(null);

  private mapEl = viewChild.required<ElementRef<HTMLDivElement>>('mapEl');
  private map?: L.Map;
  private marcadores: L.Marker[] = [];
  private jaAjustouView = false;

  constructor() {
    effect(() => {
      const lista = this.hemocentros();
      if (this.map) this.atualizarMarcadores(lista);
    });

    effect(() => {
      const id = this.hemocentroSelecionadoId();
      if (this.map && id !== null) this.focarHemocentro(id);
    });
  }

  ngAfterViewInit(): void {
    const lista = this.hemocentros();
    const centro: L.LatLngExpression =
      lista.length && lista[0].latitude != null && lista[0].longitude != null
        ? [lista[0].latitude, lista[0].longitude]
        : [-24.7246, -53.7412];

    this.map = L.map(this.mapEl().nativeElement, {
      center: centro,
      zoom: 13,
      scrollWheelZoom: true,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
      maxZoom: 19,
    }).addTo(this.map);

    this.atualizarMarcadores(lista);

    setTimeout(() => this.map?.invalidateSize(), 50);
    setTimeout(() => this.map?.invalidateSize(), 300);
  }

  ngOnDestroy(): void {
    this.map?.remove();
    this.map = undefined;
  }

  private atualizarMarcadores(lista: Hemocentro[]): void {
    if (!this.map) return;

    for (const m of this.marcadores) m.remove();
    this.marcadores = [];

    const pontos: L.LatLngExpression[] = [];

    for (const h of lista) {
      if (h.latitude == null || h.longitude == null) continue;
      const icone = this.criarIconePin(h);
      const marcador = L.marker([h.latitude, h.longitude], { icon: icone })
        .addTo(this.map)
        .bindPopup(
          `<strong>${this.escape(h.nome)}</strong><br/>` +
          `<span style="color:#6b6b6b">${this.escape(h.endereco)}</span><br/>` +
          `<span style="color:#6b6b6b">⏰ ${this.escape(h.horario_funcionamento)}</span>`
        );
      this.marcadores.push(marcador);
      pontos.push([h.latitude, h.longitude]);
    }

    if (!this.jaAjustouView && pontos.length > 0) {
      if (pontos.length === 1) {
        this.map.setView(pontos[0], 14);
      } else {
        this.map.fitBounds(L.latLngBounds(pontos), { padding: [40, 40], maxZoom: 14 });
      }
      this.jaAjustouView = true;
    }
  }

  private focarHemocentro(id: number): void {
    if (!this.map) return;
    const h = this.hemocentros().find(x => x.id === id);
    if (!h || h.latitude == null || h.longitude == null) return;
    this.map.setView([h.latitude, h.longitude], 15, { animate: true });
    const marcador = this.marcadores.find(
      m => m.getLatLng().lat === h.latitude && m.getLatLng().lng === h.longitude
    );
    marcador?.openPopup();
  }

  private criarIconePin(h: Hemocentro): L.DivIcon {
    const critico = (h.estoque ?? []).some(e => e.nivel === 'critico');
    const cor = critico ? '#c94545' : '#ef5b5b';
    const html = `
<svg viewBox="0 0 38 48" width="38" height="48" xmlns="http://www.w3.org/2000/svg">
  <path d="M19 0 C 6 0, 0 9, 0 18 C 0 28, 12 38, 19 48 C 26 38, 38 28, 38 18 C 38 9, 32 0, 19 0 Z"
        fill="${cor}" stroke="#ffffff" stroke-width="2"/>
  <circle cx="19" cy="18" r="9" fill="rgba(255,255,255,0.18)"/>
  <path d="M19 11 C 15 16, 13 19, 13 22 a 6 6 0 0 0 12 0 c 0 -3 -2 -6 -6 -11 Z" fill="#ffffff"/>
</svg>`;
    return L.divIcon({
      html,
      className: 'pin-svg-wrapper',
      iconSize: [38, 48],
      iconAnchor: [19, 46],
      popupAnchor: [0, -44],
    });
  }

  private escape(s: string): string {
    return s.replace(/[&<>"']/g, c => (
      { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string
    ));
  }
}
