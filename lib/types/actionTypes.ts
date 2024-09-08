export interface actionResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
