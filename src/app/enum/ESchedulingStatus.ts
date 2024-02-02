export enum ESchedulingStatus {
  confirmado = 0,
  concluido = 1,
  cancelado = 2,
}

export const ESchedulingStatusDescriptions: {
  [key in ESchedulingStatus]: { status: number; description: string };
} = {
  [ESchedulingStatus.confirmado]: { status: 0, description: 'Confirmado' },
  [ESchedulingStatus.concluido]: { status: 1, description: 'Concluído' },
  [ESchedulingStatus.cancelado]: { status: 2, description: 'Cancelado' },
};
