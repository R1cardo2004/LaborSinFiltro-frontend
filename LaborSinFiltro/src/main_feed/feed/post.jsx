import OptionIcon from '../../assets/Meatballs_menu.svg';
import CommentsIcon from '../../assets/comment_duotone_line.svg';
import LikeIcon from '../../assets/favorito blend.svg';
import likeHover from '../../assets/favorito_hover.svg';
import likeClick from '../../assets/favorito_click.svg';
import UserIcon from '../../assets/User_duotone_line-1.svg';
import TagIcon from '../../assets/Group.svg';
import "./sass_files_writepost/writepostmain.css";
import PostSettings from '../../assets/Meatballs_menu.svg'
import {useEffect, useState} from 'react'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Comment from './comment';
import WriteComment from './writecomment';
import {PublicacionContexto} from '../../context/publicar.context'
import { useContext } from 'react';

const Post = ({post}) => {
    const {titulo,texto,autor,likes,comments,_id,tags} = post
    const baseurl = import.meta.env.VITE_API_BASEURL;
    const [imageUrl, setImageUrl] = useState(LikeIcon);
    const {state} = useLocation();
    const [commentsview, setccomentsview] = useState(false)
    const [tag1] = useState(tags[0].content[0])
    const [tag2] = useState(tags[0].content[1])
    const [tag3] = useState(tags[0].content[2])
    const [contenido, setcontenido] = useState('')
    const [settingsview, setsettingsview] = useState(false)
    const [reportview, setreportview] = useState(false)
    const { token } = state; 
    const {setPubliacionNueva} = useContext(PublicacionContexto)
    const likeURI = baseurl+"/api/feed/" + post._id
    const finduserUri = baseurl+'/api/usuario/findbyid'
    const reportaruri = baseurl+'/api/reporte/' + post._id
    const data = null
    
    const headers= {
        'authorisation': token
    }

    useEffect(() =>{
        axios.get(finduserUri, {headers: headers}).
        then((res)=>{
            const currenuser = res.data.usuario._id
            if(likes.some(object => object._id === currenuser)){
                setImageUrl(likeClick)
            }
        })        
    },[])

    const userData = (()=> {
        console.log(autor.username);
        console.log(likes);
    })

    const handleImageClick = () => {
        if (imageUrl === LikeIcon || imageUrl === likeHover) {
          setImageUrl(likeClick);
          axios.patch(likeURI,data, {headers: {authorisation: token}}, {timeout: 5000})
        } else {
          setImageUrl(LikeIcon);
          axios.patch(likeURI,data, {headers: {authorisation: token}}, {timeout: 5000})
        }
    };

    const handleImageHoverIn = () => {
        if (imageUrl == LikeIcon){
            setImageUrl(likeHover);
        }
    };
    
    const handleImageHoverOut = () => {
        if(imageUrl == likeHover){
            setImageUrl(LikeIcon);
        }
    };

    const commentsonclick = () => {
        setccomentsview(!commentsview)
    }

    const settingsclick = () => {
        setsettingsview(!settingsview)
    }

    const reportclick = () => {
        setsettingsview(!settingsview)
        setreportview(!reportview)

    }

    const submitreport = (e) => {
        e.preventDefault()
        const reportdata = {
            contenido: contenido
        }
        axios.post(reportaruri, reportdata, {headers: headers}).then((res) =>{
            console.log(res.status);
        })
        setreportview(!reportview)
    }

    return(
    <div className={`crearpostposition ${commentsview ? 'expanded' : ''}`}>
        <div className='creatpostbck' />
        <img src={PostSettings} className='Postsetting'></img>

        <div className='inputtxt'>{texto}</div>
        <div className='optionposition' >
            <img className='Postsetting' src={OptionIcon} onClick={settingsclick}/>
        </div>
        {settingsview && <div className='settingspos'>
            <div className='reporttittle' onClick={reportclick}>reportar post</div>
        </div>}
        {reportview && <div className='settingspos'>
            <div className='reporttittle'>razon de reporte</div>
            <form onSubmit={submitreport}>
            <textarea className='reportecontent'
            value={contenido}
            onChange={(e) => setcontenido(e.target.value)}
            ></textarea>
            <button className='reportbttn'>reportar</button>
            </form>
        </div>}
        <div className='sidebarpossition'>
            <div className={`sidebarbck ${commentsview ? 'expanded' : ''}`}/>
            <div className='commenticonposition'>
                <img className='commenticon' src={CommentsIcon} onClick={commentsonclick}/>
            </div>
            <div>
            </div>
            <div className='likeiconposition'>
                <img onClick={handleImageClick} onMouseEnter={handleImageHoverIn} onMouseLeave={handleImageHoverOut} className='likeicon' src={imageUrl} />
            </div>
        </div>
        {commentsview && <div className='scrollboxcomments'>
        <PublicacionContexto.Provider value={{setPubliacionNueva}}>
        <WriteComment _id={_id}></WriteComment>
        </PublicacionContexto.Provider>
        {comments.slice().reverse().map((comments) => {
        return(
                <Comment comments= {comments} key={comments._id}></Comment>
            )
        })}
        </div>}
        <div className='topbarposition'>
            <div className='tbback' />
            <div className='tbtittle'>{titulo}</div>
            <div className='usericonpositionPost'>
                <img onClick={userData} className='usericon' src={UserIcon} />
            </div>
        </div>
       {!commentsview && <div className='tagsposition'>
            <div className='tagsbck' />
            {tag3 && <div className='tag'>
                <div className='tagtxt' >{tag3}<br/><br/><br/><br/><br/></div>
                <div className='taiconposition'>
                <img className='tagicon' src={TagIcon} />
                </div>
            </div>}
            {tag2 && <div className='tag'>
                <div className='tagtxt'>{tag2}<br/><br/><br/><br/><br/></div>
                <div className='taiconposition'>
                <img className='tagicon' src={TagIcon} />
                </div>
            </div>}
            {tag1 && <div className='tag'>
                <div className='tagtxt'>{tag1}<br/><br/><br/><br/></div>
                <div className='taiconposition'>
                    <img className='tagicon' src={TagIcon} />
                </div>
            </div>}
        </div>}
    </div>

    )
}

export default Post;