
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
          <div className="course-meta" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span>Operating Systems: Dr. Saeed Al Haj</span>
            <span>Intrusion Detection: Dr. Mini Zeng</span>
            <span>Term: Fall 2025</span>
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
        </div>
      </div>
    </div>
  );
}
