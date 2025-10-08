import React from 'react';

const Page = async ({
                  params,
              }: {
    params: Promise<{ name: string }>
}) => {
    const { name } = await params
    return (
        <div>
            话题列表「{name}」
        </div>
    );
};

export default Page;