import { Prisma, PrismaClient } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import internal from 'stream';

const prisma = new PrismaClient()

// create types for Post, Page, and Tag
class Post {
    public id: number = 0;
    public title: string = "";
    public tags: Tag[] | undefined;
    public type: string = "Post";
}

class Page {
    public id: number = 0;
    public title: string = '';
    public tags: Tag[] | undefined;
    public type: string = "Page";
}

class Tag {
    public id: number = 0;
    public taggedPage?: Page | undefined;
    public taggedPost?: Post | undefined;
    public taggableId: number | null = 0;
}

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
    createTag(posts[0])
    createTag(pages[0])

    // get some Students and Instructors
    let students: Student[] = await prisma.studentOrInstructorUser.findMany({
        where: {
            user_type: "Student"
        }
    })
    console.log(students)

    let instructors: Instructor[] = await prisma.studentOrInstructorUser.findMany({
        where: {
            user_type: "Instructor"
        }
    })
    console.log(instructors)
    // ue the createLoginRecord function 

    students.forEach((student: Student) => {
        createLoginRecord(student)
    })

    instructors.forEach((instructor: Instructor) => {
        createLoginRecord(instructor)
    })
}

async function createTag(taggable: Post | Page) {
    let taggableItem:{taggableId: number; taggedPost?: Post; taggedPage?: Page; } = {
        taggableId: taggable.id
    }
    // for some reason this doesn't work-- it shows up false for both
    // if (taggable instanceof Post) {
    if(taggable.type === "Post") {
        console.log('Post')
        taggableItem.taggedPost= taggable
        taggableItem.taggedPage= undefined
    }
    if(taggable.type === "Page") {
        taggableItem.taggedPage= taggable
        taggableItem.taggedPost= undefined
    }

    // let result = await prisma.tag.create({
    //     data:{
    //         taggableId:  taggableItem.taggableId,
    //         taggedPage: taggableItem.taggedPage,
    //         taggedPost: taggableItem.taggedPost
    //     }
    // })
    // console.log(result)
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