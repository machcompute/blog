---
title: "Visualizing Binary Search: An Interactive Guide to Efficient Searching Techniques"
description: "Today we will look at the Binary Search and do a little webapp to visualize it."
date: 2023-05-09

image: ""
draft: false

tags: 
  - "Visualizer"
  - "Algorithms"
categories: 
  - "Coding Challenge"
series:
  - "Coding Challenges"
  - "Visualizer"
---
Understanding algorithms can sometimes be a daunting task, especially when dealing with complex concepts and calculations. However, visualizing these algorithms can make them more accessible and easier to comprehend. In the case of Binary Search, a powerful and efficient searching technique, visualization can be particularly helpful in grasping its inner workings and appreciating its elegance.

In this blog post, we will not only explore the fundamentals of the Binary Search algorithm but also guide you through the creation of an interactive visualizer to bring this algorithm to life. By the end of this post, you'll have a solid understanding of how Binary Search operates, and you'll be able to see it in action through our custom made visualizer. This hands-on approach will not only enhance your learning experience but also provide you with a valuable tool to demonstrate the algorithm's efficiency to others. So, let's dive in and start our journey towards visualizing the magic of Binary Search!

## Understanding binary search
Binary search is a relatively straightforward algorithm, as it is easy to understand and to implement. We will go over the basics and then see some advantages over regular linear search.

### The basics of binary search
Binary search belongs to a class of algorithms named "Divide and Conqueror". These algorithms solve problems by subdividing it into smaller, more manageable problems.
The smaller problems are then solved independently and merged to get the solution.
Binary search does exactly this. To find a value, in a sorted array, it divides the array in half and, depending on the value, searches on the left or right side. As it consequently divides the problem in halves until it either gets a value (or nothing).

### Advantages of Binary Search
This algorithm is quite efficient, since, without extra additional space, it can solve any searching problem in a small interval of time.
Also, this algorithm is not restricted only to numbers, and can be extended to any type that supports comparison.
Binary Search is also deterministic meaning that it produces the same output for a given output, not relying on random choices to produce an output, this makes it a reliable and predictable algorithm that can be used in critical applications.

### Binary Search vs Linear Search
To see how good Binary Search here is a table of features and speed of Linear Search for comparison.
|Algorithm|Linear Search|Binary Search|
|-------|---|--|
|Time Complexity|O(n)|O(log n)|
|Space Complexity|O(1)|O(1)|
|Advantages|Simple to implement, works on unsorted arrays|Efficient for large arrays, works on sorted arrays|
|Disadvantages|Slow for large arrays, inefficient for sorted arrays|Requires a sorted array, more complex to implement|

## Designing the visualizer
Now that we've covered the basics of Binary Search, it's time to dive into the fun part: designing the visualizer! To do that I have prepared a design using figma.
![](/res/images/binsearch-design-1.png)
This is a simple design that has some interesting possibilities to explore. To get started, you simply press the corresponding button to choose whether to work with arrays sorted in ascending or descending order, set the number of pink boxes and set a value to search.
Finally, clicking *compute* creates a series of interactive steps with a description to visualize the algorithm.

## Implementing the Binary Search Algorithm
We will now implement the binary search, first in a conceptual manner then in JavaScript.

### Pseudocode for Binary Search
Before we design the pseudocode, we need to understand the different flows that happen whether we are searching in ascending order or descending.
The algorithm that I will be designing will be a recursive algorithm that, subdividing the array it can find the value, or the closest index.
We will only be considering even amount of elements in ascending order for now, and later we will generalize.
Given this sample array, our task is to find the position of number 6.
![](/res/images/binsearch-fig-1.png)
To do that we can check each element but, since the array is ordered we can do a binary search and find the element much quicker, let's see how!
First we divide the array into two halves, lets call them left and right halves.
Since the array is in ascending order, we can verify that the rightmost element in the left half is less or equal to the leftmost element in the right half.
Given this we can see which half may (or may not) contain our element since if the element is smaller than the rightmost element of the left half it needs to be in the left half and we can apply the same principle to the right half.
Then we just repeat this cycle until we get an array with only one element.
In descending order and even number of elements, we just apply the same thinking with the difference that now the left half contains the elements bigger than the right half.
With odd elements we just compare to the middle one.
One simplification we can do is take the rounded value and use that for our comparisons and that would work for both even and odd elements.
Given this we can write the following pseudocode to find if an element exists or not.
```
function binsearch(int[] values, int value) {
    if (values.length == 1) {
        return values[0] == value;
    }
    if (values.length == 0) {
	    return false;
	}
    
    int mid = values.length // 2;
    if (values[mid] == value) {
	    return true;
	}
    
    if (values[mid] > value && ASCENDING) || (values[mid] < value && DESCENDING) {
        // left half
        int[] leftHalf = values.slice(0, mid);
        return binsearch(leftHalf, value);
    } else {
        // right half
        int[] rightHalf = values.slice(mid, values.length);
        return binsearch(rightHalf, value);
    }
}
```

