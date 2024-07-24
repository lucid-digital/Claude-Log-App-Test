export interface DeveloperLog {
  _id: string;
  developerName: string;
  taskDescription: string;
  hoursWorked: number;
  date: Date | string;
  category: string;
  projectId: string;
}