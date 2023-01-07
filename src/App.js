import Navbar from './Components/Navbar/Navbar.component';
import {Routes, Route} from 'react-router-dom';
import Home from './routes/home/home.component.jsx'
import Courses from './routes/courses/courses.component.jsx'
import Programs from './routes/programs/programs.component.jsx'
import Teachers from './routes/teachers/teachers.component.jsx'
import './App.css';
import SignIn from './routes/Authentication/sign-in.component';
import SignUp from './routes/Authentication/sign-up.component';
import VideoPlayer from './Components/VideoPlayer/VideoPlayer.component';
import MyCourses from './Components/MyCourses/MyCourses.component';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = "/" element = {<Navbar/>}>
          <Route index element={<Home/>}/>
          <Route path="courses" element={<Courses/>}/>
          <Route path="programs" element={<Programs/>}/>
          <Route path="teachers" element={<Teachers/>}/>
          <Route path="sign-in" element={<SignIn/>}/>
          <Route path="sign-up" element={<SignUp/>}/>
          <Route path="video-player" element={<VideoPlayer/>}/>
          <Route path="my-courses" element={<MyCourses/>}/>
          
        </Route>
      </Routes>
    </div>
  );
}

export default App;
