const Asyncinterval = require('./index')

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
            console.info("Asyncinterval job run finished")
            resolve(1)
        },6000);
    })
}

let myInterval=new Asyncinterval(job,options);

myInterval.start(100);

// setTimeout(async ()=>{
//     console.log(await myInterval.stop(true));
// },2000);