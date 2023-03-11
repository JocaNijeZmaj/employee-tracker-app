export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dob: number;
  salary: number;
}
export interface Task {
    id: string,
    title: string,
    description: string,
    assign: string,
    dueDate: Date,
    isDone: boolean
}
