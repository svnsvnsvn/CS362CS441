---
title: "Processes, Threads, and Multithreading"
lecturer: "Dr. Saeed Al Haj"
date: "2025-09-04"
duration: "15 min read"
topics: ["Processes", "Threads", "Multithreading", "Synchronization", "C++"]
course: "os"
week: 2-3
chapter: "Processes, Threads, and Multithreading"
---

<div class="overview-section">

## What We Covered

This unit covers the fundamental concepts of processes and threads, how they differ, and why multithreading is crucial for modern operating systems. We'll explore synchronization problems like race conditions and deadlocks, and learn practical C++ multithreading techniques.

</div>

<div class="objectives-section">

## What I Should Know After This

- Distinguish between processes and threads
- Explain why multithreading improves performance
- Identify and solve common synchronization problems
- Implement basic multithreaded programs in C++
- Use synchronization primitives correctly

</div>

## Key Concepts

### Process vs Thread - The Big Picture

<div class="question-block">
<div class="question-label">Core Difference</div>
<div class="question-text">What's the real difference between a process and a thread?</div>

<div class="answer-content">

**Process**: An independent program in execution. Has its own memory space, resources, and at least one thread. Managed by the OS via a Process Control Block (PCB).

**Thread**: The smallest unit of execution within a process. Multiple threads in a process share memory and resources.

**Key insight**: Processes are isolated; threads are not. This makes threads lighter but also more dangerous.

</div>
</div>

### Memory and Isolation

**How does memory isolation actually work?**

**Processes** are completely isolated from each other. Each process has its own memory space, so if one process crashes, others remain unaffected.

**Threads** within the same process share memory and resources. This makes them lighter but also more dangerous - one bad thread can corrupt data for all threads.

**The comparison that matters:**

| Feature | Process | Thread |
|---------|---------|--------|
| Memory Space | Isolated | Shared within process |
| Crash Impact | Other processes unaffected | Can affect all threads in process |
| Overhead | High (context switch expensive) | Low (context switch cheap) |
| Communication | IPC (pipes, sockets, etc.) | Direct (shared memory) |
| Creation Cost | Expensive | Cheap |
| Security | High isolation | Shared vulnerabilities |

### Context Switching Cost

<div class="question-block">
<div class="question-label">Performance Impact</div>
<div class="question-text">Why is process switching more expensive than thread switching?</div>

<div class="answer-content">

**Process switching** is expensive because the OS must save and restore memory, registers, and other resources.

**Thread switching** is cheap because threads share memory - the OS only needs to save/restore registers.

**Communication methods:**
- **Processes** communicate through Inter-Process Communication (IPC) mechanisms like pipes, sockets, or shared memory
- **Threads** communicate directly through shared memory within their process

</div>
</div>

## Why Multithreading?

<div class="question-block">
<div class="question-label">Benefits</div>
<div class="question-text">Why should I care about multithreading?</div>

<div class="answer-content">

Multithreading provides several benefits:

- **Performance**: Utilizes multiple CPU cores simultaneously
- **Responsiveness**: UI remains responsive while background tasks run
- **Parallelism**: Different tasks can execute concurrently

> Warning: **Multithreading is hard!** Bugs like race conditions and deadlocks are common and difficult to debug.

</div>
</div>

## Common Synchronization Problems

### Race Condition

<div class="question-block">
<div class="question-label">Problem</div>
<div class="question-text">What happens when threads access shared data simultaneously?</div>

<div class="answer-content">

Occurs when two or more threads access shared data and the outcome depends on timing.

**Example**: Two threads incrementing a shared counter without synchronization. The final value becomes unpredictable.

**Why this is bad**: You can't predict what will happen - sometimes it works, sometimes it doesn't.

</div>
</div>

### Deadlock

<div class="question-block">
<div class="question-label">Problem</div>
<div class="question-text">What if threads wait for each other forever?</div>

<div class="answer-content">

Two or more threads wait forever for each other to release resources.

**Example**: Thread A holds Lock 1 and waits for Lock 2, while Thread B holds Lock 2 and waits for Lock 1. Both threads wait forever.

**Real-world analogy**: Two people trying to pass through a narrow doorway, each waiting for the other to go first.

</div>
</div>

### Starvation

<div class="question-block">
<div class="question-label">Problem</div>
<div class="question-text">What if a thread never gets to run?</div>

<div class="answer-content">

A thread never gets CPU time or resources because other threads monopolize them.

**Example**: High-priority threads keep running, leaving low-priority threads waiting indefinitely.

</div>
</div>

## Synchronization Primitives

<div class="question-block">
<div class="question-label">Solution Tools</div>
<div class="question-text">How do we prevent these threading problems?</div>

<div class="answer-content">

### Mutex (Mutual Exclusion)

Prevents multiple threads from accessing shared data simultaneously. Only one thread can hold a mutex at a time.

### Semaphore

An integer variable accessed with atomic operations. Used for signaling between threads and counting resources.

