import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Components/Landing";
import Home from "./Components/Home";
import { RecipeCreate } from "./Components/Form";
import RecipesDetails from "./Components/Detail";
function App() {
  return (
    <BrowserRouter>
   <div className="App">
    <Routes>
      <Route exact path= '/' element={<LandingPage/>}/>
      <Route path = '/home' element={<Home/>}/>
      <Route path = '/recipe/:id' element={<RecipesDetails/>}/>
      <Route path = '/form' element={<RecipeCreate/>}/>
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
