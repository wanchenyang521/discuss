'use server'

import { prisma } from "@/prisma"

export async function getPostsByTopic(topicName: string) {
    const topic = await prisma.topic.findUnique({
        where: { name: topicName }
    })

    if (!topic) {
        return []
    }

    return await prisma.post.findMany({
        where: {
            topicId: topic.id
        },
        include: {
            user: {
                select: {
                    name: true,
                    image: true
                }
            },
            _count: {
                select: {
                    commonets: true
                }
            }
        },
        orderBy: {
            createAt: 'desc'
        }
    })
}
