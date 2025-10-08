import React from 'react';
import { getPostsByTopic } from "@/action";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Avatar } from "@heroui/avatar";
import { Chip } from "@heroui/chip";
import Link from "next/link";

interface PostListProps {
    topicName: string;
}

const PostList = async ({ topicName }: PostListProps) => {
    const posts = await getPostsByTopic(topicName)

    if (posts.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                No posts yet. Be the first to create one!
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4">
            {posts.map(post => (
                <Card key={post.id} className="w-full">
                    <CardHeader className="flex gap-3">
                        <Avatar
                            src={post.user.image || undefined}
                            name={post.user.name || 'User'}
                            size="sm"
                        />
                        <div className="flex flex-col flex-1">
                            <Link href={`/posts/${post.id}`} className="text-lg font-semibold hover:underline">
                                {post.title}
                            </Link>
                            <p className="text-small text-default-500">
                                by {post.user.name || 'Anonymous'}
                            </p>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <p className="text-default-600 line-clamp-3">
                            {post.content}
                        </p>
                    </CardBody>
                    <CardFooter className="gap-3">
                        <Chip size="sm" variant="flat">
                            {post._count.commonets} {post._count.commonets === 1 ? 'comment' : 'comments'}
                        </Chip>
                        <p className="text-small text-default-500">
                            {new Date(post.createAt).toLocaleDateString()}
                        </p>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};

export default PostList;
