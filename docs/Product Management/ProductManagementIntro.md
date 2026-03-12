---
sidebar_position: 1
slug: /product-management/product-management-intro
description: Product Management introduction and key concepts
---

# Product Management Intro

> [Back to Documentation Intro Contents](../DocumentationIntro.md)

## Quick Links

- [Product Management Research](../product-management/research)
- [Product Discovery](../product-management/product-discovery)

<PageBreak />

## Product Management: An Introduction

> The below is a summary from SVPG's "[Product Management: An Introduction](https://www.svpg.com/product-management-an-introduction/)" article.

### Key Skills of a Product Manager

Product managers working in the product model on an empowered, cross-functional product team, must bring to their product team deep knowledge in five key areas:

**1. Deep Knowledge of the Users and Customers**

The product manager must be an  acknowledged expert on the users and customers.  This requires direct engagement to understand their pain points, needs, decision-making process, and behaviors. Effective product managers leverage both:
- **Quantitative insights** to analyze user behavior and trends through data to understand how their products are being used 
- **Qualitative insights** to understand the motivations behind user and customer behaviors – especially to understand why their products are not being used.

**2. Deep Knowledge of the Data**

Today’s product managers must be **fluent with data and analytics**.  They need to be adept at:

- **User analytics** to understand how the product is used
- **Sales analytics** to understand how the product is purchased
- **Data trends** to evaluate how patterns are changing over time

While product managers often collaborate with data analysts or data scientists on collecting and analyzing data, they _must_ understand the data themselves in order to truly understand their customers.

**3. Deep Knowledge of their Business**

This refers not to their customer’s business, but rather their own business.  In particular, the various constraints on the business – sales, marketing, finance, legal, compliance and more.

A product manager must **understand the business context** and be well-versed in the:

- **Go-to-market strategy** – How the product reaches customers
- **Business model** – How the business and products generate revenue
- **Product economics** – Costs, pricing, and profitability
- **Legal, compliance and ethical considerations** – Privacy, security, and regulatory compliance factors

**4. Deep Knowledge of the Market and Industry**

A product manager must stay abreast of:

- **Competitive landscape** – Understanding the market and the various players and their positions 
- **Emerging technologies** – Innovations shaping the industry
- **Customer behaviors and expectations** – Anticipating shifts in behaviors and demand

**5. Deep Knowledge of the Product**

Product managers must also be **experts on their own product’s capabilities and limitations**. This expertise includes becoming an expert user of your product. 

<PageBreak />

### Product Management’s Role in Assessing The Risks in Product

The product team is responsible for both product discovery (understanding the problem and figuring out the solution we need to build) and product delivery (building, testing and deploying that solution to our customers).

While every member of the team participates in both product discovery and product delivery, the product manager’s primary responsibility is product discovery.  In particular, the product manager is responsible for ensuring the _value_ and the _viability_ of what the product team builds.

Product discovery is how product teams **gather evidence** that their solution or product will achieve the desired outcome.

This work is structured around the four key product risks that the product team addresses in product discovery are: 

**1. Value Risk** – Will customers buy or choose to use the product or feature?
 - Validate that the product solves a real customer problem and delivers enough value for users to adopt it through continuous product discovery, customer research, and experimentation.  This is the responsibility of the **product manager**.

**2. Business Viability Risk** – Will this solution work for our business (e.g., legal, financial, and strategic fit)? 
- Collaborating with key stakeholders, ensuring that the solution aligns with their goals and constraints.  This is the responsibility of the **product manager**.

**3. Usability Risk** – Can users figure out how to use it?
- Ensure the holistic product experience is easy to learn and use, meets each type of user’s needs.  This is the responsibility of the **product designer**.

**4. Feasibility Risk** – Can the solution be built with the available technology, skills, and resources?
- Determine if the product can be built with the available time, money, technology, skills, performance and scaleability that is necessary to create a product quality solution.  This is the responsibility of the **engineering tech lead**.

<PageBreak />

### What Product Management is Not

