---
categories: []
date: '2023-02-10'
description: Solving Search Problems using Depth First
draft: false
image: res/images/from-wordpress.webp
tags: []
title: Solving Search Problems using Depth First
---
Generally, a search algorithm takes a problem as input and outputs a path or set of actions to reach a certain objective.

These search problems have some parameters, mainly the **start** node and the **end** node.

In a previous post, we talked about an algorithm to solve this kind of problem.

The approach there was to solve a problem using A\*, now we will be looking to Depth First as another way to solve problems. That post can be visited [here](/blog/a-deep-dive-into-the-a-search-algorithm "A deep dive into the A* Search Algorithm").

## Search space vs Search Tree

There is an important distinction to be done between what is a search space and what is a search tree.

A search space is the collection of every state and transition in the system or world. This can be an absurdly big number or even infinite.

On the other hand, a search tree is the states visited by the search algorithm, generally with each step being closer and closer to the objective.

## Uninformed Search Strategies

A search algorithm is uninformed if there is no indication of how close it is to the target.

An informed search algorithm, like A\*, does have a heuristic and measures how far is it from the target.

Depth First, on the other hand, it drills down the tree, trying to traverse as deep as it possibly can, without looking at the distance that has traveled or the distance to the target.

## Depth First

As the name implies, Depth First attempts to go as further down as possible.

This can be easily noted by looking at the steps taken by Depth First, as I demonstrate below.

![](/res/images/DepthFirstSearch.webp)

The red nodes are terminal nodes, meaning that they have no children.

Take note of the order of nodes discovered, first A, then B, and finally C.

If you notice, the node expanded was the node further down and that is the reason for this algorithm being more representable on a tree structure than a graph.

And also note that when we found the target, we stop the algorithm and return the path, in this case, ROOT -\> C -\> END.

## Conclusion

Thanks for reading, this was a quick refresher on how the Depth First algorithm works and how we can represent it.

It is easier to code by storing a list of the deepest nodes and expanding that node.

Hope you like it and have a great rest of your day.
