import './App.css';
import './assets/css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js";
import Login from './Pages/Login/Login';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import SignUp from './Pages/Signup/SignUp';
import { fetchuser } from './redux/actions/userAction';
import { fetchuserPost } from './redux/actions/userPostAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Dashboard from './Pages/dashboard/Dashboard';
import RingLoader from "react-spinners/RingLoader";
import Profile from './components/profile/Profile';
import Page404 from './Pages/page404/Page404';
import AddPost from './Pages/addPost/AddPost';
import OtherUserProfile from './Pages/OtherUserProfile/OtherUserProfile';

function App() {
  const user = useSelector(state => state.user.user)
  const userPost = useSelector(state => state.userPost.userPost)
  const dispatch = useDispatch()
  const [loader, setloader] = useState(false)

  useEffect(() => {
    dispatch(fetchuser())
  }, [])
  useEffect(() => {
    dispatch(fetchuserPost())
  }, [])
  useEffect(() => {
    setloader(true)
    setTimeout(() => {
      setloader(false)
    }, 3000);
  }, [])


  return (
    <>
      <div className='App'>
        {
          loader ?
            <div className='w-100 d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
              <RingLoader color={"#fa6132"} loading={loader} size={80} />
            </div>
            :
            <>
              <div className='blur' style={{ top: '40%' }}></div>
              <div className='blur' style={{ right: "50px" }}></div>
              <div className='blur' style={{ top: "350px", right: "400px", backgroundColor: "#e8886d" }}></div>
              <BrowserRouter>
                <Route exact path="/"><Redirect to="/signin" /></Route>
                {
                  localStorage.getItem("loginUser") ?
                    <>
                      <Route exact path="/signin"><Redirect to="/dashboard" /> </Route>
                      <Route exact path="/signup"><Redirect to="/dashboard" /></Route>
                      <Route path="/dashboard"><Dashboard /></Route>
                      <Route exact path="/profile"><Profile /></Route>
                      <Route exact path="/addpost"><AddPost /></Route>
                      <Route exact path="/otheruser/:id"><OtherUserProfile /></Route>
                    </>
                    :
                    <>
                      <Route exact path="/signin"><Login /></Route>
                      <Route path="/signup"><SignUp /></Route>
                      <Route exact path="/dashboard"><Redirect to="/signin" /></Route>
                      <Route exact path="/profile"><Redirect to="/signin" /></Route>
                      <Route exact path="/otheruser/:id"><Redirect to="/signin" /></Route>

                    </>
                }
                {/* <Route path="**"><Page404 /></Route> */}
              </BrowserRouter>
            </>
        }


      </div>
    </>
  );
}

export default App;
