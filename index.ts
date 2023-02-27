import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// create types for Student, Instructor, and LoginRecord

type Student = {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    major: string | null;
    user_type: string;
    login_records?: LoginRecord[]
}

type Instructor = {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    field_of_study: string | null;
    user_type: string;
    login_records?: LoginRecord[];
}

type LoginRecord = {
    id: number;
    timestamp: number;
    user: Student | Instructor;
    userId: number;
}

async function main() {
    // get some Students and Instructors
    let students: Student[] = await prisma.studentOrInstructorUser.findMany({
        where: {
            user_type: "Student"
        }
    })

    let instructors: Instructor[] = await prisma.studentOrInstructorUser.findMany({
        where: {
            user_type: "Instructor"
        }
    })

    // use the createLoginRecord function 
    students.forEach((student: Student) => {
        createLoginRecord(student)
    })

    instructors.forEach((instructor: Instructor) => {
        createLoginRecord(instructor)
    })
}

async function createLoginRecord(user: Student | Instructor) {
    await prisma.loginRecord.create({
        data: {
            userId: user.id
        }
    })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })