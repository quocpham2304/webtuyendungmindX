import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./assets/css/style.css";
import "./assets/css/typography.css";
import "./assets/css/shortcodes/shortcodes.css";
import "./assets/css/style.css";
import "./assets/css/color/color-1.css";

import LandingPage from "./LandingPage/LandingPage";
import Login from "./Auth/Login";
import Admin from "./Admin/Admin";
import ThemeContextProvider from "./Admin/Context/ThemeContext";
import Tuyendungscreen from "./LandingPage/ViTriTuyenDung/Tuyendungscreen";
import TestQuestion from "./Question/TestQuestion";

const App = () => {
  //test
  return (
    <BrowserRouter>
      <ThemeContextProvider>
        <Routes>
          <Route path="/webtuyendungmindX" element={<LandingPage />} />
          <Route path="/webtuyendungmindX/chittiet/:id?" element={<Tuyendungscreen />} />
        <Route path="/login" element={<Login />} />
          <Route path="/admin*" element={<Admin />} />
          <Route path="/questions/:id" element={<TestQuestion />} />
      </Routes>
      </ThemeContextProvider>
    </BrowserRouter>
  );
};
export default App;
