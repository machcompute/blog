---
categories: []
date: '2024-01-24'
description: 'Making out own Google at home using distributed systems (part 1)'
draft: false
tags:
  - Roogle
title: 'Making Roogle, a distributed search engine in Rust - part 1'
---

Today we are going to start making a distributed search engine using Rust. I chose Rust since it is *blazingly fast*. (just kidding, I wanna learn a new language).

In this first post, we will start with the indexer and, for that, we will use the Wikipedia pages as a dataset. You can download the latest Wikipedia dump in this link: [Wikipedia:Database download - Wikipedia](https://en.wikipedia.org/wiki/Wikipedia:Database_download).

I pre-cleaned it using some regexes and the result dataset has around 7M entries and weights about 100GB. Not bad for a dataset!

In each entry, I have the Wikipedia id, the title, the original text, and the cleaned text, all saved in JSON. So, now that we have the dataset, we can start crunching some data.

## Planning, restrictions and goals

We will be using TF-IDF as a ranking model, but don't worry for now, since today's post will be about tokenizing the text. As a bit of a challenge, I want to be able to index Wikipedia's entire catalog in under an hour. We will not get to that goal today but we will keep this goal in mind as a reference.

To get to that goal, we will need to separate the indexing into 3 steps: reading the data, processing the data, and finally writing to disk. Since doing all of this in a single binary is easy, each step will be its program and we will communicate via TCP.

Doing some napkin math, we can see that, to read 7M lines per hour (our final goal) we will need to read from disk at 27MB/h since the file is 100GB. This gives a total of round 194K lines per second!

## Early results

Creating a simple lexer is not hard, I decided that the tokens must start with a letter and contain letters or numbers, and then, to reduce the number of unique tokens, I passed each token through Snowball, a lemmatizer that retrieves the root from the verbs.

This constitutes the basics of our workers. In comes the data, and out comes the tokens and their counts.

With the hardest part done, I create a simple reader that given the addresses of several workers, creates a thread, and sends them the lines. As this is just a test, I did not bother to encode the line in JSON just to have to decode it later. To handle the synchronized reading, I create a simple thread-safe queue where I push the lines and pop them at each thread.

Finally, we reached the merger, where it receives from each worker the tokens and their counts in JSON and dumps straight to a file.

Running all of this with a single worker (in release mode) we got a total of about 400 lines per second, not bad for a first attempt, but a far cry from the almost 200k lines per second goal. We need to do better.

## Conclusion

This is sort of an introduction to the project and, as such, not much was coded today. Nevertheless we set up the basic guidelines and expectations for the entire project. Next time we will get started with the code itself!

Stay tuned for the next episode!

Signing out, Lukas.