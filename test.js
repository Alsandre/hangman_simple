function sequenceCounter(arr) {
    return arr.reduce((acc, val, ind, arr) => {
        if(ind === 0){
            acc.seqCounter = 1;
            return acc;
        }
        if(val === arr[ind-1]){
            acc.seqCounter++
            return acc;
        }else if(acc.seqCounter > 3){
            acc.counter++;
            acc.seqCounter = 1;
            return acc;
        }else{
            acc.seqCounter = 0;
            return acc
        }
    }, {counter: 0, seqCounter: 0})
}

let a = [0, 0, 0, 0, 1, 0, 0, 0, 0];

console.log(sequenceCounter(a));