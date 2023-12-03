import './UserFeed_sass/UF_main.css'
import './UserFeed_sass/UF_likes&posts.css'
import Userbox from '../UserBox/Userbox'
import axios from 'axios'
import Post from './userpost'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {Sidebarcontext} from '../../context/amborger.context.js'
import { useContext } from 'react'
import Amborguesa from '../../assets/Menu.svg'

function UserBck() {
    const baseurl = import.meta.env.VITE_API_BASEURL;
    const uri =  baseurl + '/api/feed/user'
    const uriLike = baseurl+'/api/feed/likes'
    const [geturi, setgeturi] = useState(baseurl+'/api/feed/user')
    const {state} = useLocation();
    const { token } = state; 
    const [post, setpost] = useState([]);
    const [publicacionNueva, setPubliacionNueva] = useState(false)
    const [likebckclass, setlikebckclass] = useState('likebttn')
    const [postbckclass, setpostbckclass] = useState('postbttncolored')
    const {setsidebarsee} = useContext(Sidebarcontext)
    const [sidebarsee, setsidebar] = useState(false)
    

    const headers= {
        'authorisation': token
    }


    const getpost = () =>{
        axios.get(geturi,{headers: headers})
        .then((res) => {
            const post = res.data.post;
            setpost(post)
        })
    }

    const postbttnclick = () =>{
        setgeturi(uri)
        setPubliacionNueva(true)
        setpostbckclass('postbttncolored')
        setlikebckclass('likebttn')
    }

    const likebttnclick = () =>{
        setgeturi(uriLike)
        setPubliacionNueva(true)
        setpostbckclass('postbttn')
        setlikebckclass('likebttncolored')
    }

    useEffect(() => {
        if(publicacionNueva){
            setTimeout(() => {
                getpost();
                setPubliacionNueva(false)
            }, 1000);
        }else{
            getpost();
        }
    }, [publicacionNueva]);

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
    <div className='feedboxUser'>
        {windowWidth < 800 && <img className='menuamborguesaother' onClick={amborgesaclick} src={Amborguesa}></img>}
        <div className='faposition'>
            <div className='UBbck'></div>
            <Userbox></Userbox>
            <div className='fabcks'>
            <div className='lnpPosition'>
                <div className='lnpback' />
                <button className='likesPos' onClick={likebttnclick}>
                    <div className={likebckclass}/>
                    <div className='likesTxt' onClick={likebttnclick}>Likes</div>
                </button>
                <button className='postpos' onClick={postbttnclick}>
                    <div className={postbckclass} />
                    <div className='postTxt' onClick={postbttnclick} >posts</div>
                </button>
            </div>
            </div>
            <div className='scrollboxUser'>
            {post.map((post) => {
            return(
                <Post post= {post} key={post._id}></Post>
                )
            })}
            </div>
        </div>
    </div>
    )
}

export default UserBck