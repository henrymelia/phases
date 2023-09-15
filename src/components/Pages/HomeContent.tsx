import WarningMessage from "../WarningMessage";

function HomeContent() {
  return (
    <main className="px-10 flex flex-col items-center gap-4">
      <h1 className="font-semibold text-2xl">Welcome to Phases App</h1>
      <div className="flex gap-4">
        <p className="text-4xl">👈</p>
        <p className="text-xl">
          Select an startup in the sidebar or create a new one.
        </p>
      </div>
      <WarningMessage>
        <strong className="block font-medium text-red-800">
          How to use the app
        </strong>
        <p className="mt-2 text-sm text-red-700">
          You'll spot the <strong>Add Startup</strong> button in the sidebar.
          For editing, just click the text. To finish editing, either exit the
          input or hit Enter. Cancel with the Escape key. If you clear the input
          and press Enter, the edit cancels. It's a weekend project, a bit
          buggy, but honest work. Hope you like it, and thanks for your time!
        </p>
      </WarningMessage>
    </main>
  );
}

export default HomeContent;