The role of the product manager is often misunderstood, or confused with the role of a project manager. **Product Managers**:
- Do not directly manage people, but instead work collaboratively with the engineers, designers, or other team members to deliver outcomes.
- Are not requirement gatherers or backlog managers.
- Are not project managers focused only on delivery timelines.
- Don't focus on shipping features; they focus on solving problems in ways their customers love that also work for their business

<PageBreak />

## Key Concepts

### Product Vision, Strategy and Principles

These three layers help align teams and stakeholders on *why* the product exists, *how* it will win, and *what* behaviour is non-negotiable when making trade-offs.

| Layer | Purpose | Horizon | Example |
|-------|---------|---------|--------|
| **Product Vision** | The long-term impact or North Star; why the product exists. | Years | "Enable every small business to compete with big brands through data." |
| **Product Strategy** | How the product will win in the market; where to play and how to differentiate. | 1–3 years | "Win in SMB by being the easiest to set up and the most transparent on pricing." |
| **Product Principles** | Guardrails for decisions; what we optimise for and what we won't do. | Stable | "We prioritise clarity over cleverness." / "We never use dark patterns." |

Vision and strategy inform roadmap and <Tooltip text="OKRs" definition="Objectives and Key Results: a goal-setting framework where Objectives are qualitative goals and Key Results are measurable outcomes that indicate success." />; principles help when prioritising features, design choices, and partner deals, speaking the nature of the products you want to create and the values you want to uphold.

:::tip[Example: Principles in practice]
If a principle is "We never use dark patterns," then a proposal for a pre-checked "opt in to marketing" box is out of scope, regardless of short-term conversion gains. Principles make tough calls consistent.
:::

:::info[By company stage]
- **Startup:** Vision might be a single sentence; strategy may live in the founder's head. Writing down 3–5 product principles early still pays off when the team grows.
- **Growth / Established:** Document vision and strategy in a living doc (e.g. one-pager or wiki). Revisit strategy at least annually; principles rarely change unless the company pivots.
:::

<PageBreak />

### DORA Metrics

<Tooltip text="DORA" definition="DevOps Research and Assessment - Four key measures of software delivery: deployment frequency, lead time for changes, change failure rate, and time to restore service." /> stands for DevOps Research and Assessment, a long‑running research initiative originally formed to understand what makes software teams high‑performing. It is now part of Google Cloud, continuing to publish the annual <Tooltip text="State of DevOps report" definition="An annual research report (now from Google Cloud) on DevOps practices and team performance based on industry data." />. DORA’s research spans more than a decade and includes data from tens of thousands of engineering professionals worldwide. The program identified four key software delivery performance metrics (the “DORA metrics”):

| Metric                   | What It Measures                             | Why It Matters                     | Elite Benchmarks (2026)      |
|--------------------------|----------------------------------------------|------------------------------------|-------------------------------|
| **Deployment Frequency**     | How often code is deployed to production     | Indicates delivery velocity        | On-demand (multiple/day)     |
| **Lead Time for Changes**    | Time from code commit to production          | Process efficiency                 | < 1 hour                      |
| **Change Failure Rate**      | % of deployments causing failures            | Release quality, stability         | 0 – 15%                      |
| **Time to Restore Service**  | Time to recover from production failure      | Incident response effectiveness    | < 1 hour                      |

These metrics measure both speed (throughput) and stability, showing that elite teams excel at both. DORA’s findings link strong engineering practices and healthy team culture to better organizational performance, including profitability, productivity, and customer satisfaction. The metrics are widely used across the industry as a standard framework for assessing DevOps maturity and guiding continuous improvement.

