---
title: "Visualizer EP1"
description: "Welcome to a new series: In here I will walk through some challenges when building and deploying some applications."

date: 2023-04-30

draft: false
image: ""

tags: 
  - "Visualizer"
categories: 
  - "Coding Challenge"
series:
  - "Coding Challenges"
  - "Visualizer"
---

This will be a mini season of a (hopefully) bigger series where I will build small applications to then deploy.

## What are we gonna build?
We will building a visualizer (hence the name) for some algorithms like Binary Search, and tree operations such as rotations, balancing and so on.
The project will be made entirely in Typescript as it forces me to learn one more language and we will be using NextJS due to its ease of use when it comes to routing.
For styles we will be using a library called Tailwind that autogenerates CSS classes for us to use.

## The design
First we need a design for the website. Using figma, I designed this very simple page:
![](/res/images/visualizer-design-1.png)

This is the design for the home page based on this color pallete taken from [this](coloors.co) website.
We will start by writing the code for this page and then in a future post we will be adding more pages.

## The features
Now that we have an idea, a rough design, now we need to think on the ideas.
I want this to be educational for you and I want it to be about ways of visualizing algorithms.
Given this constraints, these are my ideas.
- Binary Search
- Linear Search
- Sorting algorithms
	- Merge Sort
	- Bubble Sort
	- Quick Sort
- 2D Searching algorithms with varying heuristics
	- A*
	- Breadth first
	- Depth first
- Minmax applied to the tick-tac-toe game

### Laying the foundations
As said before we will be using NextJS with TS. The easier way to bootstrap the project is using the following command.
```bash
npx create-next-app@latest
```

It will then ask several questions to personalize our project. The default answers were fine and we now have a NextJS project started using TS!

### Coding the homepage
NextJS works by rendering the components inside the pages directory, and each path is translated to an URL. Let me explain: if we have a file named *mypage* in *pages/sub* the URL would be *http://localhost:3000/sub/mypage*.
This makes the routing that much easier than using pure react.
So, to create a homepage we would need to create an *index.tsx* inside the pages directory, so it is interpreted as the root page.

### Creating the first component
To test if everything is working we delete the boilerplate code that exists in the index.tsx file and replace it with this.
```tsx
export default function Home() {
  return (
    <main>
        <h1>Next.js + TypeScript</h1>
    </main>
  )
}
```
This syntax is similar to HTML where we have *tags* but they are mixed with Typescript code.
Now if we run the following command and navigate to the URL shown, you should be greeted with a blank page with that h1.
```bash
npm run dev
```
Congratulations! We have successfully setup a NextJS project!

### Conclusion
Now that you have the basis of NextJS I encourage you to check out the tailwind documentation and learn how to stylize and customize your page to your hearts content.
I will now write the homepage accordingly to the design above using tailwind and typescript and in the next post we will start building the pages for each feature.