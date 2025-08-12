import { BrowserRouter ,Routes,Route} from 'react-router-dom'
import Body from './Components/Body.jsx'
import Login from './Components/Login.jsx'
import Profile from './Components/Profile.jsx'
import appStore from './utils/appStore.js'
import { Provider } from 'react-redux'; 
import Feed from './Components/Feed.jsx'
function App() {

  return (
   <>
   <Provider store={appStore}>
     <BrowserRouter basename="/">
       <Routes> 
       <Route path="/" element={<Body/>}>
       <Route path="/" element={<Feed/>}/>
         <Route path="/login" element={<Login/>}/>
         <Route path="/profile" element={<Profile/>}/>
         </Route>
       </Routes>
     </BrowserRouter>
     </Provider>
   </>
  )
}

export default App
