import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import NavBar from "./components/NavBar";
import Home from "./Pages/Home";
import Tracker from "./Pages/Tracker";

function App() {
  const location = useLocation();
  return (
    <>
      <h1></h1>
      <NavBar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<Home />} />
          <Route path="/tracker" element={<Tracker />} />
        </Routes>
      </AnimatePresence>
      <footer></footer>
    </>
  );
}

export default App;
