---
title: "Cloud vs Edge Computing"
date: 2023-02-24
draft: false

description: "Overview of cloud and edge computing and how they compare."
tags: 
- cloud
- edge

image: res/images/cloud-edge-thumbnail.webp

categories:
- computing

series:
- computing-at-scale
---

Nowadays we hear a lot about the cloud and how much it is great. But the reality is, depending on the use case, the cloud may not be the most efficient way to serve your application.

Today we will see the main differences between computing in the cloud and at the edge.



## Cloud Computing

When you deploy on the "cloud" you are using a set of shared resources from some bigger company such as Amazon, Microsoft, or Google.

Simply put, cloud computing is using a set of shared resources, from networking to software, analytics, and servers.

There are some drawbacks to this approach and there is a lot to talk about it, so I will reserve it for another post and in this post, we will focus on the differences.



## Edge Computing

Edge Computing refers to computing closer to the edge of the network, that is, closer to the end client and reducing latency and increasing overall customer satisfaction. However, it is more expensive than the cloud.

Let's analyze the example of a store that has its services in the US but then decides to go international and start receiving requests from all over the world.

That company then starts to realize that having only one data center placed in the US creates too much latency from locations like India.

What is the solution? The solution is, instead of centralizing computations, to distribute it on the edge. How?

Well, there are a lot of services that do not need to be centralized, such as the UI. So one of the solutions could be hosting the UI in a CDN and synchronizing it only when the information become too old for example, reducing the latency and increasing user satisfaction.



## Conclusion

We saw that, even though cloud computing is good for several use cases, sometimes we need to use a hybrid approach and mix cloud and edge to give the company better results and improve user satisfaction.

This was a smaller post, but hope you liked it. See you next time!
