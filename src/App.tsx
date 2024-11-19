import { lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const Loading = lazy(() => import("./components/Loading"));
const Home = lazy(() => import("./pages/Home"));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
