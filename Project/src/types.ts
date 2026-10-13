export interface EventItem {
  id: number;
  title: string;
  date: string;
  venue: string;
  department: string;
  registeredCount: number;
}

export interface StudentRegistration {
  name: string;
  email: string;
  rollNo: string;
}