import { useStartupStore } from "../../state/useStartupStore";
import Sidebar from "../Sidebar";

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  const startupStore = useStartupStore();

  return (
    <div className="flex items-start max-w-5xl">
      <div className="flex-none max-w-xs justify-normal bg-slate-100 rounded-2xl">
        <Sidebar />
      </div>
      <div className="flex-auto">{children}</div>
      <code>
        <pre>{JSON.stringify(startupStore, null, 2)}</pre>
      </code>
    </div>
  );
}
