import { PrismaClient } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'

const prisma = new PrismaClient()

// create types for Post, Page, and Tag
type Post = {
    id: number;
    title: string;
    tags: Tag[]
}

type Page = {
    id: number;
    title: string;
    tags: Tag[]
}

type Tag = {
    id: number;
    taggedPage?: Page;
    taggedPost?: Post;
    taggableId: number;
}

// create types for Student, Instructor, and LoginRecord

async function main() {
    // get some Pages and Posts
    // use the create Tag function on a Post and a Page

    // get some Students and Instructors
    // use the createLoginRecord function 
}

async function createLoginRecord(userId: number) {

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