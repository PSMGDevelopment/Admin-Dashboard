import React from 'react';

function DataCard(title,content) {

    return (
        <div className="col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
            <div className="flex flex-col h-full p-5">
                <div className="grow mt-2">
                    <h2 className="text-xl leading-snug font-semibold">{title}</h2>
                    <div className="text-sm">{content}</div>
                </div>
            </div>
        </div>
    );
}

export default DataCard;
