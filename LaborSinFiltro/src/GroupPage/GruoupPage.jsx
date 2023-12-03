import './GP_sass/GPmain.css'
import Sidebar from '../main_feed/sidebar/sidebar'
import GPback from './GPbck/GPBack'
import GroupSidebar from './GroupSidebar/GSide'
import { useLocation } from 'react-router-dom'
import {Sidebarcontext} from '../context/amborger.context.js'
import { useEffect, useState } from 'react'

function GroupPage () {
    const {state} = useLocation();
    const { Integrantes, favedby } = state; 

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
        <div className='backgroundGP'>
        {sidebarsee &&<Sidebar></Sidebar>}
        {windowWidth > 810 && <div className='divisorlinegp'></div>}
        <Sidebarcontext.Provider value={{setsidebarsee}}>
        <GPback Integrantes={Integrantes} favedby={favedby}></GPback>
        </Sidebarcontext.Provider>
        {windowWidth > 810 &&<div className='divisorline2gp'></div>}
        {windowWidth > 810 && <GroupSidebar Integrantes={Integrantes}></GroupSidebar>}
        </div>
    )
}

export default GroupPage