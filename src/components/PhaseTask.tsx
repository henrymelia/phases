import { ChangeEventHandler } from "react";
import { Task } from "../state/types";
import { useStartupStore } from "../state/useStartupStore";
import EditableText from "./lib/EditableText";

type Props = {
  startupId: string;
  phaseId: string;
  task: Task;
  disabled?: boolean;
};

function PhaseTask({ startupId, phaseId, task, disabled = false }: Props) {
  const { updateTask } = useStartupStore();
  const { id: taskId, done } = task;

  const onTaskTitleUpdate = (taskUpdatedTitle: string) => {
    if (taskUpdatedTitle.length > 0) {
      updateTask(startupId, phaseId, taskId, { title: taskUpdatedTitle });
    }
  };

  const onTaskDoneChange: ChangeEventHandler<HTMLInputElement> = () =>
    updateTask(startupId, phaseId, taskId, { done: !done });

  return (
    <li className="py-1">
      <input
        type="checkbox"
        checked={done}
        onChange={onTaskDoneChange}
        disabled={disabled}
      />{" "}
      <EditableText
        text={task.title}
        onSave={onTaskTitleUpdate}
        className="p-1"
      />
    </li>
  );
}

export default PhaseTask;
