import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface LectureMetadata {
  title: string;
  lecturer: string;
  date: string;
  duration: string;
  topics: string[];
  slug: string;
  course?: string;
  week?: number;
  chapter?: string;
  calculatedDuration?: string;
}

export interface Lecture {
  metadata: LectureMetadata;
  content: string;
}

const operatingSystemsDirectory = path.join(process.cwd(), 'content/operating-systems');
// Intrusion Detection course directory (replacing prior systems-administration)
const intrusionDetectionDirectory = path.join(process.cwd(), 'content/intrusion-detection');

// Calculate reading time based on word count (average 200 words per minute)
function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export function getAllLectures(): LectureMetadata[] {
  const allLectures: LectureMetadata[] = [];

  // Get OS lectures
  if (fs.existsSync(operatingSystemsDirectory)) {
    const osLectures = fs.readdirSync(operatingSystemsDirectory)
      .filter((name) => name.endsWith('.md'))
      .map((name) => {
        const fullPath = path.join(operatingSystemsDirectory, name);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        
        return {
          ...data,
          slug: name.replace(/\.md$/, ''),
          course: 'os',
          calculatedDuration: calculateReadingTime(content),
        } as LectureMetadata;
      });
    allLectures.push(...osLectures);
  }

  // Get Intrusion Detection lectures
  if (fs.existsSync(intrusionDetectionDirectory)) {
    const idsLectures = fs.readdirSync(intrusionDetectionDirectory)
      .filter((name) => name.endsWith('.md'))
      .map((name) => {
        const fullPath = path.join(intrusionDetectionDirectory, name);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
          ...data,
          slug: name.replace(/\.md$/, ''),
          course: 'ids',
          calculatedDuration: calculateReadingTime(content),
        } as LectureMetadata;
      });
    allLectures.push(...idsLectures);
  }

  return allLectures.sort((a, b) => {
    // First sort by course to keep courses together
    if (a.course !== b.course) {
      // OS lectures come first, then IDS lectures
      if (a.course === 'os') return -1;
      if (b.course === 'os') return 1;
      return 0;
    }
    // Within the same course, sort by date
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
}

export function getLecturesByCategory() {
  const allLectures = getAllLectures();
  
  return {
    os: allLectures.filter(lecture => lecture.course === 'os'),
  ids: allLectures.filter(lecture => lecture.course === 'ids'),
  };
}

export function getLectureBySlug(slug: string): Lecture | null {
  try {
    // Try OS lectures first
    let fullPath = path.join(operatingSystemsDirectory, `${slug}.md`);
    if (fs.existsSync(fullPath)) {
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        metadata: {
          ...data,
          slug,
          course: 'os',
        } as LectureMetadata,
        content,
      };
    }

  // Try intrusion detection lectures
  fullPath = path.join(intrusionDetectionDirectory, `${slug}.md`);
    if (fs.existsSync(fullPath)) {
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        metadata: {
          ...data,
          slug,
      course: 'ids',
        } as LectureMetadata,
        content,
      };
    }

    return null;
  } catch {
    return null;
  }
}

export function getLectureSlugs(): string[] {
  if (!fs.existsSync(operatingSystemsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(operatingSystemsDirectory);
  return fileNames
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.replace(/\.md$/, ''));
}
