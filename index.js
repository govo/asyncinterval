/**
 * design by govo
 * 间隔执行异步任务，每条任务会等待上一条完成才继续下一条
 */

const INFO = 'info';
const ERROR = 'error';

class MySchedule {
    /**
     * 
     * @param async function job 
     * @param {time,log,timeout,name,timeoutCallback} options 
     */
    constructor(job, options) {
        let {
            time,
            log,
            timeout,
            name,
            timeoutCallback
        } = options;
        this.log = log || INFO;
        this.timeout = timeout || 5000; //超时时间
        this.name = name || null;
        this.time = time || 100;
        this.job = job;
        this._isStop = false;
        this.timeoutCallback = timeoutCallback;
        this._jobInterval = null;
        this._timeoutInterval = null;
        this._timeCounter = 0;
        this._isRunning = false;
    }
    start(delay = 0) {
        if (this._isRunning) {
            clearTimeout(this._jobInterval);
        }
        this._isStop = false;
        if (delay) {
            setTimeout(() => {
                this._action().then(() => { }).catch((e) => { });
            }, delay)
        } else {
            this._action().then(() => { }).catch((e) => { });
        }
        return this;
    }
    async stop(wait) {
        console.log("stop job", this.name, this._isRunning);
        this._isStop = true;
        clearTimeout(this._jobInterval);
        if (wait && this._isRunning) {
            return new Promise((resolve) => {
                let i = setInterval(() => {
                    if (!this._isRunning) {
                        resolve(true);
                        clearInterval(i);
                    }
                }, 10);
            })
        }
        return true;
    }
    async _action() {
        if (this._isStop) return;
        let start = Date.now();
        let timeCounter = ++this._timeCounter;

        if (this.timeout) {
            clearTimeout(this._timeoutInterval);
            this._timeoutInterval = setTimeout(() => {
                if (this.log == ERROR || this.log == INFO) {
                    console.error("auto job timeout " + this.name + ":",
                        Date.now() - start, "ms",
                        "at counter:", timeCounter,
                        ". force start new job now.");
                }
                this._isRunning = false;
                this._action().then(() => { }).catch(() => { });
            }, this.timeout);
        }

        this._isRunning = true;
        try {
            await this.job();
        } catch (e) {
            if (this.log == INFO) console.error("job fail ", this.name, ":", e)
        }
        this._isRunning = false;

        if (this.log == INFO) console.log("auto job " + this.name + ":", Date.now() - start, "ms at counter", timeCounter);

        if (timeCounter != this._timeCounter) return; //exit if timeout called

        clearTimeout(this._timeoutInterval);

        this._jobInterval = setTimeout(() => {
            this._action().then(() => { }).catch(() => { });
        }, this.time)
    }
}
module.exports = MySchedule;