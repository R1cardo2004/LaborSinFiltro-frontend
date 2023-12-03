import CommentsIcon from '../../assets/comment_duotone_line.svg';
import LikeIcon from '../../assets/favorito blend.svg';
import UserIcon from '../../assets/User_duotone_line-1.svg';
import TagIcon from '../../assets/Group.svg';
import '../../main_feed/feed/sass_files_writepost/writepostmain.css';
import { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import {PublicacionContexto} from '../../context/publicar.context'

function WriteGroupPost() {
    const [txt, settxt] = useState('');
    const baseurl = import.meta.env.VITE_API_BASEURL;
    const [tittle, setTittle] = useState('');
    const url =baseurl+'/api/post/'
    const {setPubliacionNueva} = useContext(PublicacionContexto)
    const {state} = useLocation();
    const { token, grupo } = state;
    const [tag1, settag1] = useState('')
    const [tag2, settag2] = useState('')
    const [tag3, settag3] = useState('')

    const submithandler = (e) => {
        e.preventDefault()
        setPubliacionNueva(true)
        const postdata ={
            titulo: tittle,
            texto: txt,
            grupo: grupo,
            tagscontent:[tag1,tag2,tag3]
        }
        axios.post(url ,postdata ,{headers: {authorisation: token}})
        .then((res) => {
          console.log('Post created successfully', res);
        })
        .catch((error) => {
          console.error('Error creating post:', error.response.data);
        }); 

        setTittle('')
        settxt('')
        settag1('')
        settag2('')
        settag3('')
    }

    return(
        <div className='crearpostposition'>
        <form onSubmit={submithandler}>
        <div className='creatpostbck' />
        <textarea 
        className='inputtxt'
        type='text'
        placeholder='.... que esta pasando?'
        value={txt}
        onChange={(e) => settxt(e.target.value)}
        required
        />
        <div className='publicarposition'>
            <button className='publicartxt'>publicar</button>
        </div>
        <div className='sidebarpossition'>
            <div className='sidebarbck' />
            <div className='commenticonposition'>
                <img className='commenticon' src={CommentsIcon} />
            </div>
            <div className='likeiconposition'>
                <img className='likeicon' src={LikeIcon} />
            </div>
        </div>
        <div className='topbarposition'>
            <div className='tbback'/>
            <input 
            className='tbtittle' 
            type='text'
            placeholder='post tittle'
            value={tittle}
            onChange={(e) => setTittle(e.target.value)}
            required
            />
            <div className='usericonpositionPost'>
                <img className='usericon' src={UserIcon} />
            </div>
        </div>
        <div className='tagsposition'>
            <div className='tagsbck' />
            <div className='tag'>
                <input className='tagtxt' 
                    type='text'
                    placeholder='tag 3'
                    value={tag3}
                    onChange={(e) => settag3(e.target.value)}
                ></input>
                <div className='taiconposition'>
                <img className='tagicon' src={TagIcon} />
                </div>
            </div>
            <div className='tag'>
                <input className='tagtxt' 
                    type='text'
                    placeholder='tag 2'
                    value={tag2}
                    onChange={(e) => settag2(e.target.value)}
                ></input>
                <div className='taiconposition'>
                <img className='tagicon' src={TagIcon} />
                </div>
            </div>
            <div className='tag'>
                <input className='tagtxt' 
                    type='text'
                    placeholder='tag 1'
                    value={tag1}
                    onChange={(e) => settag1(e.target.value)}
                ></input>
                <div className='taiconposition'>
                    <img className='tagicon' src={TagIcon} />
                </div>
            </div>
        </div>
        </form>
    </div>
    )
}

export default WriteGroupPost