### Condition Variable

Allows threads to wait for certain conditions to become true, then wake up when signaled.

### Atomic Variables

Hardware-guaranteed atomic operations for simple data types. Useful for lock-free programming with counters and flags.

</div>
</div>

## C++ Multithreading

<div class="question-block">
<div class="question-label">Implementation</div>
<div class="question-text">How do I actually write multithreaded code in C++?</div>

<div class="answer-content">

C++11 introduced the `<thread>` library for portable multithreading.

### Creating Threads

```cpp
#include <thread>

void myFunction() {
    // Thread work here
}

int main() {
    std::thread t1(myFunction);  // Create and start thread
    t1.join();                   // Wait for thread to finish
    return 0;
}
```

### Protecting Shared Data

```cpp
#include <mutex>

std::mutex mtx;
int shared_data = 0;

void increment() {
    std::lock_guard<std::mutex> lock(mtx);
    ++shared_data;  // Protected by mutex
}
```

### Condition Variables

```cpp
#include <condition_variable>

std::mutex mtx;
std::condition_variable cv;
bool ready = false;

void worker() {
    std::unique_lock<std::mutex> lock(mtx);
    cv.wait(lock, []{ return ready; });
    // Do work when condition is met
}
```

</div>
</div>

## Thread Lifecycle

<div class="question-block">
<div class="question-label">Technical Detail</div>
<div class="question-text">What states can a thread be in?</div>

<div class="answer-content">

**New**: Thread object is created but not yet running.

**Runnable**: Thread is ready to run and waiting for CPU time.

**Waiting/Blocked**: Thread is waiting for a resource or condition.

**Terminated**: Thread has finished execution.

</div>
</div>

## OS Scheduling

**Preemptive Scheduling**: OS interrupts threads to give CPU time to others.

**Cooperative Scheduling**: Threads voluntarily yield control to others.

## Best Practices

- **Never access shared data without proper synchronization**
- **Always join threads before main exits** (or use detached threads carefully)
- **Avoid holding locks for long periods** to prevent blocking other threads
- **Use thread-safe data structures** when available
- **Lock mutexes in consistent order** to avoid deadlocks

## Practical Applications

### User Mode vs Kernel Mode

<div class="question-block">
<div class="question-label">Real Example</div>
<div class="question-text">What does this look like in practice?</div>

<div class="answer-content">

**User mode**: Where my programs normally run
- Can't access hardware directly
- Can't modify kernel memory
- Protected from other programs

**Kernel mode**: Where the OS runs
- Can access all hardware
- Can modify any memory
- Has all privileges

**Why this separation exists:**
- **Security**: Prevents user programs from interfering with each other
- **Stability**: Buggy user programs can't crash the entire system
- **Control**: OS manages resources fairly and efficiently

</div>
</div>

</div>

<div class="summary-section">

## What I'm Still Confused About

<div class="question-block">
<div class="question-label">My Confusion</div>
<div class="question-text">What should I ask about next time?</div>

<div class="answer-content">

**Threading mechanics I want to understand better:**
- How exactly does the CPU switch between threads? What gets saved/restored?
- Why are race conditions sometimes hard to reproduce?
- How do mutexes actually work at the hardware level?

**Practical programming questions:**
- When should I use threads vs processes in a real application?
- How do I debug multithreaded programs effectively?
- What tools exist to detect race conditions and deadlocks?

**Design decisions:**
- How do different programming languages handle threading differently?
- Why did C++ choose these particular threading primitives?

</div>
</div>

</div>

<div class="summary-section">

## What I Actually Learned

<div class="question-block">
<div class="question-label">My Takeaways</div>
<div class="question-text">What can I explain to someone else now?</div>

<div class="answer-content">

**I can now explain:**
- The difference between processes and threads and when to use each
- Why multithreading is both powerful and dangerous
- Common threading problems (race conditions, deadlocks, starvation)
- Basic synchronization tools (mutexes, semaphores, condition variables)
- How to create and manage threads in C++

**I understand the big picture:**
- Threads share memory space but have separate execution contexts
- Synchronization is essential when threads access shared data
- The OS scheduler decides when threads run
- Threading bugs are often non-deterministic and hard to debug

**I still need to work on:**
- Writing more complex multithreaded programs
- Understanding performance implications of different synchronization choices
- Learning advanced threading patterns and best practices

</div>
</div>

</div>

<div class="further-reading">

## What I Should Review

**Hands-on practice:**
- Write a simple producer-consumer program using mutexes and condition variables
- Try to create a race condition intentionally, then fix it
- Experiment with thread pools and task queues

**Deeper reading:**
- Look into lock-free programming and atomic operations
- Research different threading models (1:1, N:1, M:N)
- Study how different operating systems implement threading

**Tools to explore:**
- Thread sanitizer for detecting race conditions
- Profiling tools for measuring threading performance
- Debuggers that can handle multithreaded programs

</div>
