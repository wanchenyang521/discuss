'use client'
import React, {useActionState, startTransition} from 'react';
import {Button, Input} from "@heroui/react";
import {Textarea} from "@heroui/input";
import * as action from '@/action'
import {Chip} from "@heroui/chip";

interface PostCreateFormProps {
    topicName: string;
}

const PostCreateForm = ({ topicName }: PostCreateFormProps) => {
    const [state, formAction, isPending] = useActionState(action.createPost, {
        errors: {}
    })

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        startTransition(() => formAction(formData))
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="border rounded-lg p-4">
            <div className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold">Create a Post</h3>
                <input type="hidden" name="topicName" value={topicName} />
                <Input
                    name='title'
                    label="Title"
                    labelPlacement="outside"
                    placeholder="Enter post title"
                    isInvalid={!!state.errors.title}
                    errorMessage={state.errors.title?.join(',')}
                />
                <Textarea
                    name='content'
                    label="Content"
                    labelPlacement="outside"
                    placeholder="Enter post content"
                    minRows={6}
                    isInvalid={!!state.errors.content}
                    errorMessage={state.errors.content?.join(',')}
                />
                <Button
                    type="submit"
                    color="primary"
                    isLoading={isPending}
                >
                    Create Post
                </Button>
            </div>

            {state.errors._form ? <Chip color="danger" className="mt-2">{state.errors._form}</Chip> : null}
        </form>
    );
};

export default PostCreateForm;
