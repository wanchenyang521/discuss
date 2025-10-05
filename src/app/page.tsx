import React from 'react';

import TopicCreateForm from "@/component/topic-create-form";

const Page = () => {
    return (
        <div className="flex justify-between">
          <div>
              <h1>top posts</h1>
          </div>
            <div>
                <TopicCreateForm></TopicCreateForm>
            </div>
        </div>
    );
};

export default Page;