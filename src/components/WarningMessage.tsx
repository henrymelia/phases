import { ReactNode } from "react";

type Props = { children: ReactNode };

function WarningMessage({ children }: Props) {
  return (
    <div
      role="alert"
      className="rounded border-s-4 border-yellow-500 bg-yellow-50 p-4"
    >
      {children}
    </div>
  );
}

export default WarningMessage;
