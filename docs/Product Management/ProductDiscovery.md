---
sidebar_position: 3
slug: /product-management/product-discovery
description: Best practices and techniques for product discovery using modern Product Owner techniques
---

# Product Discovery

> [Back to Product Management Intro](../product-management/product-management-intro)

**<Tooltip text="Product discovery" definition="The process of deciding what to build before development: uncovering needs, validating solutions, and testing assumptions with minimal cost so teams ship the right product." />** is the process of uncovering unmet customer needs and validating what to build before committing engineering resources. It reduces the risk of building the wrong thing by testing ideas cheaply through user research and experimentation.

## What is Product Discovery?

The purpose of product discovery is to address four critical risks before you invest in building:

| Question | Risk | Purpose |
|----------|----------|---------|
| Will the customer buy this, or choose to use it? | Value risk | Validate that the problem is worth solving. |
| Can the user figure out how to use it? | Usability risk | Test that your approach is usable. |
| Can we build it? | Feasibility risk | Confirm feasibility and scope. |
| Does this solution work for our business? | Business viability risk | Ensure alignment with strategy and viability. |

And it's not enough to just to have an opinion on these questions, we need to collect evidence.

:::info
On occassions, there is a fifth risk: ethics - where a team should also consider the question "*Should* we build it?". We need to avoid building solutions that will cause harm on certain users or the environment.
:::

Discovery is not a one-off phase-effective teams treat it as <Tooltip text="continuous discovery" definition="A practice of having at least weekly customer touchpoints, with the product team running small research activities in pursuit of a desired outcome (Teresa Torres)." />, running small research activities alongside delivery so that future work is informed by evidence.

> More information can be found on page 165 of Marty Cagan's book "[Inspired (How to Create Products Customers Love)](../product-management/research#inspired-how-to-create-products-customers-love)".

<PageBreak />

## Best practices

- **Run discovery continuously** - Integrate discovery with delivery: spend 1–3 hours per week on customer touchpoints (interviews, surveys, prototype tests) while the team builds. This keeps the backlog informed by real needs instead of opinions.
- **Test the riskiest assumptions first** - Use <Tooltip text="assumption mapping" definition="Making your riskiest assumptions explicit and testing them with minimal experiments (e.g. interviews, landing pages, prototypes) before full product development." /> to list assumptions and prioritise by impact and uncertainty. Run the cheapest experiment that could invalidate each assumption.
- **Combine quantitative and qualitative data** - Use metrics (usage, conversion, retention) to spot patterns and prioritise where to dig. Use interviews and feedback to understand the "why" behind behaviour. Neither alone is enough for good decisions.
- **Use design partners early** - A <Tooltip text="design partner" definition="An early customer who co-shapes the product through close collaboration; valuable for feedback, but over-indexing on one segment can skew the product." /> can accelerate learning when you have a small set of target users. Choose partners who represent your intended segment and avoid letting a single voice dominate.
- **Use structured frameworks** - Frameworks like the <Tooltip text="opportunity solution tree (OST)" definition="A visual framework (Teresa Torres) with four levels: desired outcome, opportunities (customer needs), solutions (ideas), and assumption tests-connecting daily discovery work to business outcomes." /> keep discovery aligned to outcomes and make it clear how solutions map to opportunities and how experiments map to solutions.

:::tip[Example: OST in practice]
Start with one desired outcome (e.g. "Increase activation in first 7 days"). From customer interviews, identify opportunities (e.g. "Users don't understand the value in the first session"). Brainstorm multiple solutions per opportunity, then define the smallest assumption test for each solution before building.
:::

## Discovery Techniques

The below sections cover the different techniques that can be used to frame, plan, ideate and test during the discovery process.

### Framing Techniques

Framing techniques help us quickly identify the underlying issues that must be tackled during the discovery process. We need to clarify the underlying problem to be solved and tease out risks to determine where best to spend our time.

There are really two goals to framing:

1. Ensure that the team is on the same page about the problem to be solved, agreeing on the business objective we're focusing on, the specific problem we're intending to solve for customers, which customers are we intending to solve it for, and the success criteria for the solution.
2. To identify the big risks (financial, technical, legal, etc.) that will need to be tackled during the discovery process.

> More information can be found on page 175 of Marty Cagan's book "[Inspired](../product-management/research#inspired-how-to-create-products-customers-love)".

Three useful framing techniques are:

