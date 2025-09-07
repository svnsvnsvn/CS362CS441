"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { LectureMetadata } from "@/lib/lectures";

interface TableOfContentsProps {
  lectures?: LectureMetadata[];
}

export default function TableOfContents({ lectures = [] }: TableOfContentsProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Group lectures by course
  const lecturesByCategory = {
    os: lectures.filter(lecture => lecture.course === 'os' || !lecture.course),
    ids: lectures.filter(lecture => lecture.course === 'ids'),
  };

  const backlinks = [
    { name: "Home", url: "/" },
    { name: "All Lectures", url: "/lectures" }
  ];

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false); // Close mobile menu when switching to desktop
      }
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Mobile menu toggle button
  const MenuToggle = () => (
    <button
      className="menu-toggle"
      onClick={() => setIsOpen(!isOpen)}
      aria-label="Toggle navigation menu"
      aria-expanded={isOpen}
    >
      <div className={`hamburger ${isOpen ? 'open' : ''}`}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <span className="menu-text">Navigation</span>
    </button>
  );

  return (
    <>
      {/* Mobile Menu Toggle */}
      {isMobile && <MenuToggle />}
      
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div 
          className="menu-overlay" 
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <div className={`sidebar ${isMobile ? (isOpen ? 'mobile-open' : 'mobile-closed') : ''}`}>
        <div className="toc">
          {/* Mobile header with close button */}
          {isMobile && (
            <div className="mobile-header">
              <h3>Table of Contents</h3>
              <button 
                className="close-button"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                ×
              </button>
            </div>
          )}
          
          {!isMobile && <h3>Table of Contents</h3>}
          
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

          {/* Intrusion Detection Section */}
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
              Intrusion Detection
            </h4>
            <ul className="toc-list">
              {lecturesByCategory.ids && lecturesByCategory.ids.length > 0 ? (
                lecturesByCategory.ids.map((lecture) => (
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
                  <span className="toc-link">No IDS lectures available</span>
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
    </>
  );
}
