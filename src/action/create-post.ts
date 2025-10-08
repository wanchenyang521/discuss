'use server'

import {z} from 'zod'
import {auth} from "@/auth";
import {prisma} from "@/prisma";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

const createPostSchema = z.object({
    title: z.string()
        .min(1, { message: 'title is required' })
        .max(100, { message: 'title must be less than 100 characters' }),
    content: z.string()
        .min(1, { message: 'content is required' })
        .max(5000, { message: 'content must be less than 5000 characters' }),
    topicName: z.string().min(1),
})

interface createPostFormState{
    errors: {
        title?: string[],
        content?: string[],
        _form?: string[],
    }
}

export async function createPost(prevState: createPostFormState, formData: FormData): Promise<createPostFormState> {
    const title = formData.get('title')
    const content = formData.get('content')
    const topicName = formData.get('topicName')

    const result = createPostSchema.safeParse({title, content, topicName})
    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    const session = await auth()
    if (!session || !session.user) {
        return {
            errors: {
                _form: ['need login']
            }
        }
    }

    if (!session.user.id) {
        return {
            errors: {
                _form: ['User ID not found in session']
            }
        }
    }

    // 检查用户是否存在
    const userExists = await prisma.user.findUnique({
        where: { id: session.user.id }
    })

    if (!userExists) {
        return {
            errors: {
                _form: ['User not found in database. Please sign in again.']
            }
        }
    }

    // 查找 topic
    const topic = await prisma.topic.findUnique({
        where: { name: result.data.topicName }
    })

    if (!topic) {
        return {
            errors: {
                _form: ['Topic not found']
            }
        }
    }

    let post;
    try {
        post = await prisma.post.create({
            data: {
                title: result.data.title,
                content: result.data.content,
                userId: session.user.id,
                topicId: topic.id
            }
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message]
                }
            }
        } else {
            return {
                errors: {
                    _form: ['Failed to create post']
                }
            }
        }
    }

    revalidatePath(`/topic/${result.data.topicName}`)
    redirect(`/topic/${result.data.topicName}`)
}
