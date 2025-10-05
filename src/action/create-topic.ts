'use server'

import {z} from 'zod'

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
        desc?: string[]
    }
}

export async function createTopic(prevState:createTopicFormState,formData: FormData) {
    const name = formData.get('name')
    const desc = formData.get('desc')
    const result = createTopicSchema.safeParse({name, desc})
    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }
    return {
        errors: {}
    }
}