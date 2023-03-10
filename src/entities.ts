export interface Employee {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    dob: Date,
    salary: Number 
}
export interface Task {
    id: string,
    title: string,
    description: string,
    assign: string,
    dueDate: Date,
    isDone: boolean
}
