---
categories: []
date: '2022-11-01'
description: How an AI Stores Knowledge
draft: false
image: res/images/from-wordpress.webp
tags: []
title: How an AI Stores Knowledge
---
This will be a multipart series that I am doing that will explore ways to store a knowledge that a computer can get from outside sources such as audio files or written text.

The objective will be to build something that we can interact via text and then see the network created by our input. And in a latter stage, query the network for answers.

This is quite a broad topic since the AI market is booming right now. But to improve in this field we need a way for the computer to represent what they know and a way to retrieve that information.

Therefore, we have the Semantic Networks and the Bayes Networks that allow us, not only deduce but also infer new information.

And why is that important, you may ask. Well, almost all of your knowledge is based on inference and if that is not important see the image below.

![](/res/images/SimpleSN-1024x154.webp)

In this image we have a *person* that is a *human* and a human that is a mammal.

By deduction we know that *Person* is a *Human* and a *Human* is a *Mammal*, but nothing more.

Now, we can also infer by saSemanticying that if a *Human* is a *Mammal*, then *Person* is also a *Mammal*.

And this is why this way of representing knowledge is so important, because it allows to create *new* connections.

Today I will look into how an AI can store and even infer knowledge based on previous experiences. That way we get a model that is able to learn by *previous experiences.*

But first let's skim over the requirements that you need to know.

You need to know basic probability and Graph Theory since the models are heavily based on Graphs and later probabilities will be required to augment our Graph.

## Semantic Networks

Semantic Networks is a map in a graph form that represents the relations between concepts that can be anything.

For example, in the field of NLP (*Natural Language Processing*) we use networks to extract and parse semantically a sentence, mapping the relations between the words in a phrase in a nice visual way.

And this is just the tip of the iceberg, because there are many kind of Networks to map knowledge and in this mini series I do plan to explore new ways.

This network is no more than a graphical notation of nodes and labeled edges forming a Directed Graph.

Another fundamental concept is inheritance between objects and members of some class.

Meaning that a node inherits the properties of the previous node by default but this inheritance can be *canceled* by simply modifying an inherited property.

Let's see an example of a Semantic Network.

![](/res/images/ExampleSN.webp)

As you can see in this network we have some relations and some types of relations.

For example *Mary* is a specialization of the class *Female People* and as such we say that *Mary* is a member of *Female People*.

Looking now to the relation between 2 classes as we have between *Female People* and *People* we can see that the class *Female People* is a specialization of the class *Person*.

However, since we are talking about classes this is not a *member of* relation (unlike the previous example) and instead is we say that it is a *subtype relation*.

Finally we can have *Associations* that define how 2 objects are relate to each other in a more generic way.

Next we will talk about when and what attributes a object gets from it's parent, also know as *inheritance*.

## inheritance

Each node in our network *can* have more attributes than what it refers to, for example, if it's a animal it is alive, then the *is alive* is an attribute of that node.

But now comes the question, *when* a relation inherits the parent attributes?

A node inherits the parent attributes only when the relation is a *subtype* or *member* and it inherits *all* the attributes of the parent.

Let's see why only this 2 relations allow inheritance and what kind of inheritance.

-   ***Subtype* relation**

This kind of relationship allows a subclass to inherit all the attributes from the more abstract classes.

-   ***Member of* relation**

Similarly, in a *member of* reDlation the attributes are inherited from the class immediately above.

-   ***Association*** **relation**

This relation is the only one that does not provide inheritance. Since the association is neither predefined or well-known, we cannot decide if the inheritance can be applied.

Also, the only cases where it makes sense to inherit is when we can say that one of the entities in the relation has the same properties that the other has.

## Conclusion

Hopefully, as you can see, semantic networks are the future and as such is very important to know them.

And for now, that is all I wanted to teach today, next time we will implement a *Semantic Network* from scratch in python.

Have a great rest of your day and happy coding!
