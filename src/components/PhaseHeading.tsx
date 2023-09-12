import { ReactNode } from "react";

type Props = {
  position: number;
  children: ReactNode;
  completed?: boolean;
};

function PhaseHeading({ position, children, completed = false }: Props) {
  return (
    <h2 className="flex items-center gap-2 mb-2">
      <span className="bg-slate-950 w-8 h-8 text-slate-50 rounded-full flex items-center justify-center">
        {position}
      </span>
      {children}
      {completed && "✅"}
    </h2>
  );
}

export default PhaseHeading;
