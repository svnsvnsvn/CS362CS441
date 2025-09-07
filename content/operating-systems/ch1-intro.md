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

This foundational unit introduces operating systems concepts, focusing on what an OS actually does and why we need it. We explore the relationship between hardware and software, and examine how system calls provide controlled access to system resources.

</div>

<div class="objectives-section">

## What I Should Know After This

- Understand the core functions of an operating system
- Distinguish between user mode and kernel mode execution
- Explain the role and importance of system calls
- Analyze the hardware/software abstraction layer

</div>

## Key Concepts

### OS as an Extended Machine

<div class="question-block">
<div class="question-label">Core Concept</div>
<div class="question-text">What is the operating system's primary role?</div>

<div class="answer-content">

**The OS provides abstraction**: It hides the complexity of hardware details behind a simpler, more manageable interface.

**Key functions:**

**Example**: When you run `ls`, you're not directly accessing disk sectors. The shell program uses system calls to request the OS to perform the actual hardware operations.

**Important distinction**: The shell is NOT part of the OS - it's just a program that communicates with the OS through system calls.

  </div>
</div>

### Visual: Operating System Architecture

<div style="margin: 1.5rem 0; text-align: center;">
  <img src="/ch1-intro-architecture-diagram.png" alt="Hand-drawn diagram showing layered operating system architecture. From top to bottom: User Space containing application icons and C Library box, System Call Interface as a bridge layer, Kernel Space containing the main kernel box, and Hardware Platform at the bottom with CPU, memory, and device icons. Pink/purple lines connect the layers showing data flow." style="max-width: 100%; width: min(600px, 90vw); height: auto; border: 1px solid #f0e6ed; border-radius: 12px; box-shadow: 0 4px 12px rgba(224, 165, 199, 0.15); background: #fdfcfd; padding: 1rem;" />
</div>

<details style="margin: 1rem 0; padding: 1rem; background: #faf7f9; border: 1px solid #f0e6ed; border-radius: 8px;">
<summary style="cursor: pointer; font-weight: 600; color: #4a4a5a; padding: 0.5rem 0; user-select: none;"><strong>Image Description</strong></summary>
<div style="margin-top: 1rem; line-height: 1.6;">
<p><strong>This hand-drawn diagram illustrates the hierarchical structure of an operating system. The diagram shows four main layers arranged vertically:</strong></p>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li style="margin: 0.5rem 0;"><strong>Top layer (User Space):</strong> Contains colorful application icons (browser, development tools) and a C Library rectangular box</li>
<li style="margin: 0.5rem 0;"><strong>Second layer (System Call Interface):</strong> A horizontal rectangular barrier highlighted in pink, representing the critical boundary between user and kernel space</li>
<li style="margin: 0.5rem 0;"><strong>Third layer (Kernel Space):</strong> Contains the main kernel box and architecture-dependent code, drawn with pink outlines</li>
<li style="margin: 0.5rem 0;"><strong>Bottom layer (Hardware Platform):</strong> Shows physical components including CPU chip, memory modules, and storage devices</li>
</ul>
<p><strong>Arrows and connecting lines in pink show the flow of system calls and data between layers. The entire diagram uses a professional color scheme with pink accents on a white background.</strong></p>
</div>
</details>

*This diagram summarizes the boundaries and components of a modern OS:*
- **User Space**: Applications and libraries
- **System Call Interface**: Bridge to kernel
- **Kernel Space**: Resource management, security, hardware access
- **Hardware Platform**: CPU, memory, devices


### OS as a Resource Manager

<div class="question-block">
<div class="question-label">Core Concept</div>
<div class="question-text">Why do we need an OS to manage resources?</div>

<div class="answer-content">

**The challenge**: Computer systems have limited resources (CPU, memory, devices, networks) that multiple programs need to access simultaneously.

**OS solution - Resource multiplexing or the process of allowing multiple applications and processes to share a singular resource at the same time.**
- **Time-sharing**: CPU scheduler alternates between processes (P1 → P2 → P3)
- **Space-sharing**: Memory manager allocates separate memory regions to each process
- **Controlled access**: Ensures fair resource distribution and prevents conflicts

**Key insight**: Without an OS managing these resources, programs would conflict and the system would be chaotic and unreliable.

</div>
</div>

### Bird’s-Eye View Checklist

<div class="question-block">
<div class="question-label">Interface Definitions</div>
<div class="question-text">What are the key interfaces and common misconceptions?</div>

<div class="answer-content">

- **System call interface**: The gateway for user programs to request kernel services
    - **What it IS**: Low-level ABI (fork, read, write, mmap) with specific calling conventions
    - **What it's NOT**: The C library functions you call directly in code
    
- **C library (libc)**: Wrapper functions around system calls + additional utilities
    - **What it IS**: User-space library providing `printf()`, `malloc()`, `fopen()` 
    - **What it's NOT**: Part of the kernel or OS itself
    
