export interface Project {
  id: string;
  name: string;
}

export interface DeveloperLog {
  id: string;
  developerName: string;
  hoursWorked: number;
  taskDescription: string;
  category: string;
  date: string;
  project: string; // This will store the project id
}