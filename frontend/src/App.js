import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import CompanyInf from "./page/CompanyInf";
import SelectCompany from "./page/SelectCompany";
import SubmitComplete from "./page/SubmitComplete";

function App() {
  return(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<CompanyInf />}></Route>
      <Route path="/complete" element={<SubmitComplete />}></Route>
      <Route path="/primecompany" element={<SelectCompany />}></Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App;
