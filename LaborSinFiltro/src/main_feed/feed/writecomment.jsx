import './sass_files_comment/comment.css'
import UserIcon from '../../assets/User_duotone_line-1.svg'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react';
import { useContext } from 'react';
import {PublicacionContexto} from '../../context/publicar.context'


function WriteComment(_id) {
    const {state} = useLocation();
    const baseurl = import.meta.env.VITE_API_BASEURL;
    const { token } = state; 
    const [content, setcontent] = useState('');
    const {setPubliacionNueva} = useContext(PublicacionContexto)
    const commenturi = baseurl+'/api/post/comment/' + _id._id

    const headers= {
        'authorisation': token
    }

    const submithandler = ((e)=>{
        e.preventDefault()
        setPubliacionNueva(true)

        const comentdata ={
            content: content,
        }
        axios.post(commenturi, comentdata, {headers: headers}).then((res)=>{
            console.log(res);
        })
        setcontent('')
    })

    return(
    <div className="commentpos">
    <form onSubmit={submithandler}>
        <div className='commentbck' />
        <div className='useIconPoscomment'>
            <img className='usericoncomment' src={UserIcon}/>
        </div>
        <div className='usernamecomment'>Publica tu comentario</div>
        <input  className='usercomment' 
                type='text' 
                placeholder='comentario'
                value={content}
                onChange={(e) => setcontent(e.target.value)}>
                </input>
    </form>
    </div>
    )
}

export default WriteComment