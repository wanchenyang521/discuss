'use server'

import { prisma } from "@/prisma"

export async function getTopics() {
    return await prisma.topic.findMany({
        orderBy: {
            createAt: 'desc'
        },
        include: {
            _count: {
                select: {
                    posts: true
                }
            }
        }
    })
}
