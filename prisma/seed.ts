import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // 清理现有数据
    await prisma.comment.deleteMany()
    await prisma.post.deleteMany()
    await prisma.topic.deleteMany()
    await prisma.account.deleteMany()
    await prisma.session.deleteMany()
    await prisma.user.deleteMany()

    // 创建测试用户
    const user1 = await prisma.user.create({
        data: {
            email: 'test1@example.com',
            name: 'Alice',
            image: 'https://avatars.githubusercontent.com/u/1?v=4'
        }
    })

    const user2 = await prisma.user.create({
        data: {
            email: 'test2@example.com',
            name: 'Bob',
            image: 'https://avatars.githubusercontent.com/u/2?v=4'
        }
    })

    const user3 = await prisma.user.create({
        data: {
            email: 'test3@example.com',
            name: 'Charlie',
            image: 'https://avatars.githubusercontent.com/u/3?v=4'
        }
    })

    // 创建话题
    const topic1 = await prisma.topic.create({
        data: {
            name: 'javascript',
            desc: 'Discussion about JavaScript programming',
            userId: user1.id
        }
    })

    const topic2 = await prisma.topic.create({
        data: {
            name: 'react',
            desc: 'React framework and best practices',
            userId: user2.id
        }
    })

    const topic3 = await prisma.topic.create({
        data: {
            name: 'nextjs',
            desc: 'Next.js framework discussions',
            userId: user1.id
        }
    })

    const topic4 = await prisma.topic.create({
        data: {
            name: 'typescript',
            desc: 'TypeScript tips and tricks',
            userId: user3.id
        }
    })

    const topic5 = await prisma.topic.create({
        data: {
            name: 'prisma',
            desc: 'Prisma ORM discussions',
            userId: user2.id
        }
    })

    // 创建帖子
    await prisma.post.create({
        data: {
            title: 'Getting started with JavaScript',
            content: 'Here are some tips for JavaScript beginners...',
            userId: user1.id,
            topicId: topic1.id
        }
    })

    await prisma.post.create({
        data: {
            title: 'ES6 Features You Should Know',
            content: 'Arrow functions, destructuring, and more...',
            userId: user2.id,
            topicId: topic1.id
        }
    })

    await prisma.post.create({
        data: {
            title: 'Async/Await Best Practices',
            content: 'Learn how to handle asynchronous operations...',
            userId: user3.id,
            topicId: topic1.id
        }
    })

    await prisma.post.create({
        data: {
            title: 'React Hooks Tutorial',
            content: 'Understanding useState, useEffect, and custom hooks...',
            userId: user1.id,
            topicId: topic2.id
        }
    })

    await prisma.post.create({
        data: {
            title: 'React Performance Optimization',
            content: 'Tips for optimizing React applications...',
            userId: user2.id,
            topicId: topic2.id
        }
    })

    await prisma.post.create({
        data: {
            title: 'State Management with Context',
            content: 'How to use React Context API effectively...',
            userId: user3.id,
            topicId: topic2.id
        }
    })

    await prisma.post.create({
        data: {
            title: 'Next.js 15 New Features',
            content: 'Exploring the latest features in Next.js 15...',
            userId: user1.id,
            topicId: topic3.id
        }
    })

    await prisma.post.create({
        data: {
            title: 'Server Actions in Next.js',
            content: 'How to use server actions for form handling...',
            userId: user2.id,
            topicId: topic3.id
        }
    })

    await prisma.post.create({
        data: {
            title: 'TypeScript for Beginners',
            content: 'Introduction to TypeScript basics...',
            userId: user3.id,
            topicId: topic4.id
        }
    })

    await prisma.post.create({
        data: {
            title: 'Advanced TypeScript Types',
            content: 'Generics, utility types, and conditional types...',
            userId: user1.id,
            topicId: topic4.id
        }
    })

    await prisma.post.create({
        data: {
            title: 'Prisma Schema Best Practices',
            content: 'How to design your Prisma schema effectively...',
            userId: user2.id,
            topicId: topic5.id
        }
    })

    console.log('✅ Seed data inserted successfully!')
    console.log(`Created:`)
    console.log(`  - 3 users`)
    console.log(`  - 5 topics`)
    console.log(`  - 11 posts`)
}

main()
    .catch((e) => {
        console.error('❌ Error seeding data:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
