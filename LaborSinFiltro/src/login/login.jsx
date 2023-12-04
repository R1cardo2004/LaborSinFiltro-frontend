
import { useState } from 'react'
import './sass_files/mainlogin.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function App() {
    const[identifier, setidentifier] = useState('');
    const[password, setpassword] = useState('');
    const baseurl = import.meta.env.VITE_API_BASEURL;
    const uri = baseurl+'/api/login/';
    const navigate = useNavigate();

    const submithandler =(e) => {
        e.preventDefault()

        const loginData ={identifier,password}
        axios.post(uri, loginData).then(async (res) => {
            const usuarioid = (res.data.token);
            navigate('/feed',{ state: { token: usuarioid} })
        }).catch((error) => {
            console.log(error);
        })
    }

  return (
    <>
    <div className='backgroundmain'>
    <div className='fullpositionreal'>
    <div className='fullposition'>
            <div className='fullbck'/> 
    </div>
        <div className='formposition'>
        <div className='headerForm'>
                <div className='Fbck'></div>
                <div className='Ftxt'>Iniciar session</div>
            </div>
            <form onSubmit={submithandler}> 
            <div className='email'>
                <div className='Ebck'></div>
                <input 
                className='Einpunt' 
                type='text' 
                required 
                placeholder='email/username' 
                id='email' 
                value={identifier} 
                onChange={(e) => setidentifier(e.target.value)}
                />
            </div>
            <div className='contra'>
                <div className='contrabck'></div>
                <input 
                className='contrainput' 
                type='password' 
                id='contrasenia' 
                required 
                placeholder='contraseña' 
                value={password} 
                onChange={(e) => setpassword(e.target.value)}
                />
            </div>
            <div className='continuarpositionlogin'>
                <div className='continuar'>
                    <div className='continuarbck'>
                    <button className='continuarbttn' >Continuar</button>
                    </div>
                </div>
            </div>
            </form>
            <div className='nomembertxt'>No eres miembro? Registrate!</div>
            <div className='registerposition'>
                <div className='registerreal'>
                    <div className='registerbcklogin'>
                    <a href='/register'>
                    <button className='registerbttn'>Registrarse</button>
                    </a>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default App
