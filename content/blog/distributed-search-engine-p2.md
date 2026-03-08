---
categories: []
date: '2024-01-24'
description: 'Making out own Google at home using distributed systems (part 2)'
draft: false
tags:
  - Roogle
title: 'Making Roogle, a distributed search engine in Rust - part 2'
---

Today we will continue making our Google-like search engine, *Roogle*. Sounds exciting? Tune in!

## Defining a base-ground

In the previous post, I did some work, trying to establish a baseline. If you remember, we needed about 20 workers to reach our goal of 8k lines per second. Today we will decide on ways to increase throughput with lower resources.

I also *kind of cheated* and pre-processed the text beforehand, something that will also need to be addressed by our workers on the fly.

The architecture I will be trying is inspired on Map-Reduce where there are 2 types of workers and one master, later we may extend and add fault tolerance to the master, but for this demo, just a single one is enough.

### Map Reduce

Map Reduce, as the name implies has 2 phases, a mapping phase, and a reducing phase. In the mapping, the data is preprocessed and mapped and in the reduce phase, it is *reduced* and adjusted to our use case. Confusing? Let's apply this to our problem.

In our problem, we have the following *smaller* problems: Pre-Processing, Tokenization, and Pre-Scoring. If we apply this to Map Reduce, we can say that Pre-Processing and Tokenization will *map* the input to a Key-Value intermediate state with great dimesnionality, meaning it will be a huge array and the reducers the large amounts of data and get the final result, essentially *merging* and *reducing* the dimensionality of data.

### Creating a proof-of-concept

To create the proof-of-concept I decided to create three binaries, one for the Master Node, other for the mapping phase and other for the reducing phase. Those are in the respective folders (mapper, master and reducer).

You may also see that there is another folder called protocol. That's because I decided to create a library that holds the inter-process communication. We will be communicating via TCP and, since we can just send bytes, we need to serialize.

To serialize the data from a struct to bytes, we first convert the struct into a JSON string and then into bytes. This is inefficient but for this demo this is good enough.

Each node's socket will have its own thread on the master node and the master node will have two threads so it can listen to the two ports I defined (8000 for mappers and 8001 for reducers). Eventually I want to reduce this to a single port but, since this is a proof of concept, having some inefficiencies is fine.

Another thing that I decided to put in that library is the implementations that will govern each node type.

For now, I just implemented a really simple tokenizer without pre-processor, something that will change soon.

For ease of use, I decided to future-proof and added a layer of abstraction between the protocol and the client. That abstraction is a Scheduler to ensure no worker runs out of work and everyone is happy and working.

### The Scheduler

The Scheduler I decided to use is a Work-Stealing Scheduler or WSS.

This scheduler defines three places that one can get a work. One global queue that is our data inlet, a worker specific queue and a list of queues where work can be borrowed.

This scheduler works very well and is easy to implement using the crossbeam rust library.

This is the code for getting a piece of work from those three places given in the documentation for this crate.

```rust
fn find_task<T>(local: &Worker<T>, global: &Injector<T>, stealers: &Vec<Stealer<T>>) -> Option<T> {
    // Pop a task from the local queue, if not empty.
    local.pop().or_else(|| {
        // Otherwise, we need to look for a task elsewhere.
        iter::repeat_with(|| {
            // Try stealing a batch of tasks from the global queue.
            global
                .steal_batch_and_pop(local)
                // Or try stealing a task from one of the other threads.
                .or_else(|| stealers.iter().map(|s| s.steal()).collect())
        })
        // Loop while no task was stolen and any steal operation needs to be retried.
        .find(|s| !s.is_retry())
        // Extract the stolen task, if there is one.
        .and_then(|s| s.success())
    })
}
```

Is important to note that the scheduler will only be needed on the master node.

## Testing  everything so far

To test everything so far I ran every executable in its own terminal. However this is far from perfect since this gets boring after a while.

So what now? More automation.

To automate the testing I created another executable called testing that will compile everything in release and run some nodes.

## Results

Doing this more advanced prototype, gave me some insights, specially at the protocol level.

Speed is not bad, but I had to make a *lot* of low level hacks to get this to work, so I will be changing to the tokio library sooner rather than later to handle the IPC (Inter Process Communication).

## Conclusion

To conclude our little experiment, we can say that while the architecture and the ideas are sound, we need to work on the implementation and make the switch to something higher level.

The code, as always, is available on [Github](https://github.com/MachComputing/Roogle).

Have a nice day.

Signing out. Lukas.
