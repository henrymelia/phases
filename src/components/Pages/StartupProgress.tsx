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
import AlertDialog from "../lib/AlertDialog";

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
  const [newPhaseTitle, setNewPhaseTitle] = useState("");
  const [randomPhrase, setRandomPhrase] = useState(null);

  useEffect(() => {
    if (startup?.live && !startup.congratulated) {
      // eslint-disable-next-line no-inner-declarations
      async function retrievePhrase() {
        const res = await fetch(
          "https://uselessfacts.jsph.pl/api/v2/facts/random"
        );
        const parsedRes = await res.json();
        setRandomPhrase(parsedRes.text);
        updateStartup(startupId, { congratulated: true });
      }

      retrievePhrase();
    }
  }, [startup]);

  useEffect(() => {
    setNewPhaseTitle("");
    if (id === redirectToStartupId) {
      unsetRedirectToStartupId();
    }
    setRandomPhrase(null);
  }, [redirectToStartupId, unsetRedirectToStartupId, id]);

  if (!startup || !id) return <span>Not found.</span>;

  const { name, phases, id: startupId, live } = startup;

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

  const isPhaseDisabled = (phaseIndex: number): boolean =>
    startup.ongoingPhaseIndex >= 0 && startup.ongoingPhaseIndex < phaseIndex;

  return (
    <div className="px-10">
      <div>
        <button onClick={onDeleteButtonClick}>Delete</button>
      </div>

      <h1 className="text-3xl font-medium pb-4">
        <EditableText text={name} onSave={onStartupNameUpdate} />{" "}
        {live && "LIVE"}
      </h1>

      <ul className="pl-4">
        {phases.map((phase, index) => (
          <StartupPhase
            key={phase.id}
            startupId={startupId}
            position={index + 1}
            phase={phase}
            disabled={isPhaseDisabled(index)}
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

      <AlertDialog
        title={`${name} project is live!`}
        onDismiss={() => setRandomPhrase(null)}
        show={!!randomPhrase}
      >
        <p className="mt-1 text-sm text-gray-700 max-w-xs">{randomPhrase}</p>
      </AlertDialog>
    </div>
  );
}

export default StartupProgress;
