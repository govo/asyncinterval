# asyncinterval

### How to use:
```js
const Asyncinterval = require('asyncinterval')

//create an asyncintervalObject object
let interval = new Asyncinterval(async func,options);
//start the interval
interval.start(delay=0);
//stop the interval;
await interval.stop(wait=false);

```
### Params:
- func: a function with Promise return;
- options:
	- time: interval time;
	- name: name of the job;
	- timeout: timeout of each job;
	- timeoutCallback: callback if the job has been timeout;
	- log: log level,can be "info":every job info, "error": if error occurred.

- delay: delay milliseconds to start the job
- wait: if true, will wait till job finished of timeout.

### Example:
```js
const Asyncinterval = require('asyncinterval')

let options = {
    time:500,
    name:"mytester",
    timeout:5000,
    timeoutCallback:()=>{
        console.log("timeout!!");
        //to something
    },
    log:"info"
}

let job = ()=>{
    return new Promise(resolve => {
        //job example
        setTimeout(()=>{
            console.info("myScheduleTest")
            resolve(1)
        },4000);
    })
}

let myInterval=new Asyncinterval(job,options);

myInterval.start(100);

```