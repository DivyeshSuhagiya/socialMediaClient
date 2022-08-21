import './App.css';
import './assets/css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login/Login';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import SignUp from './Pages/Signup/SignUp';
import { fetchuser } from './redux/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Dashboard from './Pages/dashboard/Dashboard';
import RingLoader from "react-spinners/RingLoader";

function App() {
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  const [loader, setloader] = useState(false)

  useEffect(() => {
    dispatch(fetchuser())
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
              <div className='blur' style={{top:"350px" , right : "400px" , backgroundColor:"#e8886d"}}></div>
              <BrowserRouter>
              <Route exact path="/"><Redirect to="/signin" /></Route>
                {
                  localStorage.getItem("loginUser") ?
                  <>
                    <Route exact path="/signin"><Redirect to="/dashboard" /> </Route>
                    <Route exact path="/signup"><Redirect to="/dashboard" /></Route>
                    <Route path="/dashboard"><Dashboard /></Route>
                  </>
                    :
                    <>
                      <Route exact path="/signin"><Login /></Route>
                      <Route path="/signup"><SignUp /></Route>
                      <Route exact path="/dashboard"><Redirect to="/signin" /></Route>
                    </>
                }
                
              </BrowserRouter>
            </>
        }


      </div>
    </>
  );
}

export default App;
