export function fakePromise(
  delay: number,
  shouldReject: boolean,
): Promise<any> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldReject) {
        reject(new Error('Promise rejected'));
      } else {
        resolve('Promise resolved');
      }
    }, delay);
  });
}
