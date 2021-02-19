export const execAfterTime = async (fn = () => { }, time = 1000, cb = () => { }, isMounted = () => { }) => {
    return new Promise((resolve, reject) => {
        clearTimeout(tout);
        let tout = setTimeout(() => {
            if (isMounted()) {
                if (fn instanceof Function && cb instanceof Function) {
                    fn();
                    cb();
                }
                resolve(isMounted());
            }
            else {
                reject(isMounted());
            }
            clearTimeout(tout);
        }, time);
        return tout;
    })
        .then(d => d)
        .catch(err => console.log("isMounted: ", err))
};