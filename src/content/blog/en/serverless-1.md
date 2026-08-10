---
title: 'What is the Serverless concept?'
description: 'An overview of the Serverless concept, comparing it with VPS, PaaS, and Dedicated Server, its use cases, and free services to get started.'
pubDate: '2026-08-05'
tags: ['serverless', 'cloud']
series: 'Serverless'
episodeNumber: 1
translationKey: 'serverless-1'
image: '/og/serverless-1-og-en.png'
---

## What is the Serverless concept?
When I first heard the word serverless, I thought it referred to projects that don't need a server and only need a client XD but that interpretation of mine was wrong.
In Serverless, we actually do have servers, and good ones at that, but we no longer have to worry about all the maintenance involved.
This maintenance includes:
- Installing the operating system
- Hardware scalability
- Server configuration
- Security updates
- Installing and configuring a web server (e.g. nginx, apache)
- Load balancer

Meaning you focus only and only on writing your code, and you shove the serious and difficult responsibilities onto someone else XD

Pretty nice, isn't it?
So basically, it's not that there is no server, there is, but you don't have to worry about it anymore. In a way, you could say the name of this architecture is Server's Concernless.


## A look at other types of servers that might get mixed up with serverless

Since the types of servers keep getting more and more numerous, I think it's better, before adding a ton of extra textual explanation, to simply compare it with some examples that sometimes have similar features to serverless and see what's going on:

| Comparison criterion | Shared Server | Dedicated Server | VPS | PaaS | Serverless |
| --- | --- | --- | --- | --- | --- |
| **Basic definition** | Sharing a physical server and its resources among hundreds of sites | A completely dedicated physical server in a datacenter | A virtualized layer (VM) with dedicated resources on a host server | A managed platform for directly running and Deploying code | An event-driven architecture with instant code execution and automatic scalability |
| **Access and control level** | **Zero,** only access to the control panel | **100%,** full Root/SSH and Bios/Hardware access | **High,** full Root/SSH access to the virtual OS | **Limited,** access only to application settings and Environment Variables | **Zero,** no access to the OS or infrastructure |
| **Infrastructure and OS management** | Handled by the provider | Entirely your responsibility | Entirely your responsibility | Handled by the provider | Handled by the provider |
| **Pricing model** | Fixed monthly/yearly rental (very cheap) | Fixed monthly/yearly rental (very expensive) | Fixed monthly/hourly rental based on reserved resources | Based on the number of Instances and reserved RAM/CPU | **Exactly based on actual usage** (number of Requests + execution time in milliseconds) |
| **Cost at zero traffic (Idle)** | Pay the full cost | Pay the full cost | Pay the full cost | Pay the full cost | **$0 (Scale to Zero)** |
| **Scalability (Scaling)** | **Almost zero,** requires upgrading to a higher hosting plan | **Manual and difficult,** requires ordering and adding physical hardware | **Simple Vertical,** upgrading RAM and CPU with Reboot | **Automatic Horizontal,** quickly adding a new container | **Auto-scaling** from 1 to 10,000 simultaneous executions in a few milliseconds |
| **Cold Start problem** | None | None | None | None | **Yes,** a short delay on the first request after some idle time |
| **Execution Timeout limitation** | Depends on Web Server settings | **No limitation** | **No limitation** | **No limitation** | **Yes,** limited to a few seconds to a few minutes (e.g. 15 minutes in AWS Lambda) |
| **WebSocket and Long-running support** | Very limited or disabled | **Excellent and complete** | **Excellent and complete** | **Excellent and complete** | **Weak/complex** |
| **Isolation and security** | **Low,** a vulnerability in one site can threaten the others | **Maximum,** hardware is completely isolated | **Good,** isolation at the hypervisor/VM level | **High,** isolation at the Container level | **Very high,** each request runs in an isolated Micro-VM/Sandbox |
| **DevOps complexity and maintenance** | **Zero** | **Very high** | **Medium to high** | **Low** | **Very low** |
| **Examples of well-known providers** | Bluehost | Hetzner | Hetzner Cloud, DigitalOcean | AWS Elastic Beanstalk, Google App Engine | AWS Lambda, Cloudflare Workers, Google Cloud Run, Vercel |
| **What kind of project needs this?** | Small corporate sites, simple WordPress blogs | Banking systems, very large databases, heavy processing | Medium-sized projects, standard APIs, Dockerized Apps | Startups, MVPs, projects where development speed matters | Event-driven APIs, systems with sudden and sinusoidal traffic |

