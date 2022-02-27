
/**
 * Wait for the given milliseconds
 * @param {number} milliseconds The given time to wait
 * @returns {Promise} A fulfilled promise after the given time has passed
 */
export function waitFor(milliseconds:number):Promise<any> {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

/**
 * Execute a promise and retry with exponential backoff
 * based on the maximum retry attempts it can perform
 * @param {Promise} promise promise to be executed
 * @param {function} onRetry callback executed on every retry
 * @param {number} maxRetries The maximum number of retries to be attempted
 * @returns {Promise} The result of the given promise passed in
 */
export function retry(promise:Promise<any>, onRetry:CallableFunction, maxRetries:number, failSilently:boolean):Promise<any> {
// Notice that we declare an inner function here
// so we can encapsulate the retries and don't expose
// it to the caller. This is also a recursive function
async function retryWithBackoff(retries, promise) {
    try {
    // Make sure we don't wait on the first attempt
    let p = promise;
    let timeToWait = 0;
    if (retries > 0) {
        // Here is where the magic happens.
        // on every retry, we exponentially increase the time to wait.
        // Here is how it looks for a `maxRetries` = 4
        // (2 ** 1) * 100 = 200 ms
        // (2 ** 2) * 100 = 400 ms
        // (2 ** 3) * 100 = 800 ms
        timeToWait = 2 ** retries * 100;
        console.log(`waiting for ${timeToWait}ms...`);
        let temp = await waitFor(timeToWait);
    }
    console.log("awaiting promise")
    console.log(p)
    return await p;
    } catch (e) {
    // only retry if we didn't reach the limit
    // otherwise, let the caller handle the error
    if (retries < maxRetries) {
        onRetry(retries);
        return retryWithBackoff(retries + 1, promise);
    } else {
        console.warn(`Max retries reached. ${failSilently? "Failing silently by request": ""}`)
        if (!failSilently){
            throw e;
        }else{
            return;
        }
    }
    }
}
return retryWithBackoff(0, promise);
}
      
export function backoffRetry(fn, retriesLeft = 5, interval = 1000) {
    return new Promise((resolve, reject) => {
      fn()
        .then(resolve)
        .catch((error) => {
          setTimeout(() => {
            console.log("error caught in retry")
            if (retriesLeft === 1) {
              // reject('maximum retries exceeded');
              reject(error);
              return;
            }
            
            console.log("retries left" + retriesLeft)
            // Passing on "reject" is the important part
            backoffRetry(fn, interval, retriesLeft - 1).then(resolve, reject);
          }, interval);
        });
    });
  }