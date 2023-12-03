import './sass_files_grupos_recientes/GRMain.css'
import axios from 'axios'
import Favgroup from './favgroup'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function Grupos_recientes(){
    const baseurl = import.meta.env.VITE_API_BASEURL;
    const url = baseurl+`/api/usuario/findbyid`
    const {state} = useLocation();
    const { token } = state;
    const [grupo, setgrupo] = useState([])
    const headers= {
        'authorisation': token
    }

    const getuser = (() =>{
        axios.get(url, {headers:headers})
        .then((res)=>{
            setgrupo(res.data.usuario.gruposfav)
        })
    })

    useEffect(()=>{
        getuser()
    },[])


    return(
        <div className='grpisition'>
            <div className='grbackposition'>
                <div className='grbckcolor' />
            </div>
            <div className='grgroupsposition'>
                {grupo.map((grupo) => {
                return(
                    <Favgroup grupo= {grupo} key={grupo._id}></Favgroup>
                        )
                })}
            </div>
            <div className='grtittle'>Grupos Favoritos</div>
        </div>
        )
}

export default Grupos_recientes;