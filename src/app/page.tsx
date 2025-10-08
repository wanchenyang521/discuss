import React from 'react';

import TopicCreateForm from "@/component/topic-create-form";
import TopList from "@/app/components/top-list";

const Page = () => {
    return (
        <div className="grid grid-cols-4 gap-4 p-4">
          <div className="col-span-3">
              <h1 className="text-2xl font-bold mb-4">Top Posts</h1>
          </div>
            <div className="flex flex-col gap-4">
                <TopicCreateForm></TopicCreateForm>
                <TopList></TopList>
            </div>
        </div>
    );
};

export default Page;