### Coding the Algorithm in JavaScript
Now that we have the algorithm sketched out we can implement it on a real language and, since this will be a webapp, nothing better than JS.
First we define the function that receives the array, the value and the order that is either *ASCENDING* or *DESCENDING*. Then it is just a matter of translating the code above, resulting in something like this.
```javascript
function binsearch(order, arr, target) {
    if (arr.length === 0) {
        return false;
    }

    if (arr.length === 1) {
        return arr[0] === target;
    }

    let mid = Math.floor(arr.length / 2);
	if (arr[mid] === target) {
        return true;
    }

    if ((order === "ASCENDING" && arr[mid] > target) || (order === "DESCENDING" && arr[mid] < target)) {
        return binsearch(order, arr.slice(0, mid), target);
    } else {
        return binsearch(order, arr.slice(mid), target);
    }
}
```
And to call it, we just need to do this.
```javascript
console.log(binsearch("ASCENDING", [1, 2, 3, 4, 5, 6, 7, 8, 9], 5));
console.log(binsearch("DESCENDING", [9, 8, 7, 6, 5, 4, 3, 2, 1], 5));
```

### Integrating the Algorithm with the Visualizer
Now that we already have the code done for the algorithm itself and the design, now we can join everything together.
To do that, we need to adapt the algorithm so it returns the steps to us and we also need to switch from JS to TS.
Let's start by setting the types of our old function. This is quite simple since we are dealing with numbers and returning a boolean. Here is the function header with the types.
```Typescript
function binsearch(order: "ASCENDING" | "DESCENDING", arr: number[], target: number): boolean
```
We now need to return the "Steps" taken and to do that we need to define *what* we will return. After some deliberation I reached this type signature.
```Typescript
export type BinSearchStep = {
    desc: string;
    title: string;
    index: number;
    slice: {
        start: number;
        end: number;
    }
};
```
In here we have a place for the description, title, an identifier and the slice that is currently under analysis.
Now, instead of returning a boolean, we return a list of steps. I also added some more optional arguments *depth* and *currentIdx* to track our current position and recursive call depth. The final function looks like this:
```Typescript
import { BinSearchStep } from "@/types";

export const binsearch = (order: "ASCENDING" | "DESCENDING", arr: number[], target: number, depth: number = 0, currentIdx: number = 0): BinSearchStep[] => {
    if (arr.length === 0) {
        return [{
            desc: "The array is empty, so the target cannot be found.",
            title: "Array is empty",
            index: depth + 1,
            slice: {
                start: currentIdx,
                end: currentIdx
            }
        }];
    }

    if (arr.length === 1) {
        console.log(arr)
        return [{
            desc: `The array has one element, and the target is ${arr[0] === target ? "found" : "not found"}.`,
            title: "Array has one element",
            index: depth + 1,
            slice: {
                start: currentIdx,
                end: currentIdx + 1
            }
        }];
    }

    let mid = Math.floor(arr.length / 2);
    if (arr[mid] === target) {
        return [{
            desc: `The middle element is ${arr[mid]}, which is equal to the target ${target}, so the target is found.`,
            title: "Middle element is equal to target",
            index: depth + 1,
            slice: {
                start: currentIdx,
                end: currentIdx + arr.length
            }
        }];
    }

    if ((order === "ASCENDING" && arr[mid] > target) || (order === "DESCENDING" && arr[mid] < target)) {
        return [{
            desc: `The middle element is ${arr[mid]}, which is greater than the target ${target}, so the target must be in the first half of the array.`,
            title: "Middle element is greater than target",
            index: depth + 1,
            slice: {
                start: currentIdx,
                end: mid
            }
        }, ...binsearch(order, arr.slice(0, mid), target, depth + 1, currentIdx)];
    } else {
        return [{
            desc: `The middle element is ${arr[mid]}, which is less than the target ${target}, so the target must be in the second half of the array.`,
            title: "Middle element is less than target",
            index: depth + 1,
            slice: {
                start: mid + 1,
                end: currentIdx + arr.length
            }
        }, ...binsearch(order, arr.slice(mid), target, depth + 1, currentIdx + mid)];
    }
}
```

## Real-World Applications of Binary Search
To conclude this post we will look at some applications of the binary search algorithm in the real world. One example is finding a specific value in a sorted list, such as a phone number in a phone book. Binary search can help us locate the value efficiently by repeatedly dividing the list in half until we find the desired value.

## Conclusion and further exploration

### Recap of key concepts
What is important here is the fact that binary search divides to conqueror, meaning that this algorithm divides successfully the list until it finds the value.
It also only works on already sorted lists and, for those kind of lists, is the fastest algorithm available while being extraordinary simple.

### Exploring other search algorithms
There are other search algorithms that work in other datastructures such as trees. But for this visualizer that's all.

### Conclusion
Hope you liked this post in the time that this post comes online, the visualizer should be online on [my domain](https://visualizing.machcomputing.com).
Hope you liked and stay tuned for more posts in this series!
Have a great day and thanks for reading!