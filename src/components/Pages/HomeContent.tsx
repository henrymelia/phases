import WarningMessage from "../WarningMessage";

function HomeContent() {
  return (
    <main className="px-10">
      <h1 className="font-semibold text-2xl">Welcome to Phases App</h1>
      <p className="text-xl">
        👈 Select an startup in the sidebar or create a new one.
      </p>
      <WarningMessage>
        <strong className="block font-medium text-red-800">
          Just a note about the app usage
        </strong>
        <p className="mt-2 text-sm text-red-700">
          You will find the "+ Add Startup" button in the sidebar. For editing
          the entities, you have to click the text and after editing, quitting
          focus from the input or hitting the enter key will do the job; with
          the escape key, you can cancel the edition. Also note that if you
          empty the input and hit enter, the edition will be canceled. This is
          what I could do in my free time during the weekend, It is a little bit
          glitchy, but it is honest work. I hope you like it and thank you for
          your time!
        </p>
      </WarningMessage>
    </main>
  );
}

export default HomeContent;
