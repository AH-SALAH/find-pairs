class ArrayHOC extends Array {
    
    constructor () {
        super();
    }

    shuffle (arrParam) {
        let arr = (Array.isArray(arrParam) && arrParam) || this,
            i = arr.length,
            temp = 0,
            random = 0;
        while (--i > 0) {
            random = Math.floor(Math.random() * (i+1)); // random index
            // cache
            temp = arr[random];
            // swap
            arr[random] = arr[i];
            arr[i] = temp;
        }
        return arr;
    }


    static getShuffle () {
        return new ArrayHOC().shuffle; // get it directly from outside
    }

}

export const arrayHOC = new ArrayHOC(); // to access alone without new construct
export const shuffle = new ArrayHOC().shuffle; // to access alone without new construct

export default ArrayHOC;