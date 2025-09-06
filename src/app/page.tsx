import Link from "next/link";
import TableOfContents from "@/components/TableOfContents";
import { getAllLectures } from "@/lib/lectures";

export default function HomePage() {
  const lectures = getAllLectures();
  
  // Group lectures by course on the server side
  const lecturesByCategory = {
    os: lectures.filter(lecture => lecture.course === 'os' || !lecture.course),
    sysadmin: lectures.filter(lecture => lecture.course === 'sysadmin'),
  };
  
  return (
    <div className="academic-layout">
      <TableOfContents lectures={lectures} />
      
      <div className="main-content">
        <div className="course-header">
          <h1 className="course-title">Course Notes</h1>
          <div className="course-meta">
            Professor: Dr. Saeed Al Haj | Term: Fall 2025
          </div>
        </div>

        <div className="lecture-content">
          <h2 className="lecture-title">Operating Systems & Systems Administration</h2>
          
          <div className="content-section">
            <p style={{ marginBottom: '1.5rem', fontSize: '1.125rem', lineHeight: '1.6' }}>
              My notes for Fall 2025 covering operating systems and systems administration.
            </p>
            
            {/* Operating Systems Section */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--ink-blue)', fontWeight: '500' }}>
                Operating Systems (CS-441)
              </h3>
              <div className="answer-content">
                <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                  Operating systems concepts and theory.
                </p>
                <ul>
                  <li>Introduction to Operating Systems</li>
                  <li>Processes and Threads</li>
                  <li>Multithreading Programming</li>
                  <li>Memory Management</li>
                  <li>File Systems</li>
                  <li>Input/Output Systems</li>
                  <li>Deadlock Prevention and Detection</li>
                  <li>Virtualization Technologies</li>
                  <li>Operating System Security</li>
                  <li>Shell Programming and Scripting</li>
                </ul>
                {lecturesByCategory.os.length > 0 && (
                  <Link href={`/lectures/${lecturesByCategory.os[0].slug}`} className="btn btn-secondary" style={{ marginTop: '1rem', display: 'inline-block' }}>
                    Start OS Course →
                  </Link>
                )}
              </div>
            </div>

            {/* Systems Administration Section */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--ink-blue)', fontWeight: '500' }}>
                Systems Administration (CS-362)
              </h3>
              <div className="answer-content">
                <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                  Hands-on system administration with Windows and Linux.
                </p>
                <ul>
                  <li>Windows Command Line Interface (CMD)</li>
                  <li>Installing and Configuring Kali Linux</li>
                  <li>Linux Basic Commands and Manual Pages</li>
                  <li>Linux File System Structure</li>
                  <li>Managing Users and Groups</li>
                  <li>Password and Shadow File Management</li>
                  <li>File and Directory Permissions</li>
                  <li>Finding Files and Directories</li>
                  <li>File Compression and Backup Strategies</li>
                  <li>Local Storage Management</li>
                  <li>Introduction to Bash Scripting</li>
                  <li>Regular Expressions</li>
                  <li>System Monitoring and Log File Analysis</li>
                </ul>
                {lecturesByCategory.sysadmin.length > 0 && (
                  <Link href={`/lectures/${lecturesByCategory.sysadmin[0].slug}`} className="btn btn-secondary" style={{ marginTop: '1rem', display: 'inline-block' }}>
                    Start Sys Admin Course →
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="content-section">
            <h3 style={{ marginBottom: '1rem', color: 'var(--ink-blue)' }}>How to Use These Notes</h3>
            <p style={{ marginBottom: '1rem' }}>
              Each lecture has key questions and explanations. 
              Use the sidebar to navigate between lectures.
            </p>
            
            <div className="question-block">
              <div className="question-label">Study Tip</div>
              <div className="question-text">
                Read the questions first to know what to focus on.
              </div>
            </div>
          </div>

                    {/* Personal Notes Disclaimer */}
          <div className="content-section" style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent-border)', borderRadius: '8px', padding: '1.5rem', margin: '2rem 0' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--ink-blue)', fontSize: '1.1rem' }}>📝 Personal Study Notes</h3>
            <p style={{ marginBottom: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              <strong>Disclaimer:</strong> Use these notes as supplementary material only. Always refer to official course materials 
              and consult with your instructor for authoritative information.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              — Created by Ann • Find me here {' '}
              <a 
                href="https://github.com/svnsvnsvn" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  color: 'var(--pink-accent)', 
                  textDecoration: 'none',
                  fontWeight: '500'
                }}
                className="github-link"
              >
                GitHub
              </a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
