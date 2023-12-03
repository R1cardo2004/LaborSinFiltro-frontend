import './index.css';
import Login from './login/login.jsx';
import RegisterPage from './register/RegisterPage.jsx'
import Confirmcode from './confirmcode/confirmcode';
import Feed from './main_feed/feed';
import UserPage from './UserPage/UserPage';
import GroupPage from './GroupPage/GruoupPage';
import GroupesFeed from './GroupesFeed/GroupsFeed';
import CreatGroup from './CreateGroup/CreateGroup';

import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";

function App() {

   

    return (
            <BrowserRouter>
                <Routes>
                    <Route>
                        <Route path='/' element={<Login/>} />
                        <Route path='/feed' element={<Feed/>} />
                        <Route path='/register' element={<RegisterPage/>} />
                        <Route path='/confirm' element={<Confirmcode/>} />
                        <Route path='/user' element={<UserPage/>} />
                        <Route path='/groupfeed' element={<GroupesFeed/>}/>
                        <Route path='/group' element={<GroupPage/>} />
                        <Route path='/groupcreate' element={<CreatGroup/>} />
                    </Route>
                </Routes>
            </BrowserRouter>
    )

}

export default App