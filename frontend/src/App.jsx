import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home.jsx"
import SignIn from "./pages/signIn.jsx";
import SignUp from "./pages/Signup.jsx";
import AddCompany from "./pages/AddCompany.jsx";
import CompanyDetail from "./pages/CompanyDetails.jsx";
import AddReview from "./pages/AddReview.jsx";



function App() {
  return (
    <BrowserRouter>
    <Header />
     <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/add-company" element={<AddCompany />} />
         <Route path="/company/:id" element={<CompanyDetail />} />
         <Route path="/company/:id/review" element={<AddReview />} />
         <Route path="/signin" element={<SignIn />} />
         <Route path="/signup" element={<SignUp />} />
     </Routes>
    </BrowserRouter>
  );
}

export default App
