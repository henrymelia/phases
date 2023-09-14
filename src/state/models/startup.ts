import { createModelListUpdater } from "../helpers";
import { Startup } from "../types";
import { nanoid } from "nanoid";

export const createDefaultStartup = (): Startup => ({
  id: nanoid(6), // TODO: Extract id generator fn to lib/utils.
  name: "New Startup",
  phases: [],
  congratulated: false,
  live: false,
  ongoingPhaseIndex: 0,
});

export const updateStartup = createModelListUpdater<Startup>();
