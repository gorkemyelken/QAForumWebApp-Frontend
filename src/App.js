import "./App.css";
import { BrowserRouter, redirect, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import User from "./components/User/User";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/users/:userId" element={<User />}></Route>
          <Route exact path="/auth" element={<Auth />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
