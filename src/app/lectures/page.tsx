
import Link from "next/link";
import TableOfContents from "@/components/TableOfContents";
import { getAllLectures } from "@/lib/lectures";

export default function LecturesPage() {
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
          <h1 className="course-title">All Lectures</h1>
          <div className="course-meta">
            Professor: Dr. Saeed Al Haj | Term: Fall 2025
          </div>
        </div>
        <div className="lecture-content">
          <h2 className="lecture-title">Browse by Subject</h2>
          <div className="content-section">
            <p style={{ marginBottom: '1.5rem', fontSize: '1.125rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
              Browse all available lectures organized by subject area.
            </p>
            {/* Operating Systems Section */}
            {lecturesByCategory.os.length > 0 && (
              <div style={{ marginBottom: '2.5rem' }}>
                <h3 style={{ marginBottom: '1rem', color: 'var(--ink-blue)', fontWeight: '500' }}>
                  Operating Systems
                </h3>
                <div className="answer-content">
                  <ul>
                    {lecturesByCategory.os.map((lecture) => (
                      <li key={lecture.slug} style={{ marginBottom: '0.5rem' }}>
                        <Link href={`/lectures/${lecture.slug}`} style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
                          {lecture.title}
                        </Link>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginLeft: '0.5rem' }}>
                          ({lecture.calculatedDuration || lecture.duration})
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {/* Intrusion Detection Section */}
            {lecturesByCategory.ids.length > 0 && (
              <div style={{ marginBottom: '2.5rem' }}>
                <h3 style={{ marginBottom: '1rem', color: 'var(--ink-blue)', fontWeight: '500' }}>
                  Intrusion Detection
                </h3>
                <div className="answer-content">
                  <ul>
                    {lecturesByCategory.ids.map((lecture) => (
                      <li key={lecture.slug} style={{ marginBottom: '0.5rem' }}>
                        <Link href={`/lectures/${lecture.slug}`} style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
                          {lecture.title}
                        </Link>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginLeft: '0.5rem' }}>
                          ({lecture.calculatedDuration || lecture.duration})
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
          <div className="content-section">
            <h3 style={{ marginBottom: '1rem', color: 'var(--ink-blue)' }}>How to Use These Notes</h3>
            <p style={{ marginBottom: '1rem' }}>
              Each lecture is structured with key questions and detailed explanations. 
              Use the table of contents on the left to navigate between lectures.
            </p>
            <div className="question-block">
              <div className="question-label">Study Tip</div>
              <div className="question-text">
                Review each lecture&apos;s questions before reading the content to focus your attention on key concepts.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
