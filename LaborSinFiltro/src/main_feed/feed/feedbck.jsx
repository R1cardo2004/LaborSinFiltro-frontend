import HashtagIcon from '../../assets/Group.svg'
import './sass_files_feedbck/FAmain.css'
import CrearPost from './write_post'
import Post from './post'
import axios from 'axios'
import { useEffect, useState } from 'react'
import {PublicacionContexto} from '../../context/publicar.context'
import Amborguesa from '../../assets/Menu.svg'
import {Sidebarcontext} from '../../context/amborger.context.js'
import { useContext } from 'react'
 
function Feedbck() {
    const baseurl = import.meta.env.VITE_API_BASEURL;
    const uri =baseurl+'/api/feed/'
    const [post, setpost] = useState([]);
    const [publicacionNueva, setPubliacionNueva] = useState(false)
    const {setsidebarsee} = useContext(Sidebarcontext)
    const [sidebarsee, setsidebar] = useState(false)
    const [tags, settags] = useState([])
    const tagCount = {};
    const gettagsuri = baseurl + '/api/trends/all'
    
    
    const gettags = () => {
        axios.get(gettagsuri).then((res)=>{
            settags(res.data)
        })
    }
    
    tags.forEach(item => {
        const tag = item.tag;
    
        // Check if the tag has been encountered before
        if (tagCount[tag]) {
            tagCount[tag]++; // Increment the count for this tag
        } else {
            tagCount[tag] = 1; // Initialize the count for this tag
        }
    });
    
    // Find and store the top 5 most duplicated tags
    const topDuplicates = Object.keys(tagCount)
        .sort((a, b) => tagCount[b] - tagCount[a]) // Sort by count in descending order
        .slice(0, 5); // Take the top 5
    
    const [firstTag, secondTag, thirdTag, fourthTag, fifthTag] = topDuplicates;

    const getpost = () =>{
        axios.get(uri)
        .then((res) => {
            const post = res.data.post;
            setpost(post)
        })
    }
    
    useEffect(() => {
        gettags()
        if(publicacionNueva){
            setTimeout(() => {
                getpost();
                setPubliacionNueva(false)
            }, 2000);
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
    <div className='feedbox'>
        {windowWidth < 800 && <img className='menuamborguesa' onClick={amborgesaclick} src={Amborguesa}></img>}
    <div className='faposition'>
        <div className='fabck'></div>
    <div className='trendsNtittleposition'>
        <div className='TNTbck' />
        <div className='trendbox'>
        <div className='trendposition'>
                <div className='fatittle' >tendencias</div>
            </div>
            {firstTag && <div className='trendposition'>
                <div className='trendtxt' >{firstTag}</div>
                <div className='faiconposition'>
                <img className='faicon'  src={HashtagIcon}/>
                </div>
            </div>}
            {secondTag && <div className='trendposition'>
                <div className='trendtxt'>{secondTag}<br/></div>
                <div className='faiconposition'>
                <img className='faicon'  src={HashtagIcon}/>
                </div>
            </div>}
            {thirdTag && <div className='trendposition'>
                <div className='trendtxt'>{thirdTag}<br/><br/></div>
                <div className='faiconposition'>
                <img className='faicon'  src={HashtagIcon}/>
                </div>
            </div>}
            {fourthTag && <div className='trendposition'>
                <div className='trendtxt'>{fourthTag}<br/><br/><br/></div>
                <div className='faiconposition'>
                <img className='faicon'  src={HashtagIcon}/>
                </div>
            </div>}
            {fifthTag && <div className='trendposition'>
                <div className='trendtxt'>{fifthTag}<br/><br/><br/></div>
                <div className='faiconposition'>
                <img className='faicon'  src={HashtagIcon}/>
                </div>
            </div>}
        </div>
    </div>
    <div className='scrollbox'>
    <PublicacionContexto.Provider value={{setPubliacionNueva}}>
        <CrearPost />
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

export default Feedbck;