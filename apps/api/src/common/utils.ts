import {time} from "cron";

export function withCancel<T>(
  asyncIterator: AsyncIterator<T | undefined>,
  onCancel: () => void,
): AsyncIterator<T | undefined> {
  if (!asyncIterator.return) {
    asyncIterator.return = () => Promise.resolve({ value: undefined, done: true });
  }
  const savedReturn = asyncIterator.return.bind(asyncIterator);
  asyncIterator.return = () => {
    onCancel();
    return savedReturn();
  };
  return asyncIterator;
}

export async function callUntilDone(fn:() => Promise<unknown>, timeout: number, tries: number) {
  if (!tries)
    return;
  const delay = () => new Promise<void>((res) => setTimeout(() => res(), timeout));
  try {
    return await fn();
  } catch (e) {
    await delay();
    return callUntilDone(fn, timeout, tries-1);
  }
}
