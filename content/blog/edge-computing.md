---
title: "Computing at the Edge"
date: 2023-02-27
draft: false

description: "Guide on how to gain an edge on your competition by harnessing the power of Edge Computing."
tags: 
- edge

series:
- computing-at-scale

categories:
- computing
---

## How does Edge Computing works

Edge Computing works by serving content in a decentralized manner, meaning that the content is distributed around multiple locations on the "edge" to provide a quicker response time. Then, once the cache expires, content is renovated by a slower central server.

The most common way to serve such content is with a CDN or Content Delivery Network.



## What is a CDN?

Like in Edge Computing, a CDN works by placing the content as close to the user as possible. Improving the performance perceived by the user and increasing sales and conversion rates.

To achieve this, a CDN has hundreds of server locations across the globe, and each location, called Point of Presence (or PoP), has servers, called Edge Servers that are able to serve content.

With this mesh of Edge Servers, users can always reach a close PoP and, as such, decrease the latency and increase overall performance.

There are two major methods to redirect a user to the closest PoP, DNS-based routing and Anycast.



### DNS-based routing

In a DNS-base routing, each PoP has an IP address and the DNS server returns the IP of the closest PoP.



### Anycast

With Anycast, all PoP have the same IP address and the one responsible to return the closest PoP is the backbone routing of the Internet. This not only decreases requests but is also much more resilient to DDoS attacks, since the routers can process and distribute traffic in an efficient manner.

As such, having each PoP with the same IP address makes it impossible to target a single PoP in a DDoS.



### Caching and file processing

Caching is done automatically and renewed asynchronously with a central server. But a modern CDN can also do more than just cache static files.

Some common process steps are compressing and converting images to the *.webp* format, minifying Javascript, CSS, and HTML files, and making them lighter, or even transcoding videos into more specific resolutions.

This process decreases load and bandwidth requirements on the central server.



### TLS Advantages

It is no secret that TLS is expensive. A single TLS handshake takes several roundtrips to be successfully established and, in a world where HTTPS is the most dominant protocol on the web, optimizing TLS is a must.

That gives an advantage to CDNs because since the TLS is terminated in a PoP that is much closer than the central server, each roundtrip takes less time to do and decreases significantly latency.



### DDoS Protection and Availability

As I talked about before, having a CDN with an effective capacity larger than any attack and being distributed contributes to dissipating the attacks over several locations, mitigating the attack.

As opposed to a single point of failure in a central server, a CDN can support many more failures and still serve content



## Conclusion

In conclusion, Edge Computing is one of the most important ways to serve content over the network and implementations like CDNs are crucial to build a resilient and effective business that can withstand attacks and failures.

Hope you liked it, see you next time!
