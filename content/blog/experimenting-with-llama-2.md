---
title: "Top 5 use cases for llama 2"
description: "Top 5 applications you can do right now using llama 2"

date: 2023-08-16
image: ""
draft: false

tags: []
categories: []
series: []
---
Today, in I will experiment with the most recent model from Meta - LLAMA 2. And why it is a big deal.
For starters it is free for personal and commercial use, meaning that you could develop and sell applications that use this AI model.
But for today we will be looking at some interesting use cases that I found out to be interesting and potentially powerful.

## 1. Asking to answer based on documents that you either have or webpages
There are lots of trending AI packages ready to use on python, but one of the most groundbreaking ones is langchain. This package allows you to quickly use a pretrained model either from huggingface or openAI and using a Vector Database like Weaviate you could index tons of documents and then use it to study and learn new topics!
It really is an incredible use and extremely powerful too.

## 2. Use as a personal assistant
Another use case is creating a virtual, chat-based AI assistant that could assist you in everyday tasks.
One possible solution is ask for _predetermined patterns_ in the response through prompt-engineering and get the model to return a machine readable output, for example.
This use case is based on the awesome work done by the AutoGPT community that developed an application to search and interact with the web using an AI model.

## 3. Summarization of long articles
Other interesting alley could be to summarize long articles into shorter sentences and for that you can either use prompt-engineering and use the chat based model, but one more effective way would be using a dataset that you either find or, better yet, create to then retrain llama 2 with this new dataset.
The result will be a mix of power and general sentence understanding from the underlying model finetuned to your specific use case.

## 4. Sentiment analysis
This one I may do a separate post on it. But the basis is this: You give a sentence and it gives you either the base emotion behind the phrase or simply a positivity-negativity label or score.
What you _could_ do is instead of creating manually a dataset of thousands of phrases so you can retrain the model, is asking the model for examples and then train the model with those examples.
I may do this as a side project and document it in here, but we will see.

## 5. Classification
Other very interesting topic you could do with this new model is classification of texts using either your own dataset or using, again, prompt engineering to convey the model to answer your questions under a specific format, for example, JSON so they can be easily read by code.

## Conclusion
To summarize, here I just pointed some of the options that you could do with this new model that, while not new, are more performant than ever, thanks to this model. I did not wanted to give exact guidelines because I wanted you, the reader, to explore these options and find your own way to do it, even because you way is probably better.