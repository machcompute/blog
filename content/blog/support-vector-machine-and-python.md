---
categories: []
date: '2022-12-25'
description: Support Vector Machine And Python
draft: false
image: res/images/from-wordpress.webp
tags: []
title: Support Vector Machine And Python
---
Support vector machine is a Supervised Machine Algorithm, since it depends of data provided before hand to infer in new data.

It has a surprisingly simple to understand yet powerful concept, in that it tries to find a dividing line between the classes, based on the provided datapoints.

This also means that for a lot of features, or dimensions, this algorithm also works really nicely because the math works not only in 2 dimensions but also in more that 2 without needing to adapt anything.

Today we are going to see how to use Scikit Learn to implement a simple SVM model and make some predictions.

The dataset we will be using the IRIS Dataset that can be found in kaggle, [here](https://www.kaggle.com/datasets/arshid/iris-flower-dataset "here").

## What we will need

To start on a clean slate let's first download the dataset and install the required packages.

As for the required packages we will need a few, namely *pandas*, *matplotlib* and *scikit-learn*. Pandas will be used to load the dataset, matplotlib to plot the results and scikit-learn to create the model.

## Basic visualization

To visualize the dataset we can use the following code that will assign a color to each species and render out a scatter plot of some of the attributes.

The dataset should be placed on the root of the project on a folder called dataset and named IRIS.csv as can be found below.

    import pandas as pd
    from matplotlib import pyplot as plt

    dataset = pd.read_csv('dataset/IRIS.csv')
    dataset["color"] = dataset["species"].map({"Iris-setosa": "r", "Iris-versicolor": "g", "Iris-virginica": "b"})

    print(dataset.head())

    plt.figure(figsize=(10, 6))
    plt.scatter(dataset['sepal_length'], dataset['sepal_width'], c=dataset['color'])
    plt.xlabel('sepal_length')
    plt.ylabel('sepal_width')
    plt.show()

I encourage you to take a look at the relation of each attribute with each other as I did in my other post [Secure Your Future With Data Science](https://blog.machcomputing.com/secure-your-future-with-data-science/ "Secure Your Future With Data Science").

## svm model using sklearn

Now that we have a solid understanding of the dataset, we can create a model for it using SKlearn.

For that we need to separate our whole dataset into a training portion and another portion for **validation** because we can only say with confidence that our model is good if it performs well in data never seen before.

As for the kernel (aka the way to create the separation) we will be using the standard one that comes with SKLearn.

Now to create we just need the lines below to split the data into testing and training and then create the classifier.

    train, test = train_test_split(dataset, test_size=0.2)

    clf = svm.SVC(kernel='rbf')
    clf.fit(train[['sepal_length', 'sepal_width', 'petal_length', 'petal_width']], train['species'])

Now that we have fitted the classifier on the training data we can start testing it!

## Testing the classifier

To score the classifier, we have access to a method called *score* in the clf object what we can use by passing the parameters, now using the test data.

    print(clf.score(test[['sepal_length', 'sepal_width', 'petal_length', 'petal_width']], test['species']))

And now we have the mean accuracy of the model in the test dataset.

## Final words

This was a shorter post, since I haven't had much time to write and research lately.

Hope you liked it and you can found the project down below in my github account.

<https://github.com/MachComputing/SVM>
