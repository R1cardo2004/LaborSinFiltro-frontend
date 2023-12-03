import './sass_files/UserPage_main.css'
import Sidebar from '../main_feed/sidebar/sidebar';
import Grupos_recientes from "../main_feed/grupos_recientes/grupos_recientes";
import UserFeedbck from './UserFeedBack/UserFeedbck'
import { useState, useEffect } from 'react';
import {Sidebarcontext} from '../context/amborger.context.js'


function UserPage() {

    const [sidebarsee, setsidebarsee] = useState(true)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
        setWindowWidth(window.innerWidth);
        if (sidebarsee && window.innerWidth > 810) {
            setsidebarsee(false);
        }
        };

        window.addEventListener('resize', handleResize);

        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, [sidebarsee]);


    return(
        <div className='backgroundUserPage'>
            {sidebarsee && <Sidebar></Sidebar>}
            {windowWidth > 810 &&<div className="divisorline"></div>}
            <Sidebarcontext.Provider value={{setsidebarsee}}>
            <UserFeedbck></UserFeedbck>
            </Sidebarcontext.Provider>
            {windowWidth > 810 &&<div className="divisorline2"></div>}
            {windowWidth > 810 &&<Grupos_recientes></Grupos_recientes>}
        </div>
    )
}

export default UserPage