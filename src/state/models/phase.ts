import { createModelListUpdater } from "../helpers";
import { Phase } from "../types";
import { nanoid } from "nanoid";

export const createPhase = (phase: Partial<Phase>): Phase => ({
  id: nanoid(6),
  title: "New Phase",
  tasks: [],
  completed: false,
  ...phase,
});

export const updatePhase = createModelListUpdater<Phase>();

export const resolveOngoingPhaseIndex = (phases: Phase[]): number =>
  phases.findIndex((phase) => !phase.completed && phase.tasks.length > 0);

export const isEveryPhaseCompleted = (phases: Phase[]) =>
  phases.every(({ completed }) => completed) && phases.length > 0;
