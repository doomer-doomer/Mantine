export type Employee = {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  salary: number;
  startDate: string;
  signatureCatchPhrase: string;
  avatar: string;
};

export const employeeData: Employee[]= [
    {
        firstName:"John",
        lastName:"doe",
        email:"john@gmail.com",
        jobTitle:"Software Engineer",
        salary:70000,
        startDate:"2023-01-15",
        signatureCatchPhrase: "Hello I am John",
        avatar: "https://avatar.iran.liara.run/public/49"
    },
    {
        firstName:"Tejas",
        lastName:"Gotavade",
        email:"tejas@gmail.com",
        jobTitle:"Software Engineer",
        salary:50000,
        startDate:"2023-01-25",
        signatureCatchPhrase: "Hello I am Tejas",
        avatar: "https://avatar.iran.liara.run/public/45"
    },
    {
        firstName:"Tejas2",
        lastName:"Gotavade",
        email:"tejas2@gmail.com",
        jobTitle:"Software Engineer",
        salary:60000,
        startDate:"2023-01-12",
        signatureCatchPhrase: "Hello I am Tejas2",
        avatar: "https://avatar.iran.liara.run/public/35"
    },
    {
        firstName:"Tejas3",
        lastName:"Gotavade",
        email:"tejas3@gmail.com",
        jobTitle:"Software Engineer",
        salary:65000,
        startDate:"2023-01-11",
        signatureCatchPhrase: "Hello I am Tejas3",
        avatar: "https://avatar.iran.liara.run/public/36"
    },
    {
        firstName:"Tejas4",
        lastName:"Gotavade",
        email:"tejas4@gmail.com",
        jobTitle:"Software Engineer",
        salary:65500,
        startDate:"2023-01-24",
        signatureCatchPhrase: "Hello I am Tejas4",
        avatar: "https://avatar.iran.liara.run/public/55"
    }
]