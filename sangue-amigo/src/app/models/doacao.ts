import { TipoSanguineo } from './doador';

export interface Doacao {
  id?: number;
  id_paciente: number;
  tipo_sanguineo: TipoSanguineo;
  ultima_doacao: string;
}
