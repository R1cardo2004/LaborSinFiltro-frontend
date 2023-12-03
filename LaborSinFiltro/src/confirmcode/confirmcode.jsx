import { useEffect, useState } from 'react'
import './sass_files/confirmMain.css'
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Confirmcode() {
    const [code,setcode] =useState('');
    const baseurl = import.meta.env.VITE_API_BASEURL;
    const {state} = useLocation();
    const { username } = state; 
    const [id, setid] = useState('')
    const repeat = false
    const url = baseurl+`/api/login/${id}/verify/`
    const uri = baseurl+`/api/usuario/miusuario/${username}`

    const getuser = () =>{
        axios.get(uri)
        .then((res) => {
            const iduser = res.data.usuario[0]._id
            console.log(iduser);
            setid(iduser)
        })
    }

    useEffect(() =>{
        getuser()
        console.log(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[repeat])


    const submithandler = (e) => {
        e.preventDefault()
        console.log(url + code);
        axios.post(url + code).then(() => {
            window.location.href = `/`
        })
    }


  return (
    <div className='backgroundmainconfirm'>
    <div className='fullpositionreal'>
        <div className='fullposition'>
            <div className='fullbck' />
        </div>
        <div className='formpos'>
        <form onSubmit={submithandler}>
        <div className='tittleposition'>
            <div className='tittlebck' />
            <div className='tittletxt'>confirmacion via correo electronico</div>
        </div>
        <div className='txtplain'>ingresa el codigo de verificacion que hemos enviado a tu correo electronico “correo@correo.com”</div>
        <div className='codigoposition'>
            <div className='codigobck' />
            <input 
            className='codigotxt' 
            type='text' 
            placeholder='codigo' 
            id='codigo' 
            required
            value={code}
            onChange={(e) => setcode(e.target.value)}
            />
        </div>
        <div className='continuarposition'>
            <div className='continuar'>
                <button className='continuarbck'>
                <div className='continuartxtconfirm'>continuar</div>
                </button>
            </div>
        </div>
        </form>
        </div>
    </div>
</div>
  )
}

export default Confirmcode