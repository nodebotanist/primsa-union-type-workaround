import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    //clean out db entries
    await prisma.studentOrInstructorUser.deleteMany({})
    await prisma.loginRecord.deleteMany({})

    //create new database entries
    await prisma.studentOrInstructorUser.create({
        data: {
            email: "alex@test.edu",
            first_name: "Alex",
            last_name: "Test",
            major: "Undecided",
            user_type: "Student",
            login_records: {
                create: [{}, {}, {}]
            }
        }
    })

    await prisma.studentOrInstructorUser.create({
        data: {
            email: "sam@test.edu",
            first_name: "Sam",
            last_name: "Test",
            major: "Environmental Studies",
            user_type: "Student",
            login_records: {
                create: [{}, {}, {}]
            }
        }
    })
    await prisma.studentOrInstructorUser.create({
        data: {
            email: "apollo@test.edu",
            first_name: "Apollo",
            last_name: "Test",
            major: "Feline Studies",
            user_type: "Student",
            login_records: {
                create: [{}, {}, {}]
            }
        }
    })
    
    
    await prisma.studentOrInstructorUser.create({
        data: {
            email: "crane@test.edu",
            first_name: "Crane",
            last_name: "Test",
            field_of_study: "Mathematics",
            user_type: "Instructor",
            login_records: {
                create: [{}, {}, {}]
            }
        }
    })
    await prisma.studentOrInstructorUser.create({
        data: {
            email: "sagan@test.edu",
            first_name: "Sagan",
            last_name: "Test",
            field_of_study: "Astronomy",
            user_type: "Instructor",
            login_records: {
                create: [{}, {}, {}]
            }
        }
    })
    await prisma.studentOrInstructorUser.create({
        data: {
            email: "testabel@test.edu",
            first_name: "Testabel",
            last_name: "Test",
            field_of_study: "Quality Assurance",
            user_type: "Instructor",
            login_records: {
                create: [{}, {}, {}]
            }
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