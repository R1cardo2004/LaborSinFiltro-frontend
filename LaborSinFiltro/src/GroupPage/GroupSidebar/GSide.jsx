
import './GS_sass/GSmain.css'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

function GroupSidebar({Integrantes}) {
    const baseurl = import.meta.env.VITE_API_BASEURL;
    const uri = baseurl+`/api/grupo/`
    const uripost =baseurl+'/api/post/grupo/'
    const {state} = useLocation();
    const { grupo } = state;
    const [name , setname] = useState('')
    const [desc , setdesc] = useState('')
    const [canintegrantes]=useState([Integrantes].length)
    const [postlenght, setpostlenght] = useState('')

    const getgroup = () => {
        axios.get(uri + grupo).then((res) => {
            setname(res.data.Grupo.NombreGrupo)
            setdesc(res.data.Grupo.Descripcion)
        })
    }

    const getpost = () =>{
        axios.get(uripost + grupo)
        .then((res) => {
            const post = res.data.post;
            const postlengt = post.length
            console.log(postlengt);
            setpostlenght(postlengt)
        })
    }

    useEffect(()=>{
        getgroup()
        getpost()
    },[])

    return(
        <div className="gspos">
            <div className='gsbck' />
            <div className='gsPicture'></div>
            <div className='grupoDes'>{desc}</div>
            <div className='grupoName'>{name}<br/></div>
            <div className='publiamountpos'>
                <div className='publiamountTxt'>publicaciones</div>
                <div className='publiNmembernumber'>#{postlenght}</div>
            </div>
            <div className='memberamntpos'>
                <div className='membertxt'>miembros</div>
                <div className='publiNmembernumber'>#{canintegrantes}</div>
            </div>
        </div>
    )
}

export default GroupSidebar