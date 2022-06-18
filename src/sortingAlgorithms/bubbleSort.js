export function getBubbleSortAnimations(arr) {
    var swapped = false;
    const animations = [];

    for (let i = 0; i< arr.length - 1; i++) {
        // for each step. max item will come at the last respective index
        for(let j = 0; j < arr.length - i - 1; j++) {
            // These are the values that we're comparing; we push them once
            // to change their color.
            animations.push([j, j+1,'blue']);

            // swap if the item smaller than the previous item
            if(arr[j] > arr[j+1]){
                animations.push([j,arr[j], j+1,arr[j+1]]);
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
                swapped = true;
            }
            animations.push([j, j+1,'turquoise']);
        }
        // // if you did not swap for a particular value of I, it means the array is sorted hence stop the step
        // if(!swapped) {
        //     break;
        // }
        animations.push([arr.length - 1- i,'green']);
    }
    animations.push([0,'green']);

    return animations;
}
