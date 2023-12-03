import './GPbck_sass/GPMain.css'
import GroupBox from '../Groupbox/Groupbox'
import WriteGroupPost from './WriteGroupPost.jsx'
import Post from '../../main_feed/feed/post.jsx'
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import {useEffect, useState, useContext} from 'react'
import {PublicacionContexto} from '../../context/publicar.context'
import {Sidebarcontext} from '../../context/amborger.context.js'
import Amborguesa from '../../assets/Menu.svg'

function GPback({Integrantes, favedby}) {
    const baseurl = import.meta.env.VITE_API_BASEURL;
    const {state} = useLocation();
    const { grupo } = state;
    const uri =baseurl+'/api/post/grupo/' + grupo
    const [post, setpost] = useState([]);
    const [publicacionNueva, setPubliacionNueva] = useState(false) 
    const {setsidebarsee} = useContext(Sidebarcontext)
    const [sidebarsee, setsidebar] = useState(false) 

    const getpost = () =>{
        axios.get(uri)
        .then((res) => {
            const post = res.data.post;
            setpost(post)
        })
    }

    useEffect(() =>{
        if(publicacionNueva){
            setTimeout(() => {
                getpost();
                setPubliacionNueva(false)
            }, 2000);
        }else{
            getpost();
        }
    },[publicacionNueva])

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
        setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    const amborgesaclick = () =>{
        setsidebar(!sidebarsee)
        setsidebarsee(sidebarsee)
    }

    return(
        <div className="feedboxGP">
            {windowWidth < 800 && <img className='menuamborguesaGP' onClick={amborgesaclick} src={Amborguesa}></img>}
            <div className='fapositionGP'>
                <div className='GBbck'></div>
                <GroupBox Integrantes={Integrantes} favedby={favedby}></GroupBox>
                <div className='fabcksGP'></div>
                <div className='scrollboxGP'>
                <PublicacionContexto.Provider value={{setPubliacionNueva}}>
                <WriteGroupPost></WriteGroupPost>
                </PublicacionContexto.Provider>
                <PublicacionContexto.Provider value={{setPubliacionNueva}}>
                {post.map((post) => {
                return(
                    <Post post= {post} key={post._id}></Post>
                    )
                })}
                </PublicacionContexto.Provider>
                </div>
            </div>

        </div>
    )
}

export default GPback