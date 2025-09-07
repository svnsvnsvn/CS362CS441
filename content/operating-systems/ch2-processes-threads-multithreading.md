---
title: "Processes, Threads, and Synchronization"
lecturer: "Dr. Saeed Al Haj"
date: "2025-09-04"
duration: "18 min read"
topics: ["Process Model", "Threading", "Synchronization", "Scheduling", "Deadlocks"]
course: "os"
week: 2–4
chapter: "Ch2"
---

<div class="overview-section">

## What We Covered

This unit explores the fundamental execution abstractions in operating systems: processes and threads. We examine how the OS manages these entities, the critical synchronization problems that arise in concurrent systems, and the mechanisms used to solve them. The chapter connects theoretical concepts to practical implementation challenges.

</div>

<div class="objectives-section">

## What I Should Know After This

- Understand the process model and Process Control Block (PCB)
- Explain process states and transitions in detail
- Distinguish between user-level and kernel-level threads
- Identify and solve synchronization problems (race conditions, deadlocks)
- Apply synchronization primitives (mutexes, semaphores, monitors)
- Analyze scheduling algorithms and their performance characteristics

</div>

## Process Fundamentals

### The Process Model

<div class="question-block">
<div class="question-label">Core Concept</div>
<div class="question-text">What exactly is a process and how does the OS track it?</div>

<div class="answer-content">

**A process is a program in execution** - it includes the program code, current activity (program counter, registers), stack, heap, and data sections.

**Process Control Block (PCB)** contains:
- Process ID (PID) and parent process ID
- Process state (new, ready, running, waiting, terminated)
- CPU registers and program counter
- Memory management information (page tables, memory limits)
- Accounting information (CPU time used, time limits)
- I/O status (list of open files, allocated devices)

**Key insight**: The PCB is the OS's complete representation of a process - when the OS switches between processes, it's really switching between PCBs.

</div>
</div>

### Process States and Transitions

<div class="question-block">
<div class="question-label">State Management</div>
<div class="question-text">How do processes move between different states?</div>

<div class="answer-content">

**Five-State Model:**
- **New**: Process being created
- **Ready**: Waiting to be assigned to processor
- **Running**: Currently executing on CPU
- **Waiting**: Blocked for I/O or event completion
- **Terminated**: Process has finished execution

**Critical Transitions:**
- **Ready → Running**: Scheduler dispatches process
- **Running → Ready**: Time slice expired (preemption)
- **Running → Waiting**: Process requests I/O or resource
- **Waiting → Ready**: I/O completion or resource becomes available

**Key insight**: The OS scheduler controls these transitions to ensure fair resource allocation and system responsiveness.

</div>
</div>

### Process Creation and Termination

<div class="question-block">
<div class="question-label">Process Lifecycle</div>
<div class="question-text">How are processes created and destroyed?</div>

<div class="answer-content">

**Process Creation via `fork()`:**
- Creates exact copy of parent process
- Returns 0 to child, child PID to parent
- Child typically calls `exec()` to load new program

**Process Termination:**
- Normal termination via `exit()` system call
- Parent collects exit status via `wait()`
- **Zombie process**: Terminated but parent hasn't collected status
- **Orphan process**: Parent terminates before child

**Key insight**: Process hierarchies form trees with init as root - when parents die, children are adopted by init.

</div>
</div>

## Threading Fundamentals

### Thread Models

<div class="question-block">
<div class="question-label">Implementation Approaches</div>
<div class="question-text">How are threads implemented and what are the tradeoffs?</div>

<div class="answer-content">

**User-Level Threads:**
- Thread library manages threads in user space
- Kernel sees only single-threaded process
- **Pros**: Fast context switching, custom scheduling
- **Cons**: Blocking system call blocks entire process

**Kernel-Level Threads:**
- Kernel directly manages threads
- Each thread has its own kernel data structures
- **Pros**: True parallelism, non-blocking system calls
- **Cons**: Higher overhead for thread operations

**Hybrid Models:**
- **Many-to-One**: Multiple user threads → one kernel thread
- **One-to-One**: Each user thread → separate kernel thread  
- **Many-to-Many**: Multiple user threads → multiple kernel threads

**Key insight**: Threading model choice affects performance, scalability, and programming complexity.

</div>
</div>

## Synchronization Problems

### Race Conditions

<div class="question-block">
<div class="question-label">Concurrency Issue</div>
<div class="question-text">Why do concurrent programs produce inconsistent results?</div>

<div class="answer-content">

**Race condition occurs when:**
- Multiple processes/threads access shared data
- At least one performs write operation
- Timing of access affects the result

**Classic Example - Bank Account:**
```
Process A: balance = balance + 100
Process B: balance = balance - 50
```

**Without synchronization:**
- Both read balance = 1000
- A computes 1100, B computes 950
- Final result depends on who writes last

**Key insight**: Race conditions are nondeterministic - programs may work most of the time but fail unpredictably.

</div>
</div>

### Critical Sections

<div class="question-block">
<div class="question-label">Solution Framework</div>
<div class="question-text">How do we protect shared resources?</div>

<div class="answer-content">

**Critical Section**: Code segment that accesses shared variables and must not be executed concurrently.

**Requirements for Solution:**
1. **Mutual Exclusion**: At most one process in critical section
2. **Progress**: If no process in critical section, waiting processes can enter
3. **Bounded Waiting**: Limit on how long process waits to enter

