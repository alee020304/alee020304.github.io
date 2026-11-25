---
title: ADiNA
subtitle: An AI digital nurse for seniors with mild cognitive impairment
starred: true
date: 2026-01-31
when: Aug 2025 – Jan 2026
role: Research Assistant
where: Shared Reality Lab, McGill
tools: OpenAI Realtime API, RAG on Weaviate, DeepEval, GPT-4o-mini
numbered: false
---

## The question

ADiNA is a voice agent meant to talk with seniors in long-term care. Before it reached anyone, we needed a way to tell whether one version spoke to them better than another.

## What I built

A synthetic resident that behaves the way memory loss can: word-finding pauses, repeated questions, sudden shifts in mood. Around it, an LLM-as-a-judge evaluation with five custom metrics (validation, engagement, retrieval relevance, trigger avoidance and memory consistency), run across five care scenarios, four agent versions and 65 interactions.

## What I found

The most factual version was the least engaging when a resident was distressed, yet the best in a medical emergency. A single line telling the agent who its users were did as well as a full Validation Therapy prompt. The judge needed checking too: it penalised the agent for avoiding a topic that never came up.

## What changed it

Three visits to a care home, to meet caregivers and residents. Residents were uneasy when an assistant knew things they didn't remember telling it, so I proposed keeping conversation and clinical records in separate memories.

## What it taught me

**Pills, not vitamins.** A line I took from Ivan Zhao.

Most of the development effort went into adding features, cutting latency and supporting more languages. What helped me was narrowing to the one thing the agent had to do well, the conversation itself, and scoping from there what would help.

![System overview](/images/adina/overview.jpg)

![Evaluation detail](/images/adina/detail.jpg)
