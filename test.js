const MySchedule = require('./index')

let myScheduleTest=new MySchedule(async ()=>{
    return new Promise(resolve => {
        setTimeout(()=>{
            // console.info("myScheduleTest")
            resolve(1)
        },4000);
    })
},{
    time:500,
    name:"mytester",
    timeout:5000,
    timeoutCallback:()=>{
        console.log("timeout!!")
    },
    log:"info"
});

myScheduleTest.start(0)