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
const systemsAdministrationDirectory = path.join(process.cwd(), 'content/systems-administration');

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

  // Get Systems Admin lectures
  if (fs.existsSync(systemsAdministrationDirectory)) {
    const sysadminLectures = fs.readdirSync(systemsAdministrationDirectory)
      .filter((name) => name.endsWith('.md'))
      .map((name) => {
        const fullPath = path.join(systemsAdministrationDirectory, name);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        
        return {
          ...data,
          slug: name.replace(/\.md$/, ''),
          course: 'sysadmin',
          calculatedDuration: calculateReadingTime(content),
        } as LectureMetadata;
      });
    allLectures.push(...sysadminLectures);
  }

  return allLectures.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getLecturesByCategory() {
  const allLectures = getAllLectures();
  
  return {
    os: allLectures.filter(lecture => lecture.course === 'os'),
    sysadmin: allLectures.filter(lecture => lecture.course === 'sysadmin'),
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

    // Try sysadmin lectures
    fullPath = path.join(systemsAdministrationDirectory, `${slug}.md`);
    if (fs.existsSync(fullPath)) {
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        metadata: {
          ...data,
          slug,
          course: 'sysadmin',
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
