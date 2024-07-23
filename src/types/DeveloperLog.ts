export interface DeveloperLog {
  _id: string;
  description: string;
  hours: number;
  date: Date | string;
  category: string;
  projectId: string;
}