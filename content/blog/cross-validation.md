---
title: Cross Validation - A definitive guide
description: Cross Validation as a way to massively boost your model performance and to validate your model's architecture.
date: 2023-10-07
image: 
draft: false
tags:
  - "#AI"
  - ML
  - "#CrossValidation"
  - DL
categories:
  - Artificial Intelligence
series: []

---

Nowadays, in the boom of AI, the development of new models never was so fast and yet we need to take care of many intricacies that are associated. One of those is the architecture validation.
Architecture validation is simply checking if the model has good _performance_ in a given task.
To do this validation, we use techniques to separate the data used from testing from the data used for training.
The reason is simple: this way reduces the chances of the model learning the pattern that lies on the data instead, it incentivizes the model to generalize and to actually solve the problem.
When such thing happen the model is said to be overfitted.
Today we will look at one technique to prevent the model from overfitting called _Cross-Validation_.

## Introduction to Cross Validation

Cross-Validation, often called Rotation Estimation or Out-of-Sample Testing is used to assess the performance of a model on a generalized scenario.
The goal is, as said above, to check if the model generalizes on the testing data. The _testing data_, also called _validation data_ and _first seen data_ is, as the name implies, data that the model never sees until the validation phase and doesn't know the labels before hand.

A round of cross validation involves several steps, such as partitioning the data into the datasets mentioned above, training a model, usually with no more than a few hundred epochs, on the labeled data and predicting and assessing the performance on unseen data.

## Why do we need it?

Cross validation is fundamental on preventing _overfitting_ a model.
As said above if we validate the model on the data it has already seen it could easily be biased towards some pattern that is present in the input but is not general.
This leads to lack of generalization and, as such, poor performance on _unseen data_ when compared to _seen data_.

Normally the model has a greater accuracy on _seen data_ when compared to _unseen data_. But the effect is amplified when the model overfits.

To prevent this and to validate if the architecture is adequate to solve the problem in hands, several techniques were implemented. One of those is _Cross Validation_ but there is also _Train-Test Split_ which is, more or less, a single iteration of _Cross Validation_.
Today the focus is on the _Cross-Validation_ as it is the basis of _Train-Test Split_

## Types of Cross Validation

There are many types of _Cross-Validation_ algorithms, some more advanced, others easier to calculate.
In a high level there are 2 types, _Exhaustive Cross-Validation_ and _Non-Exhaustive Cross-Validation_.

In a _Exhaustive Cross-Validation_ each and every combination of the input data is tested. While this is great and fine for smaller datasets, it is not viable to do on a large dataset, since the number of combinations would reach astronomical values.

Examples are _Leave-p-out Cross-Validation (LpO CV)_ and _Leave-one-out Cross-Validation (LOO CV)_.
In a _LpO CV_ scenario, slices of size _p_ are taken to test the model and in _LOO CV_ the process is the same as _LpO CV_ with p=1.
These methods create exponentially more samples on which to train and test, rapidly becoming unviable.

In the other hand, in _Non-Exhaustive Cross-Validation_, instead of trying every sample, the score is approximated. Examples of algorithms that try to approximate the exhaustive counter-parts while requiring much less runtime are _k-Fold Cross-Validation_ and _Stratified KFold method_.

In _K-Fold CV_ instead of specifying the number of samples in the test dataset, we instead divide the dataset in _k_ parts, training and testing on each partition. For example, in a _5-Fold CV_, we would get 5 parts and the training process would occur 5 times, since we only use a part for testing.

Another interesting _Cross Validation_ method is the so called _Stratified KFold_. In this method we try to equalize the number of samples of each class so there is no obvious bias towards a class in particular.

## Conclusion

Today we saw a common problem with LLMs in general that allows for model overfittment and create big discrepancies when evaluating.
The solution is validating the model architecture using _Cross Validation_ methods to see if the model is ready before training with full data.