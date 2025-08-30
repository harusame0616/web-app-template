export type Success<Data = never> = {
  success: true;
  data: Data;
};
export type Failure = { success: false; message: string };
export type Result<Data = Record<string, unknown>> = Success<Data> | Failure;

export function succeed(): Success<never>;
export function succeed<Data extends Record<string, unknown>>(
  data: Data,
): Success<Data>;
export function succeed(data?: Record<string, unknown>) {
  return { success: true, data: data || undefined };
}

export function fail(message?: string): Failure {
  return { success: false, message: message || "" };
}
