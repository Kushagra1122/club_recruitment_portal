import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useTheme } from "./context/Theme";
import Dashboard from "./pages/Dashboard/Dashboard";
import Club from "./pages/Club";
import CreateClub from "./pages/CreateClub";
import MyClub from "./pages/MyClub";
import CreateSig from "./pages/CreateSig";
import MySig from "./pages/MySig";
import Recruitment from "./pages/Recruitment";
import "react-datepicker/dist/react-datepicker.css";
import Announcements from "./pages/Announcements";
import ClubPrefer from "./pages/ClubPrefer";
import SigPrefer from "./pages/SigPrefer";

function App() {
  const [theme] = useTheme();
  return (
    <div
      id={theme}
      className="flex flex-col justify-between h-screen items-stretch"
    >
      <div>
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/clubs" element={<Club />} />
            <Route exact path="/clubs/create" element={<CreateClub />} />
            <Route exact path="/createSigs/:id" element={<CreateSig />} />
            <Route exact path="/sigs/:id" element={<MySig />} />
            <Route exact path="/club/:id" element={<MyClub />} />
            <Route exact path="/recruitment/:id" element={<Recruitment />} />
            <Route exact path="/announcement" element={<Announcements />} />
            <Route exact path="/clubPrefer" element={<ClubPrefer />} />
            <Route exact path="/sigPrefer/:id" element={<SigPrefer />} />
            <Route exact path="/*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
