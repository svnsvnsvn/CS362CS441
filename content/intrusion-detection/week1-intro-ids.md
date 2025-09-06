---
title: "Introduction to Intrusion Detection"
lecturer: "Dr. Mini Zeng"
date: "2025-08-25"
duration: "8 min read"
topics: ["IDS vs IPS", "Detection Approaches", "Alert Lifecycle"]
course: "ids"
week: 1
chapter: "Intro"
---

## Course Orientation

**Focus**: Network-based and host-based intrusion detection fundamentals, analysis workflow, and thinking in terms of attacker techniques vs defender visibility.

## Key Questions

1. What distinguishes IDS from IPS?
2. What are signature, anomaly, and hybrid detection approaches?
3. How does alert triage fit into incident response?

## Core Concepts

### IDS vs IPS
- **IDS (Intrusion Detection System)**: Passive. Monitors traffic/events and raises alerts.
- **IPS (Intrusion Prevention System)**: Inline. Can block or modify traffic in real time.
- Placement affects visibility vs performance overhead.

### Detection Approaches
| Approach | Strength | Weakness | Example |
|----------|----------|----------|---------|
| Signature | Precise on known threats | Misses novel behaviors | Snort rules, YARA |
| Anomaly | Finds unknown patterns | Higher false positives | Baseline deviation |
| Heuristic/Hybrid | Balanced coverage | Complexity | ML-assisted + rules |

### Alert Lifecycle (Simplified)
1. Collection (pcap, logs, NetFlow)
2. Normalization & parsing
3. Detection engine evaluation
4. Alert generation & enrichment
5. Triage (priority, context)
6. Escalation or closure

### Early Mental Model
"Detection" = pattern (rule/behavior) + context (protocol, asset value) + quality (noise vs signal)

## Practice Thought Exercise
Given a rule that alerts on `TCP port 4444 outbound`, what questions would you ask before escalating?
- Which host(s)? Baseline behavior?
- Was traffic continuous or a single burst?
- Is 4444 tied to known RAT families in current campaigns?

## Next Up
Packet structure review + building first simple Snort rule.
