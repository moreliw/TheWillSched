export interface BaseModel<T> {
  itens: T[];
  totalItens: number;
  tamanhoPagina: number;
  totalPaginas: number;
  paginaAtual: number;
  data?: T;

  messages?: string[];
  statusCode?: number;
  success?: boolean;

  message?: string;
  value?: T;
  errors?: string[];
  hasError?: boolean;
}
