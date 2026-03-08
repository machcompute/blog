---
categories: []
date: '2022-10-15'
description: A deep dive into the A* Search Algorithm
draft: false
image: res/images/from-wordpress.webp
tags: []
title: A deep dive into the A* Search Algorithm
---
Recently I needed to use a algorithm to search a 2-dimensional board of a game to find the best solution. The algorithm I used is A\*, let's see why I chose that and some properties of this that helped me make this important decision.

The A\* (pronounced *A star*) algorithm is an efficient algorithm to find the minimum path cost between 2 points, or more generally between 2 nodes in a graph. But let's go slowly.

## what is a graph?

A graph is basically a set of states, called nodes, that are interconnected through weights or costs.

A state can simply be a representation of the game *current* positions, for example. Or even the moves done so far. In the game I have researched, each state has a bunch of things, but the most important is the current state of the game, where are the things in the game.

Typically, when drawing a graph we represent each node by a circle and we connect them with lines and a number that represents the cost of going from one node to another.

## but how does it works?

This algorithm can be called an *informed search algorithm* or a *best-first search*.

This means that this algorithms makes an informed choice about what route to go, and that is why I chose this algorithm. Because it can find the best path discarding the majority of dead-ends and paths that are not useful, making it very efficient and quick in calculating that path.

At each iteration it calculates the so-called *f* value, that is a prediction of how much it would cost to reach the goal and is simply calculated by summing the cost of the already found path and the *heuristic value* that can be thought as the *predicted* cost of the remaining path.

A typical implementation normally uses a *heap* or a priority queue to speed up the search of the node with lowest *f value*, that is, with the lowest *total cost* to the *end node*. At each step uses that *heap* or *priority list*, names *open set* to pop the element that should be the closest to the solution and expands it into all the neighbor nodes. Then we update the neighbor's *f value* and total cost of the path so far (*g value)* if we have a shorter path, if not we discard this neighbor.

A classic implementation requires some functions to be defined notably (a pseudocode can be found in the wikipedia article **[here](https://en.wikipedia.org/wiki/A*_search_algorithm "wikipedia")**):

-   goal
-   reconstruct path
-   heuristic

## *Goal*

This function simply checks if the current state is a state of winning. Just that, it just checks if we win or not in that state.

## *reconstruct path*

This function walks backwards inside the a dictionary that tell us from where we came in the sense that, given a final state it goes back and get all the previous paths until it reaches the initial state, a state that has no previous state inside that dictionary.

## *heuristic*

This function estimates the remaining path and returns it, but it is a little bit more complicated than that, let me exemplify with an example.

For example, if we are trying to run an A\* algorithm in a generic map, we may consider the heuristic as the distance in a straight line between the current node and the final node, also known as the Euclidean Distance.

However, since we may have hundreds of thousands of possible states to search in a finite time, we may want to optimize the heuristic function since it runs every single iteration of the A\* algorithm and if we have a very expensive function it may not work. That is why we have another function called *Manhattan Distance* that gives the distance between 2 nodes in a grid map, with the differential of given an *approximation* of the *Euclidean Distance* while being significantly cheaper because it does not have a square root in the calculations.

Let's see how we can optimize it and choose a good heuristic for the problem.

### Consistent heuristics

A consistent heuristic has some restrictions. It can only be considered *consistent* if it respects the following rule: the heuristic of *x* is lower or equal to the distance between *x* and a midpoint *y* plus the heuristic of that midpoint *y*.

Meaning that a consistent heuristic does not overestimate the cost.

### How to choose a good heuristic?

A good heuristic to solve a particular problem requires a bit of knowledge about the problem itself and about the way we approach. For example, in the Rush Hour game, we can solve it in several ways, but all heuristics have some features that are a must to find the path quickly.

Among those we have the requirement for the heuristic to be consistent and while this may be easily overlooked, it changes the algorithm itself in a way nothing can. Example: If the heuristic overestimates it may not return the minimum path and therefore be more inefficient.

The heuristic should also be fast to compute, and I mean *really fast*, because, even in simpler problems it can run thousands of times.

## Final words

And that was it, a deep dive into the world of path finding. Hope you all liked it and stay tuned for more!
