import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    prisma.studentUser.create({
        data: {
            email: "alex@test.edu",
            first_name: "Alex",
            last_name: "Test",
            major: "Undecided"
        }
    })
    prisma.studentUser.create({
        data: {
            email: "sam@test.edu",
            first_name: "Sam",
            last_name: "Test",
            major: "Environmental Studies"
        }
    })
    prisma.studentUser.create({
        data: {
            email: "apollo@test.edu",
            first_name: "Apollo",
            last_name: "Test",
            major: "Feline Studies"
        }
    })
    
    
    prisma.instructorUser.create({
        data: {
            email: "crane@test.edu",
            first_name: "Crane",
            last_name: "Test",
            field_of_study: "Mathematics"
        }
    })
    prisma.instructorUser.create({
        data: {
            email: "sagan@test.edu",
            first_name: "Sagan",
            last_name: "Test",
            field_of_study: "Astronomy"
        }
    })
    prisma.instructorUser.create({
        data: {
            email: "testabel@test.edu",
            first_name: "Testabel",
            last_name: "Test",
            field_of_study: "Quality Assurance"
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