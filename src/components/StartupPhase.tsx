import { ChangeEventHandler, KeyboardEventHandler, useState } from "react";
import { Phase } from "../state/types";
import EditableText from "./lib/EditableText";
import PhaseTask from "./PhaseTask";
import { useStartupStore } from "../state/useStartupStore";

type Props = {
  startupId: string;
  phase: Phase;
  position: number;
  disabled?: boolean;
};

function StartupPhase({ startupId, phase, position, disabled = false }: Props) {
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const { addTask, updatePhase } = useStartupStore();

  const { id: phaseId, completed } = phase;

  const onNewTaskTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewTaskTitle(e.target.value);
  };

  const onNewTaskTitleKeyUp: KeyboardEventHandler = (e) => {
    if (e.key === "Enter") {
      if (newTaskTitle.length > 0) {
        addTask(startupId, phaseId, { title: newTaskTitle });
      }
    }

    if (e.key === "Enter" || e.key === "Escape") {
      setNewTaskTitle("");
    }
  };

  const onUpdatePhaseTitle = (updatedPhaseTitle: string) => {
    if (updatedPhaseTitle.length > 0) {
      updatePhase(startupId, phaseId, { title: updatedPhaseTitle });
    }
  };

  return (
    <li className="mt-4">
      <h2>
        {position} -{" "}
        <EditableText text={phase.title} onSave={onUpdatePhaseTitle} />{" "}
        {completed && "(complete)"}
      </h2>
      <ul className="pl-2">
        {phase.tasks.map((task) => (
          <PhaseTask
            key={task.id}
            startupId={startupId}
            phaseId={phaseId}
            task={task}
            disabled={disabled}
          />
        ))}
        <li className="py-0.5">
          <input type="checkbox" disabled />{" "}
          <input
            type="text"
            value={newTaskTitle}
            onChange={onNewTaskTitleChange}
            onKeyUp={onNewTaskTitleKeyUp}
            placeholder="Add a Task"
          />
        </li>
      </ul>
    </li>
  );
}

export default StartupPhase;
