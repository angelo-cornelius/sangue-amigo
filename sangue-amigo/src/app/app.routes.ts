import { Routes } from '@angular/router';

import { Landing } from './components/landing/landing';
import { Login } from './components/login/login';
import { CadastroDoador } from './components/cadastro-doador/cadastro-doador';
import { Home } from './components/home/home';
import { Distancia } from './components/distancia/distancia';
import { Hemocentros } from './components/hemocentros/hemocentros';
import { HemocentroDetalhe } from './components/hemocentro-detalhe/hemocentro-detalhe';
import { Agendar } from './components/agendar/agendar';
import { Agendamentos } from './components/agendamentos/agendamentos';
import { Notificacoes } from './components/notificacoes/notificacoes';
import { HistoricoDoacoes } from './components/historico-doacoes/historico-doacoes';
import { Perfil } from './components/perfil/perfil';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'login', component: Login },
  { path: 'cadastro', component: CadastroDoador },
  { path: 'home', component: Home },
  { path: 'distancia', component: Distancia },
  { path: 'hemocentros', component: Hemocentros },
  { path: 'hemocentros/:id', component: HemocentroDetalhe },
  { path: 'agendar', component: Agendar },
  { path: 'agendamentos', component: Agendamentos },
  { path: 'notificacoes', component: Notificacoes },
  { path: 'doacoes', component: HistoricoDoacoes },
  { path: 'perfil', component: Perfil },
  { path: '**', redirectTo: '' }
];
