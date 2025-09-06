import { notFound } from 'next/navigation';
import Link from 'next/link';
import TableOfContents from '@/components/TableOfContents';
import { getLectureBySlug, getAllLectures } from '@/lib/lectures';
import MarkdownRenderer from '@/components/MarkdownRenderer';

interface LecturePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const lectures = getAllLectures();
  return lectures.map((lecture) => ({
    slug: lecture.slug,
  }));
}

export default async function LecturePage({ params }: LecturePageProps) {
  const { slug } = await params;
  const lecture = getLectureBySlug(slug);
  
  if (!lecture) {
    notFound();
  }

  const { metadata, content } = lecture;
  const allLectures = getAllLectures();
  const currentIndex = allLectures.findIndex(l => l.slug === slug);
  const previousLecture = currentIndex > 0 ? allLectures[currentIndex - 1] : null;
  const nextLecture = currentIndex < allLectures.length - 1 ? allLectures[currentIndex + 1] : null;

  return (
    <div className="academic-layout">
      <TableOfContents lectures={allLectures} />
      
      <div className="main-content">
        <div className="course-header">
          <h1 className="course-title">Course Notes</h1>
          <div className="course-meta">
            Professor: Dr. Saeed Al Haj | Term: Fall 2025
          </div>
        </div>

        <div className="lecture-content">
          <div className="lecture-title">
            {metadata.title}
          </div>
          
          <div className="content-section">
            <MarkdownRenderer content={content} />
          </div>

          {/* Navigation between lectures */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--border-light)'
          }}>
            {previousLecture ? (
              <Link 
                href={`/lectures/${previousLecture.slug}`}
                className="btn btn-secondary"
              >
                ← {previousLecture.title}
              </Link>
            ) : (
              <div></div>
            )}
            
            {nextLecture ? (
              <Link 
                href={`/lectures/${nextLecture.slug}`}
                className="btn btn-primary"
              >
                {nextLecture.title} →
              </Link>
            ) : (
              <Link 
                href="/lectures"
                className="btn btn-primary"
              >
                Back to Course →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}