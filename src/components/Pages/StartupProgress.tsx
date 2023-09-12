import { useParams } from "react-router-dom";
import { useStartupStore } from "../../state/useStartupStore";
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import EditableText from "../lib/EditableText";
import StartupPhase from "../StartupPhase";
import { Phase } from "../../state/types";
// import AlertDialogDemo from "../lib/AlertDialog";

function StartupProgress() {
  const { id } = useParams();
  const startup = useStartupStore(
    useCallback((state) => state.startups.find((s) => s.id === id), [id])
  );
  const {
    deleteStartup,
    updateStartup,
    redirectToStartupId,
    unsetRedirectToStartupId,
    addPhase,
  } = useStartupStore();
  const [newPhaseTitle, setNewPhaseTitle] = useState<string>("");

  useEffect(() => {
    setNewPhaseTitle("");
    if (id === redirectToStartupId) {
      unsetRedirectToStartupId();
    }
  }, [redirectToStartupId, unsetRedirectToStartupId, id]);

  if (!startup || !id) return <span>Not found.</span>;

  const { name, phases, id: startupId } = startup;

  const onDeleteButtonClick = () => deleteStartup(id);

  const onStartupNameUpdate = (updatedName: string) => {
    if (updatedName.length > 0) {
      updateStartup(startupId, { name: updatedName });
    }
  };

  const onNewPhaseTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewPhaseTitle(e.target.value);
  };

  const onNewPhaseTitleKeyUp: KeyboardEventHandler = (e) => {
    if (e.key === "Enter") {
      if (newPhaseTitle.length > 0) {
        addPhase(startupId, { title: newPhaseTitle });
      }
    }

    if (e.key === "Enter" || e.key === "Escape") {
      setNewPhaseTitle("");
    }
  };

  const isPhaseDisabled = (phase: Phase, phaseIndex: number): boolean => {
    if (phaseIndex > 0 && !phases[phaseIndex - 1].completed) return true;
    if (phaseIndex > 0 && phases[phaseIndex - 1].completed && !phase.completed)
      return false;
    if (phaseIndex < phases.length - 1 && phase.completed) return false;
    return false;
  };

  return (
    <div className="px-10">
      <div>
        <button onClick={onDeleteButtonClick}>Delete</button>
      </div>

      <h1 className="text-3xl font-medium pb-4">
        <EditableText text={name} onSave={onStartupNameUpdate} />
      </h1>

      <ul className="pl-4">
        {phases.map((phase, index) => (
          <StartupPhase
            key={phase.id}
            startupId={startupId}
            position={index + 1}
            phase={phase}
            disabled={isPhaseDisabled(phase, index)}
          />
        ))}
        <li className="mt-4">
          {phases.length + 1} -{" "}
          <input
            type="text"
            value={newPhaseTitle}
            onChange={onNewPhaseTitleChange}
            onKeyUp={onNewPhaseTitleKeyUp}
            placeholder="Add a Phase"
          />
        </li>
      </ul>
      {/* TODO: Inform the user */}
      {/* <AlertDialogDemo /> */}
    </div>
  );
}

export default StartupProgress;
