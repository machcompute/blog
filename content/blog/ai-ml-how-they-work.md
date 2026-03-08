---
title: "Artificial Intelligence and Machine Learning: How They Work"
date: 2023-02-20
draft: false

description: "A brief introduction to the relation between AI and ML and DL."
tags:
- AI
- ML
- DL

image: res/images/ai-ml-thumbnail.webp

categories:
- Artificial Intelligence
---

## A brief introduction to AI and ML
Artificial Intelligence (AI) and Machine Learning (ML) are two terms that are often used interchangeably even though they mean 2 different things.
AI is a more broad term that refers to the ability of a machine to perform tasks that would normally require human intelligence.
Machine Learning is a subset of AI that refers to the ability of a machine to learn from data and make predictions based on that data. In this article, we will discuss a bit about the basics of AI and ML, and how they work.



## What is an Artificial Intelligence

Artificial Intelligence (or AI) is a subset of computer science and aims to solve problems that, although trivial to humans, prove to be quite hard for machines, such as learning, problem-solving, and decision-making.

Because this is such a broad and complex topic, it is subdivided into 3 approaches:

- Rule-based AI
- Deep Learning
- Machine Learning



### Rule-based AI

This approach requires an expert in the area to create a set of rules and conditions that will shape the behavior of the AI.

This is fine for small projects where specifying and laying out all the possible steps is feasible.

However, in larger and open-ended problems, such as NLP, pattern recognition, and others, this approach quickly scales out of hand and is impractical or straight impossible.



### Deep Learning

Based on the discovery of the neuron (a brain cell), the first mathematical model was created to shape the world and open the road to a bigger revolution.

This model, named Perceptron, was invented around 1958 by Frank Rosenblatt and, while initially thought to possess enough power to solve virtually any problem, further studies suggested the opposite.

This is because a perceptron can only solve linearly separable problems, meaning that problems that don't have a linear and clear separation, simply aren't possible to solve.

Further developments introduced concepts such as backpropagation and multi-layer perceptron networks.

Those later networks are the foundation of modern Deep Learning and, with enough power, can solve many more problems.

Deep Learning deserves a post with the amount of development it has received and context-specific optimizations such as Transformers for NLP.

So look out for a post about Deep Learning soon.



### Machine Learning

This class of algorithms, similar to Deep Learn, also uses data to train and perfect its behavior.

However, unlike Deep Learn, it does not use networks to predict new results, instead, it uses algorithms that can be as simple as Linear Regression to compute parameters and then, using those parameters, make predictions on new data.

Machine learning can also be subdivided into 3 categories based on the availability of the data: supervised, unsupervised, or reinforcement learning.



#### Supervised Machine Learning

Supervised machine learning requires a dataset that is previously labeled/categorized with the goal being to find a relationship between the input and the output based on the labels.

Supervised learning is used both for the classification of a variable and performing regression (predicting a continuous variable).



#### Unsupervised Machine Learning

 Unsupervised learning means that while it also has input data, that data is not labeled, and, as such the problem now lies in finding patterns in the input data.

This is useful in tasks such as clustering (finding clusters of similar data) or anomaly analysis.



#### Reinforcement Learning

Reinforcement Learning bases itself on the fact that humans learn not only with successes but, especially, with failures.

So, instead of trying to adjust parameters and see the result, we incentivize the mutation of those parameters and only then punish the worst performers.

This way the algorithm can quickly converge due to natural evolution (other natural phenomena).

Some, such as the Genetic Algorithm can find the best agents in an environment and preserve their "DNA" and pass it to future generations, quickly finding the most efficient algorithm for a problem.



## Conclusion

In conclusion, we saw an outline of how ML and AI are related and explored some of the many alleys that exist in this area.

Hope you liked and thanks for reading!