**Peterson's Algorithm** (software solution):
- Uses shared variables to coordinate entry
- Satisfies all three requirements for two processes
- Demonstrates that software-only solutions are possible

**Key insight**: Critical section protection is the foundation for all synchronization mechanisms.

</div>
</div>

## Synchronization Primitives

### Semaphores

<div class="question-block">
<div class="question-label">Counting Mechanism</div>
<div class="question-text">How do semaphores coordinate access to resources?</div>

<div class="answer-content">

**Semaphore**: Integer variable accessed through atomic `wait()` and `signal()` operations.

**Binary Semaphore (Mutex):**
- Value 0 or 1
- Provides mutual exclusion
- `wait()` decrements, `signal()` increments

**Counting Semaphore:**
- Value represents available resource count
- Coordinates access to finite resource pool

**Producer-Consumer Problem:**
- Bounded buffer between producer and consumer
- Requires semaphores for: empty slots, full slots, mutual exclusion
- Demonstrates coordination vs. mutual exclusion

**Key insight**: Semaphores provide both mutual exclusion and coordination between processes.

</div>
</div>

### Monitors

<div class="question-block">
<div class="question-label">High-Level Construct</div>
<div class="question-text">How do monitors simplify synchronization programming?</div>

<div class="answer-content">

**Monitor**: High-level synchronization construct with:
- Shared data
- Procedures that operate on data
- Synchronization code
- Initialization code

**Condition Variables:**
- `wait()`: Block until condition becomes true
- `signal()`: Wake up one waiting process
- `broadcast()`: Wake up all waiting processes

**Advantages over Semaphores:**
- Encapsulation of shared data
- Automatic mutual exclusion
- Structured programming approach

**Key insight**: Monitors raise the abstraction level, making concurrent programs easier to write and verify.

</div>
</div>

## Deadlock

### Deadlock Conditions

<div class="question-block">
<div class="question-label">System Deadlock</div>
<div class="question-text">When do systems become completely stuck?</div>

<div class="answer-content">

**Deadlock**: Set of processes where each holds resources needed by others.

**Four Necessary Conditions:**
1. **Mutual Exclusion**: Resources cannot be shared
2. **Hold and Wait**: Process holds resources while waiting for others
3. **No Preemption**: Resources cannot be forcibly removed
4. **Circular Wait**: Circular chain of resource dependencies

**Prevention Strategies:**
- **Eliminate Hold and Wait**: Acquire all resources atomically
- **Allow Preemption**: Force release of resources
- **Impose Ordering**: Number resources, acquire in ascending order

**Banker's Algorithm** (Avoidance):
- Requires advance knowledge of maximum resource needs
- Grants requests only if system remains in safe state

**Key insight**: Deadlock prevention is conservative but safe; avoidance is more flexible but requires global knowledge.

</div>
</div>

## CPU Scheduling

### Scheduling Objectives

<div class="question-block">
<div class="question-label">Performance Metrics</div>
<div class="question-text">What makes a good scheduling algorithm?</div>

<div class="answer-content">

**Key Metrics:**
- **CPU Utilization**: Percentage of time CPU is busy
- **Throughput**: Processes completed per time unit
- **Turnaround Time**: Time from submission to completion
- **Waiting Time**: Time spent in ready queue
- **Response Time**: Time from request to first response

**Algorithm Comparison:**
- **FCFS**: Simple but poor average waiting time
- **SJF**: Optimal average waiting time but requires prediction
- **Priority**: Flexible but can cause starvation
- **Round Robin**: Fair response time, performance depends on time quantum

**Real-Time Scheduling:**
- **Hard Real-Time**: Missing deadline is system failure
- **Soft Real-Time**: Occasional missed deadlines acceptable
- **Rate Monotonic**: Static priority based on period
- **Earliest Deadline First**: Dynamic priority based on deadlines

**Key insight**: No single algorithm is optimal for all workloads - choice depends on system goals and workload characteristics.

</div>
</div>

## Outstanding Questions

### Areas for Further Investigation

<div class="question-block">
<div class="question-label">Advanced Topics</div>
<div class="question-text">What mechanisms require deeper understanding?</div>

<div class="answer-content">

**Implementation Details:**
- How does hardware support for atomic operations work?
- What are the performance costs of different synchronization primitives?
- How do multicore systems affect synchronization design?

**System Design Questions:**
- When should applications use processes vs. threads?
- How do different threading models perform under various workloads?
- What are the scalability limits of different synchronization approaches?

</div>
</div>

## Key Concepts Mastered

<div class="question-block">
<div class="question-label">Fundamental Understanding</div>
<div class="question-text">What core principles are now established?</div>

<div class="answer-content">

**Process Management:**
- Processes provide isolated execution environments with complete OS tracking via PCBs
- Process state transitions are controlled by the scheduler and I/O completion
- Process creation and termination follow specific protocols to maintain system integrity

**Threading and Concurrency:**
- Threads enable parallelism within processes but require careful synchronization
- Different threading models offer tradeoffs between performance and functionality
- Race conditions arise from unsynchronized access to shared data

**Synchronization Mechanisms:**
- Critical sections must be protected to ensure program correctness
- Semaphores and monitors provide different abstraction levels for coordination
- Deadlock requires specific conditions and can be prevented or avoided

**Scheduling:**
- CPU scheduling algorithms balance competing performance objectives
- Real-time systems require guarantees that best-effort systems cannot provide

</div>
</div>
