export type Success<Data = {}> = { success: true; data: Data };
export type Failure = { success: false; message: string };
export type Result<Data = {}> = Success<Data> | Failure;

export function succeed(): Success<{}>;
export function succeed<Data extends Record<string, any>>(
  data: Data,
): Success<Data>;
export function succeed(data?: any) {
  if (data) {
    return { success: true, data: {} };
  }

  return { success: true, data };
}

export function fail(message?: string): Failure {
  return { success: false, message: message || "" };
}
