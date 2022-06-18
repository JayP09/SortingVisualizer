import { useState, useEffect} from "react";
import './SortingVisualizer.css';
import { getMergeSortAnimations } from "../sortingAlgorithms/mergeSort.js";
import { getBubbleSortAnimations } from "../sortingAlgorithms/bubbleSort.js";

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 5;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 45;


// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

const FINAL_COLOR = "blue";

function arraysAreEqual(arrayOne, arrayTwo) {
    if(arrayOne.length !== arrayTwo.length) return false;
    for(let i=0; i< arrayOne.length;i++) {
        if(arrayOne[i] !== arrayTwo[i]) {
            return false;
        }
    }
    return true;
}

const randomIntFromInterval = (min,max) => {
    return Math.floor(Math.random()* (max-min+1) + min);
}

const SortingVisualizer = () => {
    const [sortingArray, setSortingArray] = useState([]);
    const resetArray = () => {
        const bars = document.getElementsByClassName('bar');
        for(let i = 0; i< bars.length; i ++) {
            const barOneStyle = bars[i].style;
            barOneStyle.backgroundColor = PRIMARY_COLOR;
        }
        const array = []
        for(let i=0; i< NUMBER_OF_ARRAY_BARS ; i++) {
            array.push(randomIntFromInterval(5,600));
        }
        setSortingArray(array)
    };

    const bubbleSort  = async () => {
        const animations = getBubbleSortAnimations(sortingArray);
        const bars = document.getElementsByClassName('bar');
        for(let i=0; i< animations.length; i++) {
            if(animations[i].length === 3){
                const [barOneIndex, barTwoIndex, color] = animations[i];
                const barOneStyle = bars[barOneIndex].style;
                const barTwoStyle = bars[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else if(animations[i].length === 2) {
                const [barIndex, color] = animations[i];
                const barStyle = bars[barIndex].style;
                setTimeout(() => {
                    barStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIndex, barOneWidth, barTwoIndex, barTwoWidth] = animations[i];
                    const barOneStyle = bars[barOneIndex].style;
                    const barTwoStyle = bars[barTwoIndex].style;
                    barOneStyle.width = `${barTwoWidth}px`;
                    barTwoStyle.width = `${barOneWidth}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    const mergeSort = () => {
        const animations = getMergeSortAnimations(sortingArray);
        for(let i = 0; i< animations.length; i++) {
            const bars = document.getElementsByClassName('bar');
            const isColorChange = i % 3 !== 2;
            if(isColorChange) {
                const [barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = bars[barOneIndex].style;
                const barTwoStyle = bars[barTwoIndex].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i* ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newWidth] = animations[i];
                    const barOneStyle = bars[barOneIdx].style;
                    barOneStyle.width = `${newWidth}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
        const bars = document.getElementsByClassName('bar');
        setTimeout(() => {
            for(let i = 0; i< bars.length; i ++) {
                const barOneStyle = bars[i].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = FINAL_COLOR;
                }, i* ANIMATION_SPEED_MS);
            }
        }, animations.length * ANIMATION_SPEED_MS);
    }

    const quickSort = () => {

    }

    const heapSort = () => {

    }
    
    useEffect(() => {
        resetArray();
    },[]);

    return (
        <div className="mainContainer">
            <div className="arrayContainer">
                {sortingArray.map((value,index) => (
                    <div 
                    key={index} 
                    className="bar"
                    style={{ 
                        width: `${value}px`,
                        backgroundColor: PRIMARY_COLOR,
                    }}
                    >
                    </div>
                ))}
            </div>
            <div className="btnContainer">
                <button className="btn" onClick={resetArray}>Generate New Array</button>
                <button className="btn" onClick={mergeSort}>Merge Sort</button>
                <button className="btn" onClick={quickSort}>Quick Sort</button>
                <button className="btn" onClick={heapSort}>Heap Sort</button>
                <button className="btn" onClick={bubbleSort}>Bubble Sort</button>
            </div>
        </div>
    )
}

export default SortingVisualizer;