import classNames from "classnames";
import { MouseEventHandler, ReactNode } from "react";

type Props = {
  title?: string;
  show?: boolean;
  children?: ReactNode;
  onDismiss?: MouseEventHandler<HTMLButtonElement>;
};

const AlertDialog = ({
  title,
  show = true,
  children = null,
  onDismiss,
}: Props) => (
  <div
    className={classNames(
      "absolute top-0 left-0 w-full h-full bg-blend-overlay  justify-center bg-slate-50 bg-opacity-50",
      { flex: show, hidden: !show }
    )}
  >
    <div
      role="alert"
      className="rounded-xl border border-gray-100 bg-white p-4 self-center"
    >
      <div className="flex items-start gap-4">
        <div className="flex-1">
          {title && (
            <strong className="block font-medium text-gray-900">
              {" "}
              {title}{" "}
            </strong>
          )}

          {children}
        </div>

        <button
          className="text-gray-500 transition hover:text-gray-600"
          onClick={onDismiss}
        >
          <span className="sr-only">Dismiss popup</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
);

export default AlertDialog;
