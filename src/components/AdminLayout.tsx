import Sidebar from "./Sidebar";

type Props = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: Props) {
  return (
    <div className="flex mx-auto max-w-5xl py-10 bg-slate-500">
      <div className="flex-none max-w-xs items-start justify-normal bg-slate-50 rounded-lg">
        <Sidebar />
      </div>
      <div className="flex-auto">{children}</div>
    </div>
  );
}
