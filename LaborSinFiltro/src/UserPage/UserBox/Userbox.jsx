import './UB_sass/UB_main.css'
import userIcon from '../../assets/User_duotone_line-1.svg'
import visibleIcon from '../../assets/View_light.svg'
import hiddenIcon from '../../assets/View_hide_light.svg'

import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

function Userbox() {
    const [hiddenurl, sethiddenurl] = useState(visibleIcon);
    const baseurl = import.meta.env.VITE_API_BASEURL;
    const {state} = useLocation();
    const { token } = state; 
    const [username , setusername] = useState('')
    const [empresa, setempresa] = useState('')
    const url = baseurl+`/api/usuario/findbyid`
    const headers= {
        'authorisation': token
    }

    const getUser = (() =>{
        axios.get(url, {headers:headers})
        .then((res)=>{
            setusername(res.data.usuario.username);
            setempresa(res.data.usuario.empresa.Nombre);
        })
    })

    useEffect(() =>{
        getUser()
    },[])


    const tooglehidden = (() =>{
        if (hiddenurl === visibleIcon) {
            sethiddenurl(hiddenIcon);
          } else {
            sethiddenurl(visibleIcon);
          }
    })

    return(
        <div className='ubposition'>
    <div className='ubBack' />
    <div className='ubDescripcion'>
        <div className='descripcionBox' />
        <div className='descripcionTxt' >breve descripcion</div>
    </div>
    <div className='userPositionUB'>
        <div className='usericonbckUB'/>
        <div className='UPB' >
            <img className='UserIconUB' src={userIcon}/>
        </div>
    </div>
    <div className='editProfilesPos'>
        <div className='editbck'/>
        <div className='editTxt'>editar perfil<br/></div>
    </div>
    <div className='UserName' >{username}</div>
    <div className='UserWork'>trabaja en {empresa}</div>
    <div className='togglehiddenPos'>
        <div className='hiddenIconpos'>
            <img className='hiddenIcon' onClick={tooglehidden} src={hiddenurl} />
        </div>
    </div>
</div>
    )
}

export default Userbox