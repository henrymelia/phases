import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AdminLayout from "./components/AdminLayout";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AdminLayout>Hello</AdminLayout>
    </>
  );
}

export default App;