- **Shell/CLI**: Command interpreter program that uses system calls
    - **What it IS**: User program (bash, zsh) that parses commands and launches processes
    - **What it's NOT**: Part of the operating system kernel
    
- **GUI**: Graphical interface layer built on top of lower interfaces
    - **What it IS**: User-friendly visual abstraction (windows, menus, mouse)
    - **What it's NOT**: A replacement for system calls - still uses them underneath

**Key insight**: These form layers of abstraction - each builds on the lower levels but remains separate from the actual OS kernel.

</div>
</div>

<div class="question-block">
<div class="question-label">Responsibilities Explained</div>
<div class="question-text">What are the OS's core management responsibilities?</div>

<div class="answer-content">

- **processes/threads**: A process is an abstraction of a program in execution, including the current values of the program counter, registers, and variables. It has a program, input, output, and a state. In contrast, a program is something that may be stored on disk, not doing anything. The operating system manages processes, allocating resources, enabling communication, and tracking their state to allow multiple applications to run simultaneously. CPU switches rapidly between processes. A thread is the smallest unit of execution within a process.
    - **OS role**: Creates/destroys processes, schedules CPU time, handles context switching, manages process communication (IPC)
- **memory**: Virtual memory abstraction gives each process its own address space, hiding physical memory limitations and enabling safe sharing
    - **OS role**: Allocates/deallocates memory pages, handles virtual-to-physical translation, manages swapping, prevents unauthorized access
- **I/O**: Device abstraction presents uniform interface to diverse hardware (disks, networks, keyboards, displays)
    - **OS role**: Device driver management, interrupt handling, buffering/caching, enforcing exclusive access to shared devices
- **security**: Protection mechanisms ensure isolation between processes and controlled access to system resources
    - **OS role**: User authentication, permission checking, access control lists, sandboxing, audit logging

**Key insight**: The OS transforms complex, low-level hardware management into simple, safe abstractions that applications can use without knowing implementation details.

</div>
</div>

### OS Structures

<div class="question-block">
<div class="question-label">Kernel Types</div>
<div class="question-text">Kernel organization patterns</div>

<div class="answer-content">

- **Monolithic kernel**
  - **Idea:** All major services in kernel space
  - **Pros:** High performance, efficient communication between components
  - **Cons:** Large attack surface, harder to debug, less modular
  - **Example:** Linux (loadable modules)
- **Microkernel**
  - **Idea:** Minimal kernel; services in user space via IPC
  - **Pros:** Better isolation, fault tolerance, easier to verify
  - **Cons:** Performance overhead from IPC, complexity of message passing
  - **Example:** Mach, seL4
- **Modular/Hybrid**
  - **Idea:** Layered or componentized; some services in kernel
  - **Pros:** Balance of performance and modularity, selective loading
  - **Cons:** Complexity in determining what belongs where
  - **Example:** Windows NT (hybrid)

</div>
</div>

### OS Trends and Evolution

<div class="question-block">
<div class="question-label">Modern Developments</div>
<div class="question-text">How are current trends shaping OS design?</div>

<div class="answer-content">

- **Virtualization**
  - **Use case:** Server consolidation - running multiple VMs on single hardware
  - **Impact:** Hardware abstraction layer, resource isolation, cloud infrastructure
  
- **Containers**
  - **Use case:** Application deployment - lightweight isolation for microservices
  - **Impact:** Process-level virtualization, shared kernel, faster startup times
  
- **Cloud computing**
  - **Use case:** Distributed systems management - orchestrating services across data centers
  - **Impact:** OS as infrastructure service, auto-scaling, fault tolerance
  
- **Mobile/embedded**
  - **Use case:** Power-aware scheduling - extending battery life in smartphones
  - **Impact:** Real-time constraints, limited resources, energy optimization

</div>
</div>

## System Calls - The Core Interface

<div class="question-block">
<div class="question-label">Mechanism</div>
<div class="question-text">How does a system call actually work?</div>

<div class="answer-content">

**System call execution process:**

1. **Program calls library function** (e.g., `read()`)
2. **Library sets up registers** with parameters and system call number
3. **Trap instruction** triggers mode switch to kernel
4. **CPU switches** from user mode to kernel mode
5. **Kernel dispatcher** looks up system call number in table
6. **Handler executes** the privileged operation
7. **Return result** and switch back to user mode

**Example**: When `cat file.txt` runs, the cat program uses the `read()` system call to access the file through the kernel.

**Key insight**: This mechanism provides controlled access - user programs cannot directly manipulate hardware or system resources.

</div>
</div>

## Process Management Fundamentals

<div class="question-block">
<div class="question-label">Essential System Calls</div>
<div class="question-text">What are the main process-related system calls?</div>

<div class="answer-content">

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

**Foundation concept**: These system calls form the building blocks for all higher-level operations in user programs.

</div>
</div>

### Visual: Process State Transitions