1. **Opportunity Assessment** - Used for the vast majority of product work, rangeing from simple optimisation, to a feature to a medium sized project.
2. **Customer Letter** - Designed for larger projects or initiatives.
3. **Startup Canvas** - For times when you're creating an entirely new product line or new business.

:::tip[Framing Techniques]
#### Opportunity Assessment

A simple technique with the key being to answer four questions:
1. What business objective is this work intended to address? (*Objective*)
2. How will you know if you've succeeded? (*Key Results*)
3. What problem will this solve for our customers? (*Customer Problem*)
4. What type of customer are we focused on? (*Target Market*)

<PageBreak />

#### Customer Letter Technique

When embarking on larger efforts, there may in fact be multiple reasons, several customer problems to be solved or business objectives to be addressed. For this, it may take more than the four questions of the Opportunity Assessment to fully frame the work.

Marty Cagan describes a technique where the product team writes a hypothetical letter to the CEO from a very happy and impressed customer, explaining how the customer is using the product and the benefits they are getting from it and how it has changed their business. The letter also includes an imagined congratulary response from the CEO to the engineering team for delivering the solution.

This technique creates empathy for the customer and the problem they are solving, and more clearly emphasizes to the team how their efforts can help the lives of the customers they are serving.

<PageBreak />

#### Startup Canvas Technique

For situations where you're creating an entirely new product line or new business, the Startup Canvas is a useful technique to help frame the work. A startup canvas is close cousin to the Business Model Canvas, but it is specifically designed for startups and early stage businesses. Creating a canvas helps quickly highlight the key assumptions and major risks facing a startup or a significant new product in an existing business. This is a good thing - the idea is to tackle the biggest risks first.
:::

### Planning Techniques

These are techniques to help with identifying the bigger challenges and planning how to attack this work. For complicated product efforts, it often helps to have some way to scope out and plan your discovery efforts.

> More information can be found on page 191 of Marty Cagan's book "[Inspired](../product-management/research#inspired-how-to-create-products-customers-love)".

Two techniques are:

1. **Story Maps** - Generally useful technique. Major user activities are arrayed on a board along the horizontal axis, loosely ordered by time from left to right. Along the vertical dimension we go into more detail by breaking down the user activity into smaller user tasks and add stories per task, with critical tasks higher than the optional tasks. This allows you to get a holistic view of the of the system and plan workloads.
2. **Customer Discovery Program Technique** - A very powerful but time costly approach. The approach is to gather <Tooltip text="reference customers" definition="A real customer who is using your tool in production, has paid real money for the product and is willing to tell others about how much they love your product." /> (at least six is best) who feel strongly about your product and are willing to help you build it. The benefit to them is that they get real input to the solution, and the benefit to the product team is that they get a chance to test the solution with real users. Then work with these customers, bouncing possible solutions off them and getting their feedback on the solutions. Read much more information on page 195 of Marty Cagan's book "[Inspired](../product-management/research#inspired-how-to-create-products-customers-love)".

<PageBreak />

### Ideation Techniques

Ideation techniques are designed to provide the product team with a wealth of promising solutions to the problems we're focused on. Although if in general, the product team is given actual business problems to solve rather than solutions, and the product team does their job well and interacts directly and frequently with the users and customers, then typically getting sufficient quantity and quality of solutions is not a problem.

> More information can be found on page 208 of Marty Cagan's book "[Inspired](../product-management/research#inspired-how-to-create-products-customers-love)".

Four techniques described here are:

1. **Customer Interviews** - There are many forms of customer interviews - but the key is to ensure that the product manager, product designer and at least one developer are involved to get the benefit of the full learning. Key things: Establish regular cadence of interviews, ensure the customer is in your target market, go to the customers location if possible, ask open ended questions, and be prepared to ask follow up questions.
2. **Concierge Test Technique** - This involves doing the job that the customer is doing, doing the tasks they have to do to understand the problem they are trying to solve, and then bouncing possible solutions off them and getting their feedback on the solutions. They may need to initially train you on how to do the job and it is most valuable when the product manager, designer and developer are all involved.
3. **The Power of Customer Misbehavior** - This involves allowing or even encouraging the customer to use our product in a way that is not the way it is intended to be used, and then observing and learning from the customer's behavior to evaluate opportunities for improvement.
4. **Hack Days** - The two main types are directed and undirected. Directed hack days are where the product team is given a specific customer problem to solve and undirected hack days are where the product team is given free reign to explore whatever product related ideas they have. HJack days typically are effective at creating ideation amongst the engineering team by inclusion and builds cultural missonary mindsets amongst employees.

