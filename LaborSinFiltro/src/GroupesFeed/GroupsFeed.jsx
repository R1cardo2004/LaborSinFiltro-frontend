import './GF_sass/GFmain.css'
import Sidebar from '../main_feed/sidebar/sidebar'
import Grupos_recientes from '../main_feed/grupos_recientes/grupos_recientes'
import Gfbck from './GroupFeedBack/GFback'
import { useEffect, useState } from "react";
import {Sidebarcontext} from '../context/amborger.context.js'

function GroupesFeed() {
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
        <div className='backgroundGF'>
            {sidebarsee &&<Sidebar></Sidebar>}
            {windowWidth > 810 &&<div className='divisorlinegf'></div>}
            <Sidebarcontext.Provider value={{setsidebarsee}}>
            <Gfbck></Gfbck>
            </Sidebarcontext.Provider>
            {windowWidth > 810 &&<div className='divisorline2gf'></div>}
            {windowWidth > 810 && <Grupos_recientes></Grupos_recientes>}
        </div>
    )
}

export default GroupesFeed