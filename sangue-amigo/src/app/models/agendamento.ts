export type StatusAgendamento =
  | 'pendente'
  | 'confirmado'
  | 'concluido'
  | 'cancelado';

export interface Agendamento {
  id?: number;
  id_paciente: number;
  nome_hospital: string;
  data_hora?: string;
  status?: StatusAgendamento;
}