<PageBreak />

### Prototyping Techniques

Prototyping techniques are used to create a working model of a solution to test with users in a variety of forms - to learn something at a much lower cost than building the full solution.

Below describes four key prototyping techniques:
1. **Feasibility Prototyping** - Typically code written by engineers to address technical feasibility risks - the idea is to write just enough code to mitigate the feasibility risk.
2. **User Prototype Technique** - Two types: low fidelity and high fidelity (see below) - user prototypes are simulations for judging usability of the solution, most typically developed by the product designer. Don't use them for judging value or feasibility.
3. **Live-Data Prototype Technique** - Sometimes we may need to collect some actual usage data as evidence support ideas from discovery. This should be real code, but developed to a fraction of what a full product is - it is just to collect data.
4. **Hybrid Prototype Technique** - Combine a wide variety of the above techniques for different purposes. An example is a Wizard of Oz prototype, where a test user interacts with a high fidelity prototype front end, but with an actual person on the other end of the interaction providing the necessary backend functionality to support the user's actions that would ultimately be provided by the full product.

:::tip[High vs Low Fidelity User Prototypes]
A low fidelity prototype is a simple UI with basic functionality to gather feedback quickly, while a high fidelity prototype is more visually developed to look like the final product.
:::

> More information can be found on page 223 of Marty Cagan's book "[Inspired](../product-management/research#inspired-how-to-create-products-customers-love)".

<PageBreak />

### Testing Techniques

Testing techniques are used to validate the assumptions we've made about the problem to be solved and the solutions we've proposed. 

We're essentially trying to quickly separate the good ideas from the bad, answering four questions as we go:
1. Will the user or customer choose to use or buy this? (Value)
2. Can the user figure out how to use it? (Usability)
3. Can we build it? (Feasibility)
4. Is this solution viable for our business? (Business Viability)

> More information can be found on page 241 of Marty Cagan's book "[Inspired](../product-management/research#inspired-how-to-create-products-customers-love)".

#### Testing Usability

Probably the easiest to test, but should be done early on during discovery using prototypes. You need to do the following:

- **Recruit users to test**: Establish a base of users to test, either through the product team's existing user base or through a recruitment agency.
- **Preparing the test**: It is usual to conduct the usbaility test with a high-fidelity user prototype. Conduct the test with the product manager, designer and one engineer from the team. Define the set of tasks to be tested in advance. One person should administer the test and another take notes. Tests can be done in formal testing labs with video recording, in more comfortable public settings such as coffee shops, at the customer's location (where they are most comfortable and natural), or even remotely (although this is less effective in many ways).
- **Testing your prototype**: Ensure that you frame the test situation, explaining that this prototype is not real and that you need feedback good or bad. Before jumping into your tasks, ask the user what they think the prototype is and what they think it does from its design which can lead to interesting insights. When testing, keep them in *use mode* rather than *critique mode* - what matters is if the user can easily do the task they need to do, not if they can critique the design. During testing, the main skill for you is to stay quiet and suppress your natural urge to help them out.

> There is far far more guidance on pages 243-249 of Marty Cagan's book "[Inspired](../product-management/research#inspired-how-to-create-products-customers-love)".

#### Testing Value

Most of the time, users will already have a solution for the problem your product is trying to solve. You don't just need to match the features of their current solution (feature parity), you need to be substanially better than their current solution for them to migrate to your product. To test value you must:

