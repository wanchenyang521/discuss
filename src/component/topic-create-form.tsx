'use client'
import React, {startTransition, useActionState} from 'react';
import {Popover, PopoverTrigger, PopoverContent, Button, Input} from "@heroui/react";
import {Textarea} from "@heroui/input";
import * as action from '@/action'
const TopicCreateForm = () => {
    const [state, formAction] = useActionState(action.createTopic, {
        errors: {}
    })
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        startTransition(() => formAction(formData))
    }

    return (
        <Popover placement="left">
            <PopoverTrigger>
                <Button color="secondary" variant="bordered"> Create a Topic</Button>
            </PopoverTrigger>
            <PopoverContent>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="flex flex-col gap-4">
                        <h3 className="text-lg">Create a Topic</h3>
                        <Input name='name' label="name" labelPlacement="outside" placeholder="Name" isInvalid={!!state.errors.name} errorMessage={state.errors.name?.join(',')}></Input>
                        <Textarea name='desc' label="desc" labelPlacement="outside" placeholder="desc" isInvalid={!!state.errors.desc} errorMessage={state.errors.desc?.join(',')}></Textarea>
                        <Button type="submit">Create</Button>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    );
};

export default TopicCreateForm;