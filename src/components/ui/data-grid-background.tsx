import React from "react";

export const DataGridBackground = () => {
    return (
        <div className="absolute inset-0 z-0 h-full w-full bg-zinc-950 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.1]">
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-emerald-500 opacity-20 blur-[100px]"></div>
        </div>
    );
};
