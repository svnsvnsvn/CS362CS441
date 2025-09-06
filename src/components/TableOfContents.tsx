"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LectureMetadata } from "@/lib/lectures";

interface TableOfContentsProps {
  lectures?: LectureMetadata[];
}

export default function TableOfContents({ lectures = [] }: TableOfContentsProps) {
  const pathname = usePathname();
  
  // Group lectures by course
  const lecturesByCategory = {
    os: lectures.filter(lecture => lecture.course === 'os' || !lecture.course),
    sysadmin: lectures.filter(lecture => lecture.course === 'sysadmin'),
  };

  const backlinks = [
    { name: "Home", url: "/" },
    { name: "All Lectures", url: "/lectures" }
  ];

  return (
    <div className="sidebar">
      <div className="toc">
        <h3>Table of Contents</h3>
        
        {/* Operating Systems Section */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ 
            fontSize: '0.875rem', 
            fontWeight: 600, 
            color: 'var(--text-secondary)', 
            marginBottom: '0.5rem',
            fontFamily: 'Inter, sans-serif',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Operating Systems
          </h4>
          <ul className="toc-list">
            {lecturesByCategory.os && lecturesByCategory.os.length > 0 ? (
              lecturesByCategory.os.map((lecture) => (
                <li key={lecture.slug} className="toc-item">
                  <Link 
                    href={`/lectures/${lecture.slug}`}
                    className={`toc-link ${pathname === `/lectures/${lecture.slug}` ? 'active' : ''}`}
                  >
                    {lecture.title}
                  </Link>
                </li>
              ))
            ) : (
              <li className="toc-item">
                <span className="toc-link">No OS lectures available</span>
              </li>
            )}
          </ul>
        </div>

        {/* Systems Administration Section */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ 
            fontSize: '0.875rem', 
            fontWeight: 600, 
            color: 'var(--text-secondary)', 
            marginBottom: '0.5rem',
            fontFamily: 'Inter, sans-serif',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Systems Administration
          </h4>
          <ul className="toc-list">
            {lecturesByCategory.sysadmin && lecturesByCategory.sysadmin.length > 0 ? (
              lecturesByCategory.sysadmin.map((lecture) => (
                <li key={lecture.slug} className="toc-item">
                  <Link 
                    href={`/lectures/${lecture.slug}`}
                    className={`toc-link ${pathname === `/lectures/${lecture.slug}` ? 'active' : ''}`}
                  >
                    {lecture.title}
                  </Link>
                </li>
              ))
            ) : (
              <li className="toc-item">
                <span className="toc-link">No SysAdmin lectures available</span>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="backlinks">
        <h4 style={{ 
          fontSize: '0.875rem', 
          fontWeight: 600, 
          color: 'var(--text-secondary)', 
          marginBottom: '0.5rem',
          fontFamily: 'Inter, sans-serif',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          Navigation
        </h4>
        <ul style={{ listStyle: 'none' }}>
          {backlinks.map((link, index) => (
            <li key={index} style={{ marginBottom: '0.5rem' }}>
              <a 
                href={link.url}
                style={{ 
                  color: 'var(--pink-accent)', 
                  textDecoration: 'none',
                  fontSize: '0.9rem'
                }}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
