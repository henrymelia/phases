import { type ReactNode } from "react";

type Props = {
  sidebar: ReactNode;
  content: ReactNode;
};

export default function ContentWithSidebarLayout({ sidebar, content }: Props) {
  return (
    <div className="flex items-start max-w-5xl">
      <div className="flex-none max-w-xs justify-normal bg-slate-100 rounded-2xl">
        {sidebar}
      </div>
      <div className="flex-auto">{content}</div>
    </div>
  );
}
