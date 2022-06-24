import "./app.css";
import Login from "./components/login/Login";
import React from "react";
import AdminView from "./components/AdminView/AdminView";
import StudentView from "./components/StudentView/StudentView";
import TeacherView from "./components/TeacherView/TeacherView";
import {AuthProvider} from "./contexts/AuthContext";
import ProtectedRoutesStudent from "./ProtectedRoutesStudent"
import ProtectedRoutesTeacher from "./ProtectedRoutesTeacher"

import Nav from "./components/Nav/Nav"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DBProvider } from "./contexts/DBContext"
/* 
  green:"#82D9A0",
  red:"#CD5D67",
  lessRed:"#E6A9A7",
  white:"#FFF5E6",
  grey:"#434556"
   */

function App() {

  

  return (
    <AuthProvider>
      <DBProvider>
      <div className="app-div">
          <Nav></Nav>
          {/* <Login></Login> */}
          {/* <AdminView></AdminView> */}
          {/* <MainView></MainView> */}
          {/* <StudentView></StudentView> */}
          <Router>
            <Routes>
              <Route path="/" element={<Login/>}></Route>
              <Route element={<ProtectedRoutesStudent/>}>
                <Route path="/student" element={<StudentView/>}></Route>
              </Route>
              <Route element={<ProtectedRoutesTeacher/>}>
                <Route path="/teacher" element={<TeacherView/>}></Route>
              </Route>
              
            </Routes>
          </Router>
      </div>
      </DBProvider>
    </AuthProvider>
  );
}

export default App;
