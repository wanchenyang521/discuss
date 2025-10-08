import React from 'react';
import { getTopics } from "@/action";
import { Chip } from "@heroui/chip";
import { Badge } from "@heroui/badge";
import Link from "next/link";

const TopList = async () => {
    const topics = await getTopics()

    return (
        <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold mb-2">Topics</h3>
            <div className="flex flex-wrap gap-2">
                {topics.map(topic => (
                    <Link key={topic.id} href={`/topic/${topic.name}`}>
                        <Badge
                            content={topic._count.posts}
                            color="primary"
                            size="sm"
                        >
                            <Chip
                                color="secondary"
                                variant="flat"
                                className="cursor-pointer hover:opacity-80 transition-opacity"
                            >
                                {topic.name}
                            </Chip>
                        </Badge>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default TopList;