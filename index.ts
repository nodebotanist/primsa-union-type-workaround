import { PrismaClient } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import internal from 'stream';

const prisma = new PrismaClient()

// create types for Post, Page, and Tag
type Post = {
    id: number;
    title: string;
    tags?: Tag[]
}

type Page = {
    id: number;
    title: string;
    tags?: Tag[]
}

type Tag = {
    id: number;
    taggedPage?: Page;
    taggedPost?: Post;
    taggableId?: number | null;
}

// create types for Student, Instructor, and LoginRecord

type Student = {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    major: string;
    login_records: LoginRecord[]
}

type Instructor = {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    field_of_study: string;
    login_records: LoginRecord[]
}

type LoginRecord = {
    id: number;
    timestamp: number;
    user: Student | Instructor;
    userId: number;
}

async function main() {
    // get some Pages and Posts
    let pages: Page[] = await prisma.page.findMany({
        include: {
            tags: true
        }
    })
    let posts: Post[] = await prisma.post.findMany({
        include: {
            tags: true
        }
    })
    // use the create Tag function on a Post and a Page

    // get some Students and Instructors
    // use the createLoginRecord function 
}

async function createLoginRecord(userId: number) {

}

async function createTag(taggable: Post | Page) {
    
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