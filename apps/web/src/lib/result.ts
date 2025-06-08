export type Success<Data = undefined> = { success: true; data?: Data };
export type Failure = { success: false; message: string };
export type Result<Data = undefined> = Success<Data> | Failure;

export function succeed<Data>(data?: Data): Success<Data> {
  return { success: true, data };
}

export function fail(message?: string): Failure {
  return { success: false, message: message || "" };
}
