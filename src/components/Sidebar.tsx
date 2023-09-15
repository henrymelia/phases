import { useStartupStore } from "../state/useStartupStore";
import classNames from "classnames";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const { createDefaultStartup, startups, appReset, redirectToStartupId } =
    useStartupStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (redirectToStartupId) {
      navigate(`/${redirectToStartupId}`);
    }
  }, [redirectToStartupId, navigate]);

  return (
    <div className="flex flex-col justify-between text-center">
      <div className="px-4 py-6">
        <span className="grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
          PHASES APP
        </span>

        <div className="inset-x-0 bottom-0 border-t border-gray-100">
          <a href="#" className="flex items-center justify-center gap-2  p-4 ">
            <button onClick={createDefaultStartup}>➕ Add Startup</button>
          </a>
        </div>

        <ul className="mt-6 space-y-1">
          {startups.map(({ id, name, live }) => (
            <li key={id}>
              <NavLink
                to={`/${id}`}
                className={({ isActive }) =>
                  classNames(
                    "block",
                    "rounded-lg",
                    "px-4",
                    "py-2",
                    "text-sm",
                    "font-medium",
                    "transition-all",
                    "duration-200",
                    { "text-gray-700": !live || isActive },
                    { "text-gray-400": live && !isActive },
                    { "bg-gray-200": isActive }
                  )
                }
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <a href="#" className="flex items-center justify-center gap-2  p-4 ">
          <button onClick={appReset}>Reset</button>
        </a>
      </div>
    </div>
  );
}
