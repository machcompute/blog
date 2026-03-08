---
categories: []
date: '2022-10-09'
description: Ultimate guide to Wave Function Collapse
draft: false
image: res/images/from-wordpress.webp
tags: []
title: Ultimate guide to Wave Function Collapse
---
## What is?

Wave function collapse algorithm can take a set of inputs and create similar looking output that follows the same rules as the output. This is an algorithm by *Maxim Gumin* from 2016, so relatively recent.

This is a great algorithm because can do what some very big neural networks can do without the overhead of training and, sometimes, with even greater control over the finer details! This is an algorithm inspired by quantum mechanics in the way it solves the grid of values. Some important but not mandatory things to know ahead are entropy in the context of information theory and what superposition is. If this sound new to you, don't worry, I will cover this in a bit.

## Entropy

With the history out of the way let's talk about entropy, what is and why is it important. Entropy is computed based on the number of states that a superposition cell can be in.

Superposition cell just means that the cell is currently in more than 1 state. State that will be *collapsed* to a single state as the algorithm unfolds.

The formula for entropy is as follows, where w is the weight of a particular state, for example one state can be more predominant than other, thus having a higher weight than the other cell.

Let's understand and break down the formula. So, entropy, *E* is equal to the natural logarithm of the sum of all the weights and we subtract to that the sum of the weights times the natural logarithm of that weight, dividing all by the sum of the weights. I find this formula quite fascinating that it works so well in so many areas like data compression, encoding, quantum mechanics, ... Awesome isn't it?We will now look at an example of a sudoku game and see how the entropy changes.

![](/res/images/sudoku.webp)

Here I calculated the entropy of every single cell with the exception for the middle one where I collapsed the cell into the state *(or value)* 9. The different entropies are marked at blue and green, where blue is the lowest and green the highest entropy. Collapsing a cell just means that we *assign* a state to that cell.

I marked the different entropies with different colors because entropy changes from cell to cell due to each cell having different possibilities, meaning that a cell that has 5 possible states has a higher entropy than a cell that has, let's say 2 states.

## The algorithm

The algorithm resumes itself in 3 simple to follow steps:

1.  Start with the non-collapsed cells that have the least entropy, we then select one from that set, randomly.
2.  We collapse to a random state
3.  Repeat all over again until there is a contradiction or there are no more cells

However there is 2 interpretations of *what is a cell* that form the 2 models, the tile model and the overlapping model. The overlapping model will not be covered in this post.

## Understanding the Tile Model

This is a simplification of the overall algorithm that is in itself quite simple. In this model we introduce the concept of a *tile*.

A tile can be for example, a pixel, an image or a piece of data really. A tile is like a piece of a puzzle that we then join. The puzzle piece is the tile and the joining is done by the Wave Function Collapse Algorithm.

For example, let us create a simple tile set that the main rule is that every line has to connect to another line and each blank side connects to another blank side. Here are the 5 different pieces:

![](/res/images/tiles.webp)

What are the possible combinations of those 5 tiles in a 4 by 4 grid, while not accounting with the rules above? Math says it is exactly 5 to the power of 16 or 152.587.890.625 possible combinations, because for each single spot there are 5 tiles that fit.

But that is not what we want, what we want is apply the Wave Function Collapse algorithm, so let's apply that! We will assume for starters that the top left position is already chosen with the second tile. Having said that, let's draw the grid with the entropy.

![](/res/images/grid.webp)

Here we have the entropy (*E*) and the number of tiles that *can* fit there (*P*). We can see 2 things that are very important here.

First, only the tiles next to the added tile are affected in terms of entropy. That makes sense because the rules we have that restrict the possible tile positions. If you remembered, only tiles that have a blank on it's side can only connect with other tiles that also have a blank and tiles that have a line can also only connect with tiles with a line on the matching side. Having that said, we can only match 2 other tiles to the side below the first tile and 3 to the left, making our entropy be less below the tile than on the it's left.

Second thing is that entropy is lower the fewer possible tiles we have (*do you remember the entropy formula?*) which is intuitive.

Now, doing this all over again and again, finding the possible tiles, calculating the entropy and then collapsing is our algorithm, simple as that!

And this bring us to the end of the post, thanks for reading and a have a great rest of your day!