:::tip[Tools to Help with DORA Metrics]
You can integrate tools like [LinearB](https://linearb.io/), [Haystack](https://www.usehaystack.io/) and [Sleuth](https://sleuth.io/) with your source control ([GitHub](https://github.com/)) and project management ([Jira](https://www.atlassian.com/software/jira)/[Azure DevOps](https://azure.microsoft.com/en-us/products/devops)). Even a simple dashboard in Jira that tracks "Issue Created" to "Production Release" can show Lead Time.
:::

<PageBreak />

### The Three Ways

> For more information on the Three Ways, see [The Phoenix Project](/docs/product-management/research#the-three-ways-the-phoenix-project)

1. **The First Way: The Principles of Flow  (Backlog Hygiene & Small Batches)** - This is about making work visible and moving it from left (Dev) to right (Ops) as fast as possible. For a PO, it means prioritizing ruthless backlog grooming, breaking down large features into smaller, manageable chunks, and making work visible. If you've helped reduce "work in progress" or made sure tasks didn't sit waiting for weeks, that's demonstrating flow.
2. **The Second Way: The Principles of Feedback (Telemetry & Rapid Loops)** - This is about creating, shortening, and amplifying feedback loops from right (Ops/Users) to left (Dev). As a PO, you'd ensure your team is using analytics tools to understand how users are interacting with features. Getting user feedback early and often, and then rapidly incorporating that into the next iteration, is key. Think about how you've gathered data to validate a feature or quickly rolled back a change that wasn't working.
3. **The Third Way: The Principles of Continual Learning  (Spikes & Retrospectives)** - This is about creating a culture that fosters two things: continual experimentation (taking risks and learning from failure) and understanding that repetition and practice are the prerequisites to mastery.

:::tip[Tools to Help with the Three Ways]
For The Second Way, you can use tools like [Mixpanel](https://mixpanel.com/) or [Amplitude](https://amplitude.com/) to understand how users are interacting with features. For the Third Way, you can use tools like [Spikes](https://www.spikes.com/) to help with continual learning.
  :::

<PageBreak />

### Prioritisation Frameworks

With limited resources and endless feature requests, structured prioritisation is essential. The most effective frameworks include:

| Framework     | When to Use                                            | Key Components                                 | Pros                      | Cons                                        |
| ------------- | ------------------------------------------------------ | ---------------------------------------------- | ------------------------- | ------------------------------------------- |
| RICE          | Feature-level prioritisation with quantifiable metrics | Reach, Impact, Confidence, Effort              | Data-driven, objective    | Can be time-consuming, subjective estimates |
| MoSCoW        | Sprint planning, stakeholder communication             | Must-have, Should-have, Could-have, Won't-have | Simple, aligns teams      | Can be vague, subjective                    |
| Cost-of-Delay | Strategic decisions, opportunity cost analysis         | Business value × Urgency                       | Focuses on value, urgency | Requires accurate value estimation          |
| Kano Model    | Feature-level prioritisation with quantifiable metrics | Basic expectations, performance differentiators, or delighters | Helps identify which features will drive satisfaction vs. which are table stakes | Can be subjective                    |
| Value vs. effort | For less experienced teams or more subjective decision-making | 2x2 grid based on value to the user and the effort required to deliver | Visual identification for easier decisions | Can be subjective relying on instinct                    |
| Opportunity scoring | If the project aims to improve customer satisfaction | Importance + max(importance – satisfaction,0) = opportunity | The ROI outweighs the development costs | Scoring models only provide a limited view of each idea's scope                    |

**Elaboration:**

- **RICE** helps PMs quantify and compare features based on their potential impact and required effort. [Read more here](https://www.productplan.com/glossary/rice-scoring-model/).
- **MoSCoW** is effective for communicating priorities with stakeholders and ensuring MVP focus. [Read more here](https://www.productplan.com/glossary/moscow-prioritization/).
- **Cost-of-Delay** highlights the financial and strategic impact of delayed features, guiding urgent investments. [Read more here](https://www.productplan.com/glossary/cost-of-delay/).
- **Kano Model** helps identify which features will drive satisfaction vs. which are table stakes. [Read more here](https://www.productplan.com/glossary/kano-model/).
- **Value vs. effort** helps prioritise features into a 2x2 grid based on their value to the user and the effort required to deliver them. [Read more here](https://www.geeksforgeeks.org/software-engineering/what-is-value-vs-effort-matrix-and-how-does-it-work-in-product-management/).
- **Opportunity scoring** gets customers to rate both a feature's importance and their satisfaction and an opportunity algorithm calculates the score on a five or ten point scale. [Read more here](https://www.productplan.com/glossary/opportunity-scoring/).

PMs should use multiple frameworks as appropriate and validate assumptions with user research and data.

> For outcome-based planning and aligning roadmap to goals, see [Outcome-based roadmaps and OKRs](/docs/SDLC/planning-and-design#outcome-based-roadmaps-and-okrs) in Planning and Design.

<PageBreak />

### Agile User Stories - INVEST

The INVEST criteria spell out how to create Agile user stories that deliver valuable working software early and often. They show you how to specify your requirements in ways that follow the principles and values of Agile.

- **I**ndependent - The story is not dependent on other stories getting done.
- **N**egotiable - The story prompts but doesn't prescribe a solution.
- **V**aluable - The story makes clear the benefit it delivers the users.
- **E**stimable - The story gives the development team enough detail to estimate the size of the story.
- **S**mall - The story is the smallest piece of work that will deliver useful software.
- **T**estable - The story is clear enough that you can assess if the story is done.

> For more reading, see [this post](https://www.boost.co.nz/blog/2021/10/invest-criteria).

<PageBreak />

## Suggested PM Tool Stack

| Concept/Area                                   | Essential Tools/Technologies                                   | Why It Matters for PMs                                                       |
| ---------------------------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Operating System                               | [Linux](https://www.linux.org/) (Ubuntu)                                                 | Most workloads run on Linux; basic fluency is critical.                      |
| Version Control                                | [Git](https://git-scm.com/) ([GitHub](https://github.com/))                                           | Foundation for code, infrastructure, and config changes.                     |
| Scripting/Automation                           | [Bash](https://www.gnu.org/software/bash/), [Python](https://www.python.org/)                                           | Enables automation, rapid prototyping, and debugging.                        |
| Infrastructure as Code (IaC)      | [Terraform](https://www.terraform.io/)                                                      | Standard for provisioning cloud infrastructure.                              |
| Configuration Management                       | [Ansible](https://www.ansible.com/)                                                        | Ensures consistent, repeatable server configuration.                         |
| Containers                                     | [Docker](https://www.docker.com/)                                                     | Standard for packaging and deploying applications.                           |
| Container Orchestration                        | [Kubernetes](https://kubernetes.io/)                                                     | Industry standard for scaling and managing containers.                       |
| Package Management                             | [Helm](https://helm.sh/), [Kustomize](https://kustomize.io/)                                                | Simplifies Kubernetes app deployment and customization.                      |
| Continuous Integration & Deployment (CI/CD) | [GitHub Actions](https://github.com/features/actions), [Azure DevOps](https://azure.microsoft.com/en-us/products/devops), [Argo CD](https://argo-cd.readthedocs.io/en/stable/)                  | Automates build, test, and deployment pipelines.                             |
| Meeting Recording & Transcription               | [Otter](https://otter.ai/) and [Willow Voice](https://www.willow.ai/)                    | Allows fast transcription of meetings and reviews of meeting transcripts              |
| Observability & Monitoring                     | [Prometheus](https://prometheus.io/), [Grafana](https://grafana.com/), [ELK/EFK](https://www.elastic.co/), [OpenTelemetry](https://opentelemetry.io/)                    | Enables proactive monitoring, troubleshooting, and improvement.              |
| Cloud Platforms                                | [AWS](https://aws.amazon.com/), [Azure](https://azure.microsoft.com/), [GCP](https://cloud.google.com/) (pick one to master) | Deep expertise in one cloud is more valuable than shallow knowledge of many. |
| Security / DevSecOps                       | [Snyk](https://snyk.io/), [Trivy](https://trivy.dev/), [Checkov](https://www.checkov.io/), [OPA](https://www.openpolicyagent.org/)                                  | Integrates security into the pipeline ("shift left").                        |


