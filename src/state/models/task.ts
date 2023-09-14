import { Startup, Task } from "../types";
import { nanoid } from "nanoid";
import { createModelListUpdater } from "../helpers";
import { updateStartup } from "./startup";
import {
  isEveryPhaseCompleted,
  resolveOngoingPhaseIndex,
  updatePhase,
} from "./phase";

export const createTask = (task: Partial<Task>): Task => ({
  id: nanoid(6),
  done: false,
  title: "New Task",
  description: "New Task Description",
  ...task,
});

export const updateTask = createModelListUpdater<Task>();

type TasksUpdaterFn = (tasks: Task[]) => Task[];
export const updateStartupPhaseTasks = (
  startupId: string,
  phaseId: string,
  startups: Startup[],
  tasksUpdater: TasksUpdaterFn
) => {
  return {
    startups: updateStartup(startupId, startups, (startup) => {
      const phases = updatePhase(phaseId, startup.phases, (phase) => {
        const tasks = tasksUpdater(phase.tasks);

        return {
          ...phase,
          completed: tasks.every(({ done }) => done) && tasks.length > 0,
          tasks,
        };
      });
      const ongoingPhaseIndex = resolveOngoingPhaseIndex(phases);

      return {
        ...startup,
        live: isEveryPhaseCompleted(phases),
        phases,
        ongoingPhaseIndex: ongoingPhaseIndex,
        congratulated: ongoingPhaseIndex >= 0,
      };
    }),
  };
};
