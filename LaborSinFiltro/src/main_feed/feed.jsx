import "./sass_files_feed/mainfeed.css"
import Sidebar from './sidebar/sidebar';
import Grupos_recientes from "./grupos_recientes/grupos_recientes";
import Feed_bck from "./feed/feedbck";
import { useEffect, useState } from "react";
import {Sidebarcontext} from '../context/amborger.context.js'
import Tittle from "./tittle/tittle";

function Feed() {
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

  return (
    <div className='backgroundmainfeed'>
    {windowWidth > 810 && <Tittle></Tittle>}
    {sidebarsee && <Sidebar></Sidebar>}
    {windowWidth > 810 && <div className="divisorline"></div>}
    <Sidebarcontext.Provider value={{setsidebarsee}}>
    <Feed_bck></Feed_bck>
    </Sidebarcontext.Provider>
    {windowWidth > 810 && <div className="divisorline2"></div>}
    {windowWidth > 810 &&<Grupos_recientes></Grupos_recientes>}  
    </div>
  )
}

export default Feed