import React from 'react';
import PostCreateForm from "@/component/post-create-form";
import PostList from "@/app/components/post-list";
import { Chip } from "@heroui/chip";

const Page = async ({
                  params,
              }: {
    params: Promise<{ name: string }>
}) => {
    const { name } = await params
    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <h1 className="text-3xl font-bold">Topic:</h1>
                    <Chip color="secondary" size="lg" variant="flat">{name}</Chip>
                </div>
            </div>

            <div className="mb-8">
                <PostCreateForm topicName={name} />
            </div>

            <div>
                <h2 className="text-2xl font-semibold mb-4">Posts</h2>
                <PostList topicName={name} />
            </div>
        </div>
    );
};

export default Page;