- **Test Demand**: We can't just assume that there is a demand for the product, we need to test it - see [Demand Testing Techniques](#demand-testing-techniques)
- **Test Qualitative Value**: Do customers love the product? Will they pay for it? And most important, if not, why not? - see [Qualitative Value Testing Techniques](#qualitative-value-testing-techniques)
- **Test Quantitative Value**: We need to test *efficacy* which refers to how well this solution solves the underlying problem - see [Quantitative Value Testing Techniques](#quantitative-value-testing-techniques)

#### Demand Testing Techniques

It is very easy for products or features to be built that are not in demand, but even easier to avoid this. Some techniques to test demand are:
- **Fake Door Demand Test**: The idea is that we put the button or menu item into the user experience exactly where we think it should be, which rather than leads to the feature, takes the uset to a page explaining that you're considering adding the feature and asking for their input on whether they would use it.
- **Landing Page Demand Test**: The idea is to set up a landing page for the new offering's product funnel, describing what the new offering would be as if we would if we were launching it. Rather that the CTA button on the page signing the person up for a trial, it takes them to a page explaining that you're studying the possibility of adding this new offering and you'd like to talk to them about it.

Both of these techniques collect two useful things: (1) some good evidence on demand and (2) a list of users who are ready and willing to talk with you about this specific new capability.

:::tip
You could use feature flags to roll out these demand testing techniques to a small subset of users to get early evidence on demand.
:::

#### Qualitative Value Testing Techniques

Quantitative testing tells us what's happening (or not), but it can't tell us *why* and what to do to correct the situation - that's why we do qualitative testing.

Qualitative testing is not about proving anything, it is about rapid learning and big insights. Marty Cagan suggests that product teams do at least *two or three qualitative tests every single week* as he sees it as the most important discovery activity.

- **Interview first**: Begin the user test with a short user interview where we try to make sure our user has the problems we think she has, how she solves these problems today, and what it would take for her to switch.
- **Usability test**: Always preceed a value test with a usability test to ensure that the user first understands what the product is and how it works. Only then can we have a discussion on the value of the product (or lack thereof). See more details in [Testing Usability](#testing-usability).
- **Specific Value Tests**: It is important to challenge the user to be honest with us rather than nice, by using something to demonstrate value. For each of the below, we're not expecting them to actually do it, but we want to see if they would consider it to indicate value:
    - **Using money to demonstrate value**: See if the user is willing to pay for the product or feature. We're looking for the user to pull out their credit card or sign a "non-binding letter of intent" to buy the product or feature.
    - **Using reputation to demonstrate value**: See if the user is willing to recommend the product or feature to their friends or colleagues. See if they will share it online.
    - **Using time to demonstrate value**: See if the user is willing to spend more time using the product or feature.
    - **Using access to demonstrate value**: See if the user is willing to begin migrating from their current solution to the new solution immediately.
- **Iterating the Prototype**: Remember, this is not about proving anything - it's about rapid learning. For example, if you show your prototype to two users and get substantially different feedback, your job is to figure out why.

:::important
As a product manager/owner, it is important that you are at every single qualitative value test - do not delegate the responsibility to someone else.
:::

#### Quantitative Value Testing Techniques

While qualitative testing is all about fast learning and big insights, quantitative techniques are about collecting evidence. Sometimes we can collect enough data that we have *statistically significant results* (such as with consumer services with lots of daily traffic), and other times we'll set the bar lower and collect less usage data that we consider as useful *evidence*. The technique we select depends on the amount of traffic we have, the amount of time we have and our tolerance to risk.

- **A/B Testing**: In discovery A/B testing, we ususally have the current product showing to 99% of users and the new product showing to 1% of users. We then measure the difference in usage between the two groups and see if it is statistically significant.
- **Invite-Only Testing**: If your company is more risk averse, or you don't have enough traffic to show to 1 or 10% of users and get useful results, you can invite a small number of users to test the new product or feature. You tell them that this is an experimental version, allowing them to opt in or out of the test. Generally, groups who volutneer for this are more likely to be early adopters types - so this can be less representative of the overall user base.
- **Customer Discovery Program**: Here we can use existing contacts from our customer discovery program, explained earlier. These customers have already opted in to testing new versions and so will be willing to test the new product or feature.

In today's world, product managers are also expected to leverage data analytics to collect evidence. There are 5 main uses of analytics in strong product teams:

1. **Understanding user and customer behavior**: We can use analytics to understand if and how users and customers are using our product or feature, and how they are behaving.
2. **Measure product progress**: Set the team business objectives and measure progress against them.
3. **Prove whether product ideas work**: We can isolate the contribution of new features, new versions of workflows or new designs by running A/B tests and comparing the results - allowing us to prove whether product ideas work.
4. **Inform product decisions**: Today, data beats opinions - we can use analytics to inform product decisions by showing us what is working and what is not.
5. **Inpire product work**: By exploring the data, we can find some very powerful product opportunities that we may not have otherwise considered.

:::tip
It's important for tech product managers to have a broad understanding of the types of analytics that could be available:
- User behaviour analytics (click paths, engagement)
- Business analytics (active users, conversion rate, lifetime value, retrention)
- Financial analytics (<Tooltip text="ASP" definition="Average Selling Price" />, billings, <Tooltip text="time to close" definition="The time it takes to close a deal" />)
- Performance (load time, uptime)
- Operational costs (storage, hosting)
- Go-to-market costs (acquisition costs, costs of sales, programs)
- Sentiment (<Tooltip text="NPS" definition="Net Promoter Score" />, customer satisfaction, surveys)
:::

#### Testing Feasibility

TBC

#### Testing Business Viability

TBC



<PageBreak />

### Transformation Techniques

#### Discovery Sprint Technique

TBC

#### Pilot Team Technique

TBC

<PageBreak />

### Techniques Summary

| Technique | Purpose | When to use |
|-----------|---------|-------------|
| **User interviews** | Uncover needs, pain points, and context. | Generative discovery; understanding "why". |
| **Assumption testing** | Validate or invalidate specific beliefs. | Before building; evaluating solutions. |
| **Opportunity solution tree** | Map outcomes → opportunities → solutions → tests. | Aligning the team and prioritising experiments. |
| **Discovery sprints** | Time-boxed cycles to test a hypothesis. | When you need a fast yes/no on an idea. |
| **Jobs-to-be-Done (JTBD)** | Focus on the "job" the user is hiring the product to do. | Uncovering latent needs users may not articulate. |
| **Prototype testing** | Test flows or concepts with minimal build. | When you need behavioural feedback on a solution. |

For more on <Tooltip text="Jobs-to-be-Done (JTBD)" definition="A framework that focuses on the underlying job the customer is trying to accomplish, rather than the features they request." /> in planning, see [Planning and Design](/docs/SDLC/planning-and-design#planning-phase).

:::tip[AI Discovery]
Given that users are now frequently asking AI agents such as ChatGPT, Gemini and Claude about your product, it is increasingly important to also analyse the questions that users are asking AI, and also as important to review what the chatbot is telling users about your product which can help identify gaps in the information AI agents can obtain about your product.
:::

<PageBreak />

## Discovery by company stage

:::info[Startup]
- **Speed over process:** Discovery is fast and informal-sketch Monday, test Wednesday, ship by Friday. The founder or product lead often runs customer conversations directly.
- **Lightweight tools:** Spreadsheets, calls, and simple prototypes are enough. Avoid heavy tooling until the team grows.
- **Design partners:** One or two design partners can shape the product; ensure they represent your target segment so you don't over-optimise for a niche.
:::

:::info[Growing company]
- **Formalise cadence:** Introduce a regular discovery rhythm (e.g. weekly interviews, bi-weekly synthesis) and a dedicated PM or product trio (PM, design, engineering).
- **Structured frameworks:** Use opportunity solution trees and assumption mapping so discovery ties to outcomes and roadmaps.
- **Tooling:** Adopt a feedback repository (e.g. Dovetail) and a product backlog tool (e.g. Productboard) to scale insight capture and prioritisation.
:::

:::info[Enterprise]
- **Many stakeholders:** Discovery must account for buyers, compliance, security, and legal-not just end users. Expect 1–2 months for key product decisions and multiple approval steps.
- **Risk and compliance:** Assumption tests may need to include security reviews, legal sign-off, or pilot agreements. Plan for longer experiment cycles.
- **Coordination:** Align discovery across teams with shared outcomes and a central place for insights so learning is reused.
:::

<PageBreak />

## Example Discovery Tools

| Purpose | Tool | Notes |
|---------|------|-------|
| Product discovery & feedback | [Productboard](https://www.productboard.com/) | Consolidate feedback, prioritise, and connect to roadmaps. |
| Mapping & workshops | [Miro](https://miro.com/) | Collaborative boards for opportunity solution trees and discovery workshops. |
| User research (video) | [UserTesting](https://www.usertesting.com/) | Video-based human insight; strong for moderated interviews and usability tests. |
| Prototype & survey testing | [Maze](https://maze.co/) | Unmoderated prototype testing, surveys, and card sorting; AI-assisted analysis. |
| Research repository & analysis | [Dovetail](https://dovetail.com/) | Store interviews, surveys, and support data; analyse and share insights. |
| Frameworks & learning | [Product Talk](https://www.producttalk.org/) | Teresa Torres's site; opportunity solution trees, continuous discovery habits, and guides. |

:::tip[Choosing tools]
At startup, start with calls and a shared doc. Add Productboard or Dovetail as feedback volume grows. Use Miro (or similar) once you run discovery workshops with multiple stakeholders. Enterprise teams often need all of the above plus integration with Jira, Intercom, or Zendesk.
:::
