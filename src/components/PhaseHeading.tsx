import classNames from "classnames";
import { ReactNode } from "react";

type Props = {
  position: number;
  children: ReactNode;
  completed?: boolean;
  disabled?: boolean;
};

function PhaseHeading({
  position,
  children,
  completed = false,
  disabled = false,
}: Props) {
  return (
    <h2 className="flex items-center gap-2 mb-2">
      <span
        className={classNames(
          "bg-slate-950",
          "w-8 h-8",
          "text-slate-50",
          "rounded-full",
          "flex",
          "items-center",
          "justify-center",
          {
            "opacity-40": disabled,
          }
        )}
      >
        {position}
      </span>
      {children}
      {completed && "✅"}
    </h2>
  );
}

export default PhaseHeading;
