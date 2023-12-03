import './GF_sass/GFeedmain.css'
import GroupPost from './GroupPosts/GroupPost'
import axios from 'axios'
import { useEffect, useState } from 'react'
import {Sidebarcontext} from '../../context/amborger.context.js'
import { useContext } from 'react'
import Amborguesa from '../../assets/Menu.svg'


function Gfbck() {
    const baseurl = import.meta.env.VITE_API_BASEURL;
    const uri =baseurl+'/api/grupo/'
    const [grupo, setpost] = useState([]);
    const {setsidebarsee} = useContext(Sidebarcontext)
    const [sidebarsee, setsidebar] = useState(false)

    const getgroups = () =>{
        axios.get(uri)
        .then((res) => {
            const post = res.data.Grupo;
            setpost(post)
        })
    }

    useEffect(() => {
        setTimeout(() => {
            getgroups();
        }, 1000); 
    }, []);

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
        <div className='feedboxGF'>
            <div className='fapositionGFeed'>
            {windowWidth < 800 && <img className='menuamborguesaGf' onClick={amborgesaclick} src={Amborguesa}></img>}
            <div className='fabckGFeed'></div>
            <div className='tittlePos'>
                <div className='Tbck'/>
                <div className='tittleText'>descubre nuevas comunidades</div>
            </div>
            <div className='scrollboxGFeed'>
                    {grupo.map((grupo) => {
                    return(
                    <GroupPost grupo= {grupo} key={grupo._id}></GroupPost>
                    )
                    })}
            </div>
            </div>
        </div>
    )
}

export default Gfbck