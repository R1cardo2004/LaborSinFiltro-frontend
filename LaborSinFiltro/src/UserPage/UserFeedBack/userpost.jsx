import OptionIcon from '../../assets/Meatballs_menu.svg';
import CommentsIcon from '../../assets/comment_duotone_line.svg';
import LikeIcon from '../../assets/favorito blend.svg';
import likeHover from '../../assets/favorito_hover.svg';
import likeClick from '../../assets/favorito_click.svg';
import UserIcon from '../../assets/User_duotone_line-1.svg';
import TagIcon from '../../assets/Group.svg';
import "../../main_feed/feed/sass_files_writepost/writepostmain.css";
import {useEffect, useState} from 'react'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Comment from '../../main_feed/feed/comment';

const Post = ({post}) => {
    const baseurl = import.meta.env.VITE_API_BASEURL;
    const {titulo,texto,autor,likes,comments,tags} = post
    const [imageUrl, setImageUrl] = useState(LikeIcon);
    const {state} = useLocation();
    const [commentsview, setccomentsview] = useState(false)
    const { token } = state; 
    const likeURI = baseurl + "/api/feed/" + post._id
    const finduserUri = baseurl + '/api/usuario/findbyid'
    const data = null
    const [tag1] = useState(tags[0].content[0])
    const [tag2] = useState(tags[0].content[1])
    const [tag3] = useState(tags[0].content[2])

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
        console.log(comments);
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
        if(comments.length === 0){
            setccomentsview(commentsview)
        }else{
            setccomentsview(!commentsview)
        }
    }


    return(
    <div className={`crearpostposition ${commentsview ? 'expanded' : ''}`}>
        <div className='creatpostbck' />
        <div className='inputtxt'>{texto}</div>
        <div className='optionposition'>
            <img className='optionicon' src={OptionIcon}/>
        </div>
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