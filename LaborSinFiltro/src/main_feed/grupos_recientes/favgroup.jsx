import grupo_icon from '../../assets/Group_light.svg'
import './sass_files_grupos_recientes/GRMain.css'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Favgroup({grupo}) {
    const {NombreGrupo, _id} = grupo
    const baseurl = import.meta.env.VITE_API_BASEURL;
    const findgrupouri = baseurl+'/api/grupo/' + _id
    const [Integrantes, setIntegrantes] = useState([])
    const [favedby, setfavedby] = useState([])
    const navigate = useNavigate();
    const {state} = useLocation();
    const { token } = state;
    
    const findgroup = () => {
        axios.get(findgrupouri).then((res)=>{
            setIntegrantes(res.data.Grupo.Integrantes)
            setfavedby(res.data.Grupo.favedby)
        })
    }

    const grupoclick = () =>{
        navigate('/group',{ state: { token: token , grupo: _id, NombreGrupo:NombreGrupo, Integrantes:Integrantes, favedby: favedby }})
    }

    useEffect(()=>{
        findgroup()
    },[])

    return(
            <div className='grgroup' onClick={grupoclick}>
            <div className='griconposition'>
                <img className='gricon' src={grupo_icon} />
            </div>
            <div className='grgruponame'>{NombreGrupo}</div>
        </div>
    )
}

export default Favgroup