As we saw in the table, if we want to compare our server to a house, each one would look like this:

- **Shared Server**: Student dormitory
- **Dedicated Server**: Empty private house
- **VPS**: Private rental house
- **PaaS**: Hotel
- **Serverless**: Hourly hotel

I'll try to write about these **as a Service** things later too (e.g.: IaaS, PaaS ...)

## When should we use serverless?

There are good reasons to use serverless, and I'll write down some of the most important ones.
For the first and second reasons, I'll use a similar online store example

### Event-Driven architectures

In an online store, suppose that after every successful order you need to do the following 4 things:


1.  Generate a PDF invoice and save it in S3/Cloud Storage

2.  Decrease the inventory in the database

3. Send a purchase confirmation SMS/email to the user

4.  Send a message to the postal system to prepare the package

Do you think it makes sense for the user, after making their purchase, to have to wait for us to do all these things too?
Absolutely not, for such a scenario we trigger an event that goes and does these things in the background by itself.
You might say now, well what does this have to do with serverless at all? We can use RabbitMQ or Kafka to process these events and be done with it! Yeah, that's right, but with this approach there are these problems:

- Your server needs enough hardware to run the Message Broker, and if it doesn't, you have to upgrade it
- You have to wrestle with installing and configuring this Message Broker
- It's running 24 hours a day and you have to pay for the server even when you don't have a single order throughout the month

The simpler way is serverless, meaning you only wake it up whenever you need it, let it do its job, and let it sleep.


### Systems with sinusoidal traffic

Suppose it's Black Friday and suddenly the site's traffic shoots up and you get tons of orders
The server scales without any effort and doesn't buckle under the load. If it were a regular server, it would fall apart under the pressure.
In scenarios where not a fly is flying around, as I said above, it goes to sleep and your cost becomes $0.

### Personal projects and MVPs

This part isn't very technical and is more financial.
Many cloud giants have free plans for serverless, which makes it attractive for personal projects, portfolios, and MVPs.
Because you don't have to pay and you don't have to deal with infrastructure, you get way ahead

## Where can I get free serverless and get started?

At the time I'm writing this article, the free plans of the most well-known ones look like this:

- Cloudflare:

   -  Free limit: 100,000 requests per day (about 3 million per month).

   -  Feature: Very high speed due to running on the Edge network, shorter execution time, and no noticeable Cold Start.

- AWS Lambda:

   -  Free limit: 1 million requests per month + 400,000 GB-seconds of processing time per month.

   -  Feature: The most standard and feature-rich service in the world.

- Google Cloud:

   -  Free limit for Cloud Run, which is more for Dockerized projects: 2 million requests per month + 360,000 GB-seconds of memory and 180,000 vCPU-seconds.

   -  Free limit for Cloud Functions, which like Cloudflare Workers is a type of FaaS: 2 million invocations per month.

   -  Feature: Cloud Run is the best option for running Docker containers in a Serverless manner.

- Vercel:

   -  Free limit: 100 GB bandwidth + 100,000 Serverless Function executions per month.

   -  Feature: The most popular option for front-end projects and frameworks like Next.js.

- Netlify:

   -  Free limit: 100 GB bandwidth + 125,000 function executions per month.

   -  Feature: Excellent for deploying static projects along with Function.

This blog itself is running on Cloudflare and I'm very happy with it, both in terms of performance and how easy Cloudflare itself is to work with.
I also recommend that you start with Cloudflare if you got confused reading the list above

## Final note
This part was just an initial introduction. In the next parts I'll cover the different types of serverless and we'll learn more details together.
Stay with me <3