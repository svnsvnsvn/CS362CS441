import Link from "next/link";
import TableOfContents from "@/components/TableOfContents";
import { getAllLectures } from "@/lib/lectures";

export default function HomePage() {
  const lectures = getAllLectures();
  
  // Group lectures by course on the server side
  const lecturesByCategory = {
    os: lectures.filter(lecture => lecture.course === 'os' || !lecture.course),
    ids: lectures.filter(lecture => lecture.course === 'ids'),
  };
  
  return (
    <div className="academic-layout">
      <TableOfContents lectures={lectures} />
      
      <div className="main-content">
        <div className="course-header">
          <h1 className="course-title">Course Notes</h1>
          <div className="course-meta" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span>Operating Systems: Dr. Saeed Al Haj</span>
            <span>Intrusion Detection: Dr. Mini Zeng</span>
            <span>Term: Fall 2025</span>
          </div>
        </div>

        <div className="lecture-content">
          <h2 className="lecture-title">Operating Systems & Intrusion Detection</h2>
          
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

            {/* Intrusion Detection Section */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--ink-blue)', fontWeight: '500' }}>
                Intrusion Detection (CS-427)
              </h3>
              <div className="answer-content">
                <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                  Network and host-based intrusion detection concepts, packet analysis, and signature/behavioral detection.
                </p>
                <ul>
                  <li>Intro to IDS, IPS, SIEM, Firewalls</li>
                  <li>Network fundamentals review</li>
                  <li>TCP/UDP intrusion patterns</li>
                  <li>Packet fragmentation & evasion</li>
                  <li>Firewall analysis & midterm review</li>
                  <li>Snort install & architecture</li>
                  <li>Snort modes and signatures</li>
                  <li>Writing Snort rules</li>
                  <li>Advanced rule tuning</li>
                  <li>Indicator of compromise analysis</li>
                  <li>Threat intelligence frameworks</li>
                  <li>Threat intel analysis & reporting</li>
                  <li>Final review & exam prep</li>
                </ul>
                {lecturesByCategory.ids.length > 0 && (
                  <Link href={`/lectures/${lecturesByCategory.ids[0].slug}`} className="btn btn-secondary" style={{ marginTop: '1rem', display: 'inline-block' }}>
                    Start IDS Course →
                  </Link>
                )}
              </div>
            </div>
          </div>

                    {/* Personal Notes Disclaimer */}
          <div className="content-section" style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent-border)', borderRadius: '8px', padding: '1.5rem', margin: '2rem 0' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--ink-blue)', fontSize: '1.1rem' }}>Personal Study Notes</h3>
            <p style={{ marginBottom: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              These are my personal study notes for two courses that felt particularly pivotal during Fall 2025. 
              While I took other courses this semester, these two stood out as foundational to my understanding of 
              systems and security concepts, making them worth documenting thoroughly.
            </p>
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
