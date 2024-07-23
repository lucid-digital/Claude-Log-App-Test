export interface DeveloperLog {
  _id: string;
  description: string;
  hours: number;
  date: Date;
  category: string;
  projectId: string;
}