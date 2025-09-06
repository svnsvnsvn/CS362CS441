---
title: "Introduction to Operating Systems"
lecturer: "Dr. Saeed Al Haj"
date: "2025-08-19"
duration: "10 min read"
topics: ["OS Definition", "System Calls", "User vs Kernel Mode", "Real Examples"]
course: "os"
week: 1
chapter: "Ch1"
---

<div class="overview-section">

## What We Covered
Dr. Al Haj explained what an OS actually is and why we need it. Main question: Is the shell part of the OS? (Spoiler: No, it's just a program!)

</div>

<div class="objectives-section">

## What I Should Know After This
- Actually understand what an OS does (not just memorize definitions)
- Know the difference between user mode and kernel mode
- Understand why we need system calls
- Be able to explain why hardware/software separation matters

</div>

## Key Concepts

### OS as an Extended Machine

<div class="question-block">
<div class="question-label">My Confusion</div>
<div class="question-text">Shell: Is it part of the OS?</div>

<div class="answer-content">

**Answer:** NO! It's just a program.

**Why this matters:** The OS itself is NOT the interface you see. The OS is the underlying system that:
- Hides messy hardware details
- Makes hardware "user-friendly" 
- Provides abstractions (like files instead of disk sectors)

**Real example:** When I type `ls`, I'm not talking to the OS directly. The shell program talks to the OS for me through system calls.

**Mental model:** 
- **Abstraction:** Simple interface hiding complex reality
- **Implementation:** The messy details underneath

</div>
</div>

### Resource Manager Concept

<div class="question-block">
<div class="question-label">Key Insight</div>
<div class="question-text">Why do we need an OS to manage resources?</div>

<div class="answer-content">

**From my notes:** A computer has scarce resources (CPU, memory, devices, networks)

**The problem:** Multiple programs want to use the same stuff at the same time

**OS solution:**
- **Multiplexing:** Share resources by giving each program turns
- **Example:** CPU scheduler runs P1, then P2, then P3 (time-sharing)
- **Example:** Memory manager gives each program its own space

**Why this clicked for me:** Like having one bathroom in a house with multiple people - you need rules and a system!

</div>
</div>

## System Calls - The Real Interface

<div class="question-block">
<div class="question-label">Technical Detail</div>
<div class="question-text">How does a system call actually work?</div>

<div class="answer-content">

**From my notes on the process:**

1. **Program calls library function** (like `read()`)
2. **Library sets up registers** with parameters
3. **Trap instruction** switches to kernel mode  
4. **CPU switches** from user mode to kernel mode
5. **Kernel looks up syscall number** in a table, jumps to handler
6. **Handler executes** the privileged operation
7. **Return result** and switch back to user mode

**What I understand now:** This is like a controlled entry point. User programs can't just do whatever they want - they have to "ask permission" through this formal process.

**Real example:** When I run `cat file.txt`, the cat program uses the `read()` system call to actually access the file.

</div>
</div>

## Process Management Basics

<div class="question-block">
<div class="question-label">System Calls</div>
<div class="question-text">What are the main process-related system calls?</div>

<div class="answer-content">

**From lecture notes:**

**Process Management:**
- `fork()` → Create child process (copy of parent)
- `execve()` → Replace process image with new program  
- `waitpid()` → Wait for child to finish
- `exit()` → Terminate process

**File Management:**
- `open()`, `close()`, `read()`, `write()`, `lseek()`, `stat()`
- Every open file has a **file descriptor** (fd)

**Directory & File System:**
- `mkdir()`, `rmdir()`, `link()`, `unlink()`, `mount()`, `umount()`

**What I learned:** These are the building blocks. Every program I've ever run uses these basic operations under the hood.

</div>
</div>

## Practical Applications

<div class="application-section">

### User Mode vs Kernel Mode

<div class="question-block">
<div class="question-label">Real World</div>
<div class="question-text">What does this look like in practice?</div>

<div class="answer-content">

**User mode:** Where my programs run normally
- Can't access hardware directly
- Can't modify critical system data
- Protected from other programs

**Kernel mode:** Where OS runs
- Can access all hardware
- Can modify any memory
- Has all privileges

**Why this separation exists:**
- **Controller vs. Driver analogy:** OS is like a device controller managing hardware, user programs are like device drivers that follow rules

**What happens if user program tries to do kernel stuff:** 
- Hardware generates an exception
- Program gets killed (segmentation fault, etc.)

</div>
</div>

</div>

## What I'm Still Confused About

<div class="problem-section">

### Questions for Next Class

<div class="question-block">
<div class="question-label">Need Clarification</div>
<div class="question-text">What should I ask about next time?</div>

<div class="answer-content">

**Things I want to understand better:**
- How exactly does the CPU "know" it's in kernel mode vs user mode?
- What happens during context switching between processes?
- How does virtual memory actually work in practice?

**Connections I want to make:**
- How does this relate to programming? When I write C code, how does it interact with the OS?
- What system calls does a simple "Hello World" program actually make?

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
- OS is NOT the shell or the GUI - it's the invisible layer managing everything
- User programs can't directly control hardware - they must ask the OS
- System calls are the formal way to request OS services
- There's a clear separation between what user programs can/can't do

**I still need to work on:**
- Understanding the detailed mechanics of how this all works
- Connecting this theory to actual programming examples
- Seeing how different OS concepts work together

</div>
</div>

</div>

<div class="further-reading">

## What I Should Review
- Look up examples of system call traces (strace on Linux)
- Try writing a simple C program and see what system calls it makes
- Read about the history of why these protections were needed

</div>
