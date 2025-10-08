'use server'

import {z} from 'zod'
import {auth} from "@/auth";
import {prisma} from "@/prisma";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";
import {sleep} from "@/app/utils";

const createTopicSchema = z.object({
    name: z.string()
        .min(1, { message: 'name is required' })
        .max(20, { message: 'name must be less than 20 characters' })
        .regex(/^[a-zA-Z0-9]+$/, { message: 'name must be alphanumeric' }),
    desc: z.string().min(1).max(100),
})
interface createTopicFormState{
    errors: {
        name?: string[],
        desc?: string[],
        _form?: string[],
    }
}

export async function createTopic(prevState:createTopicFormState,formData: FormData):Promise<createTopicFormState> {
    await sleep(1000)
    const name = formData.get('name')
    const desc = formData.get('desc')
    const result = createTopicSchema.safeParse({name, desc})
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

    let topic;
    try {
        topic = await prisma.topic.create({
            data: {
                name: result.data.name,
                desc: result.data.desc,
                userId: session.user.id
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
                    _form: ['Failed to create topic']
                }
            }
        }
    }

   redirect(`topic/${topic.name}`)
}