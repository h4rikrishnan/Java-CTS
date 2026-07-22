export interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
  gradeStatus: 'passed' | 'failed' | 'pending';
  description?: string;
  instructor?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  major: string;
  semester: string;
  gpa: number;
}
