export interface Employee {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  dob: number;
  salary: number;
}
export interface Task {
    id?: string,
    title: string,
    description: string,
    assign: string,
    dueDate: number,
    isDone: boolean
}
