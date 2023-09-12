export type Task = {
  id: string;
  title: string;
  description: string;
  done: boolean;
};

export type Phase = {
  id: string;
  title: string;
  tasks: Task[];
  completed: boolean;
};

export type Startup = {
  id: string;
  name: string;
  phases: Phase[];
  ongoingPhaseIndex: number;
  congratulated: boolean;
  live: boolean;
};