<div style="margin: 1.5rem 0; text-align: center;">
  <img src="/ch1-intro-process-state-diagram.png" alt="Hand-drawn process state diagram showing three oval states: Running at the top, Ready on the bottom right, and Blocked on the bottom left. Numbered arrows show transitions: arrow 1 from Running to Blocked, arrow 2 from Running to Ready, arrow 3 from Blocked to Ready, and arrow 4 from Ready to Running. All drawn in red/pink ink on white background." style="max-width: 100%; width: min(400px, 85vw); height: auto; border: 1px solid #f0e6ed; border-radius: 12px; box-shadow: 0 4px 12px rgba(224, 165, 199, 0.15); background: #fdfcfd; padding: 1rem;" />
</div>

<details style="margin: 1rem 0; padding: 1rem; background: #faf7f9; border: 1px solid #f0e6ed; border-radius: 8px;">
<summary style="cursor: pointer; font-weight: 600; color: #4a4a5a; padding: 0.5rem 0; user-select: none;"><strong>Image Description</strong></summary>
<div style="margin-top: 1rem; line-height: 1.6;">
<p><strong>This hand-drawn diagram illustrates the three fundamental process states and their transitions in an operating system:</strong></p>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
<li style="margin: 0.5rem 0;"><strong>States (drawn as ovals):</strong>
  <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
    <li style="margin: 0.25rem 0;">"Running" - positioned at the top center</li>
    <li style="margin: 0.25rem 0;">"Ready" - positioned at the bottom right</li>
    <li style="margin: 0.25rem 0;">"Blocked" - positioned at the bottom left</li>
  </ul>
</li>
<li style="margin: 0.5rem 0;"><strong>Transitions (drawn as numbered arrows):</strong>
  <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
    <li style="margin: 0.25rem 0;">Arrow 1: Running to Blocked (downward left)</li>
    <li style="margin: 0.25rem 0;">Arrow 2: Running to Ready (downward right)</li>
    <li style="margin: 0.25rem 0;">Arrow 3: Blocked to Ready (horizontal right)</li>
    <li style="margin: 0.25rem 0;">Arrow 4: Ready to Running (upward)</li>
  </ul>
</li>
</ul>
<p><strong>The entire diagram is hand-drawn in red/pink ink on a white background, forming a triangular arrangement that clearly shows the cyclical nature of process state management.</strong></p>
</div>
</details>

*Process state transitions in an operating system:*

**State Definitions:**
- **Running**: Process currently executing on CPU
- **Ready**: Process waiting to be scheduled for CPU time
- **Blocked**: Process waiting for I/O or resource availability

**Transition Labels:**
1. **Running → Blocked**: Process requests I/O operation or resource
2. **Running → Ready**: Time slice expired (preemption) or higher priority process arrives
3. **Blocked → Ready**: I/O operation completes or resource becomes available
4. **Ready → Running**: Scheduler selects process for execution

**Key insight**: The OS scheduler manages these transitions to ensure fair CPU time distribution and system responsiveness.


## Practical Applications

<div class="application-section">

### User Mode vs Kernel Mode

<div class="question-block">
<div class="question-label">Protection Mechanisms</div>
<div class="question-text">How does hardware enforce privilege separation?</div>

<div class="answer-content">

**User mode characteristics:**
- Restricted instruction set access
- Cannot directly manipulate hardware resources
- Isolated memory address space
- Protected from interference by other processes

**Kernel mode characteristics:**
- Unrestricted hardware access
- Full memory address space access
- All CPU instructions available
- Complete system control

**Enforcement mechanism:**
- Hardware mode bit determines current privilege level
- Unauthorized operations trigger hardware exceptions
- Exception handler terminates violating processes

**Security principle**: This separation ensures system stability by preventing user programs from compromising critical system functions.

</div>
</div>

</div>

## Outstanding Questions

<div class="problem-section">

### Areas for Further Investigation

<div class="question-block">
<div class="question-label">Technical Clarifications</div>
<div class="question-text">What mechanisms require deeper understanding?</div>

<div class="answer-content">

**Hardware-level mechanisms:**
- CPU mode bit implementation and hardware enforcement
- Context switching mechanics and overhead
- Virtual memory translation in practice

**Programming interfaces:**
- System call overhead vs library functions
- Relationship between high-level language constructs and OS services
- Minimal system call requirements for basic programs

</div>
</div>

</div>

<div class="summary-section">

## Key Concepts Mastered

<div class="question-block">
<div class="question-label">Fundamental Understanding</div>
<div class="question-text">What core principles are now established?</div>

<div class="answer-content">

**Established concepts:**
- Operating system role as resource manager and abstraction layer
- Hardware protection mechanisms enforcing user/kernel mode separation
- System call interface as controlled access method to privileged operations
- Clear boundaries between application programs and system services

**Areas requiring continued development:**
- Detailed implementation mechanics across different architectures
- Integration patterns between theoretical concepts and practical programming
- Comparative analysis of different operating system design approaches

</div>
</div>

</div>



