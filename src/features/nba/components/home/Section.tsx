import React from "react";

type SectionProps = {
    title: string;
    action?: React.ReactNode;
    children: React.ReactNode;
};

export default function Section({ title, action, children }: SectionProps) {
    return (
        <section className="rounded-[24px] border border-black/6 bg-white dark:border-white/10 dark:bg-[#111214]">
            <div className="flex items-center justify-between border-b border-black/6 px-4 py-3 dark:border-white/10 sm:px-5">
                <h2 className="text-[14px] font-semibold tracking-[-0.02em] text-neutral-900 dark:text-white">
                    {title}
                </h2>
                {action}
            </div>

            <div className="p-4 sm:p-5">{children}</div>
        </section>
    );
}