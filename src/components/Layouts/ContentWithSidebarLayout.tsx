import { type ReactNode } from "react";

type Props = {
  sidebar: ReactNode;
  content: ReactNode;
};

export default function ContentWithSidebarLayout({ sidebar, content }: Props) {
  return (
    <div className="flex items-start w-144">
      <div className="flex-none w-44 justify-normal bg-slate-100 rounded-2xl">
        {sidebar}
      </div>
      <div className="flex-grow">{content}</div>
    </div>
  );
}
