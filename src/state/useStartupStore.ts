import { StateCreator, create } from "zustand";
import { Phase, Startup, Task } from "./types";
import { persist, createJSONStorage } from "zustand/middleware";
import { nanoid } from "nanoid";

type AppState = {
  startups: Startup[];
  redirectToStartupId: string | null;

  // Startup actions
  createDefaultStartup: () => void;
  unsetRedirectToStartupId: () => void;
  updateStartup: (startupId: string, startup: Partial<Startup>) => void;
  deleteStartup: (id: string) => void;

  // Phase actions
  addPhase: (startupId: string, phase: Partial<Phase>) => void;
  updatePhase: (
    startupId: string,
    phaseId: string,
    phaseUpdates: Partial<Phase>
  ) => void;

  // Task actions
  addTask: (startupId: string, phaseId: string, task: Partial<Task>) => void;
  updateTask: (
    startupId: string,
    phaseId: string,
    taskId: string,
    taskUpdates: Partial<Task>
  ) => void;

  // App actions
  appReset: () => void;
};

const initialStartupsState: Startup[] = [
  {
    id: "z",
    name: "ZariTech",
    live: false,
    phases: [
      {
        id: "a",
        title: "Foundation",
        tasks: [
          { id: "a", title: "Task 1", description: "", done: false },
          { id: "b", title: "Task 2", description: "", done: false },
          { id: "c", title: "Task 3", description: "", done: false },
        ],
        completed: false,
      },
      {
        id: "b",
        title: "Discovery",
        tasks: [
          { id: "a", title: "Task 1", description: "", done: false },
          { id: "b", title: "Task 2", description: "", done: false },
          { id: "c", title: "Task 3", description: "", done: false },
        ],
        completed: false,
      },
      {
        id: "c",
        title: "Delivery",
        tasks: [
          { id: "a", title: "Task 1", description: "", done: false },
          { id: "b", title: "Task 2", description: "", done: false },
          { id: "c", title: "Task 3", description: "", done: false },
        ],
        completed: false,
      },
    ],
  },
  { id: "s", name: "System Labs", live: false, phases: [] },
  { id: "o", name: "OAKTEK", live: false, phases: [] },
  { id: "f", name: "FortitudeTech", live: false, phases: [] },
];

const createDefaultStartup = (): Startup => ({
  id: nanoid(6), // TODO: Extract id generator fn to lib/utils.
  name: "New Startup",
  phases: [],
  live: false,
});

const createPhase = (phase: Partial<Phase>): Phase => ({
  id: nanoid(6),
  title: "New Phase",
  tasks: [],
  completed: false,
  ...phase,
});

const createTask = (task: Partial<Task>): Task => ({
  id: nanoid(6),
  done: false,
  title: "New Task",
  description: "New Task Description",
  ...task,
});

type StartupUpdaterFn = (startup: Startup) => Startup;
const updateStartup = (
  startupId: string,
  startups: Startup[],
  startupUpdater: StartupUpdaterFn | Partial<Startup>
) =>
  startups.map((startup) =>
    startup.id === startupId
      ? typeof startupUpdater === "object"
        ? { ...startup, ...startupUpdater }
        : { ...startupUpdater(startup) }
      : startup
  );

type PhaseUpdaterFn = (phase: Phase) => Phase;
const updatePhase = (
  phaseId: string,
  phases: Phase[],
  phaseUpdater: PhaseUpdaterFn | Partial<Phase>
) =>
  phases.map((phase) =>
    phase.id === phaseId
      ? typeof phaseUpdater === "object"
        ? { ...phase, ...phaseUpdater }
        : { ...phaseUpdater(phase) }
      : phase
  );

type TaskUpdaterFn = (task: Task) => Task;
const updateTask = (
  taskId: string,
  tasks: Task[],
  taskUpdater: TaskUpdaterFn | Partial<Task>
) =>
  tasks.map((task) =>
    task.id === taskId
      ? typeof taskUpdater === "object"
        ? { ...task, ...taskUpdater }
        : { ...taskUpdater(task) }
      : task
  );

type TasksUpdaterFn = (tasks: Task[]) => Task[];
const updateStartupPhaseTasks = (
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
          completed: tasks.every(({ done }) => done),
          tasks,
        };
      });
      return {
        ...startup,
        live: phases.every(({ completed }) => completed),
        phases,
      };
    }),
  };
};

const stateCreator: StateCreator<AppState> = (set, get) => ({
  redirectToStartupId: null,
  startups: initialStartupsState,

  createDefaultStartup: () =>
    set((state) => {
      const newStartup = createDefaultStartup();
      return {
        startups: [newStartup, ...state.startups],
        redirectToStartupId: newStartup.id,
      };
    }),

  unsetRedirectToStartupId: () =>
    set(() => ({
      redirectToStartupId: null,
    })),

  updateStartup: (startupId, startupUpdates) =>
    set({
      startups: updateStartup(startupId, get().startups, startupUpdates),
    }),

  deleteStartup: (id) =>
    set({
      startups: get().startups.filter((startup) => startup.id !== id),
    }),

  addPhase: (startupId, phase) =>
    set({
      startups: updateStartup(startupId, get().startups, (startup) => ({
        ...startup,
        phases: [...startup.phases, createPhase(phase)],
      })),
    }),

  updatePhase: (startupId, phaseId, phaseUpdates) =>
    set({
      startups: updateStartup(startupId, get().startups, (startup) => ({
        ...startup,
        phases: updatePhase(phaseId, startup.phases, phaseUpdates),
      })),
    }),

  addTask: (startupId, phaseId, task) =>
    set((state) => {
      return updateStartupPhaseTasks(
        startupId,
        phaseId,
        state.startups,
        (tasks) => [...tasks, createTask(task)]
      );
    }),

  updateTask: (startupId, phaseId, taskId, taskUpdates) =>
    set((state) =>
      updateStartupPhaseTasks(startupId, phaseId, state.startups, (tasks) =>
        updateTask(taskId, tasks, taskUpdates)
      )
    ),

  appReset: () => set(() => ({ startups: initialStartupsState })),
});

export const useStartupStore = create<AppState>()(
  persist(stateCreator, {
    name: "phases-state",
    storage: createJSONStorage(() => localStorage),
  })
);
