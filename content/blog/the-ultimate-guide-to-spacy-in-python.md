---
categories: []
date: '2023-01-05'
description: The Ultimate Guide to Spacy in Python
draft: false
image: res/images/from-wordpress.webp
tags: []
title: The Ultimate Guide to Spacy in Python
---
Python is well-known for being easily extensible and for having awesome libraries. *Spacy* is no exception.

*Spacy* is one if not the most popular natural language processing library for python and it comes full of important and useful features.

This library was developed by a startup called *explosion.ai*. This startup focus on *NLP* and deep learning tools built on top of AI.

It was released in 2015 and quickly raised in popularity due to its simplicity and ease of use, without sacrificing performance.

This library is written on top of Python directly and uses the famous library *Cython* to speed up computations.

Let's now see some important point of *NLP*. If you are not comfortable with this concept, read my previous post where I talk a bit about it and what it is. You can find the link [here](/blog/nlp-a-new-look-into-words "NLP – A new look into words").

## Starting with Spacy

To start with *Spacy* we first need to install it using *pip* or *conda*. If you are using pip, you can just run the following command.

    pip install spacy

Then we need a model since *Spacy* by default does not have any available.

A model is what specifies how *Spacy* interprets the data and therefore it can have a very big impact on performance and on accuracy depending the model size.

I will be using the small English model, but feel free to use a bigger one if you want.

This is the command for downloading the model.

    python -m spacy download en_core_web_sm

You can find all the models on the *Spacy* documentation [here](https://spacy.io/usage/models "Spacy Documentation").

## Transforming Text Data

Now that we have *Spacy* set up, we can start. For starters we will be seeing how do we transform the text into something more manageable.

There are a few methods for that, but the 3 below are the most used and, even though we lose a bit of information, the gains in reduced dimensionality are often worth it.

### Lemmatization

In linguistics we have lemmas and they represent the base form of a word.

For example, the verb *jump* has several *forms*, like *jumping*, *jumps*, etc. But they add very little information to us, while adding many more different words to parse, adding complexity.

If we just transformed the verbs into their lemmas we would save resources and that is exactly what **Lemmatization** is.

**Lemmatization** is a way to get the lemmas of a word, reducing complexity while loosing some data that has little use to us.

To do this in *Spacy* we can load the model, giving back a callable that we can call on the text.

To access the lemma of a token (or word) we use the property **\_lemma** or we can use the property **text** to get the full word.

    import spacy

    model = spacy.load("en_core_web_sm")
    document = model("The cat sat on the mat.")
    for token in document:
        print(token.text, token.lemma_)

### Stop words

Stop words are, in their essence useless words, that is words that do not add nothing.

Examples of stop words are *a*, *and*, etc.

As such, those words can be safely removed without loosing context and/or valuable data points, helping this way to reduce the complexity of the implementation.

To access all the stop words, we can use the model created before, like this.

    import spacy

    model = spacy.load("en_core_web_sm")
    print(model.Defaults.stop_words)

## Important concepts

Now that we have looked at some ways to reduce complexity, we can now focus on *analyzing* the data.

To do that, *Spacy* has some tools like word dependency and POS tags.

### POS Tags

Part-of-speech are tags that identify the role of a word in a sentence according to their part of speech.

For example, nouns can be classified as *Noun* and verbs as *Verb*. This allows us to disambiguate the meaning of the word.

In my previous post I talked how hard can it be to disambiguate a word, but with tools like *POS* it is possible.

These labels are also useful for information extraction and text classification and, basically, every other NLP task.

To ask for the *POS* tags of a sentence we can use the following code.

    import spacy

    nlp = spacy.load("en_core_web_sm")
    doc = nlp("The cat sat on the mat.")

    for token in doc:
        print(token.text, token.pos_)

Here, *token.pos\_* is the *POS* tag or label and we can see for every word on the sentence what label it has assigned.

A comprehensive list with *POS* tags can be found in the documentation [here](https://spacy.io/api/annotation#pos-tagging "POS tags").

### Dependencies

In natural language, words can depend on other words in a sentence in various ways. These dependencies are known as syntactic dependencies, and they reflect the grammatical structure of a sentence.

These dependencies between words are also an incredible tool to analyze sentences and spacy gives us an easy to use *API* for that.

Syntactic dependencies can and are easier to understand in a form of a tree-like structure, called a dependency parse tree.

In this tree, the root element is the governor of all the other words in the sentence and each word in the sentence is a node in the tree.

The edges in the tree represent the dependencies between the words.

*Spacy* already does this for us for each sentence and the dependencies between words are represented using the *dep\_* attribute of each token.

The following code prints the dependencies between each word, and in the output the *ROOT* element stands for the root of the tree.

    import spacy

    nlp = spacy.load("en_core_web_sm")
    doc = nlp("The cat sat on the mat.")

    for token in doc:
        print(token.text, token.dep_)

## Conclusion

As we saw in this post, *Spacy* is a very powerful library since it provides a lot of features to help analyze each sentence.

Hope you liked and don't forget to divulgate if you liked!
