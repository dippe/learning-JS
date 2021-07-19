/**
* Usage: new Promise((reject, resolve) => { ... code ... }).then(doSy);
*
* Limitations now:
*     - it accepts only 1 parameter
*     - implements the "then" only
**/

function BasicPromise(cb) {
    this.cbs = [];
    this.result = undefined;
    
    const resolve = (data) => {
        this.result = data;                     // store the result for the fns added later
        this.cbs.map( thenCb => thenCb(data))   // call the already existing cbs
    }
    
    const reject = (err) => console.error("not implemented yet");
    
    cb(resolve, reject);
    
    this.then = (cb => {
        if (this.result) {
            cb(this.result);         // handle the already existing results immediately
        } else {
            this.cbs.push(cb);  // if there is no result yet, then store the callback for later call
        }
    });
}

new BasicPromise((resolve) => resolve("something"))
   .then((res) => console.log(res));
