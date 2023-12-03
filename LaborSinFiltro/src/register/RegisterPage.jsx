
import { useState } from 'react'
import './sass_files/registermain.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Registerpage() {
    const baseurl = import.meta.env.VITE_API_BASEURL;
    const[email, setemail] = useState('');
    const[username, setusername] = useState('')
    const[password, setcontra] = useState('');
    const[confrimcontra, setconfirmcontra] = useState('');
    const uri = baseurl+'/api/usuario/';
    const navigate = useNavigate();

    const submithandler = (e) => {
        e.preventDefault()
        const registerdata ={email,username,password}

        if(confrimcontra == password){
            console.log("xd");
            axios.post(uri, registerdata)
        .then((res) => {
          console.log('user created successfully', res);
          navigate('/confirm',{ state: { username: username} })
        })
        .catch((error) => {
          console.error('Error creating post:', error.response.data);
        }); 
        }   
    }
    



  return (
    <div className='backgroundmain'>
    <div className='fullpositionreal'>
    <div className='formpos'>
        <form onSubmit={submithandler} >
        <div className='register'>
            <div className='registerbck'></div>
            <div className='registertxt'>registrarse</div>
        </div>
        <div className='continuarpositionreal'>
            <div className='continuar'>
                <div className='continuabck'>
                <a href='./confirm'>
                <button className='continuartxtreal'>continuar</button>
                </a>
                </div>
            </div>
        </div>
        <div className='emailposition'>
            <div className='emailbck'></div>
            <input 
            className='emailtxt' 
            type='text' 
            placeholder='email' 
            id='email' 
            required
            value={email}
            onChange={(e) => setemail(e.target.value)}
            />
        </div>
        <div className='Userposition'>
            <div className='Userbck'></div>
            <input 
            className='Usertxt' 
            type='text' 
            placeholder='username' 
            id='username' 
            required
            value={username}
            onChange={(e) => setusername(e.target.value)}
            />
        </div>
        <div className='contraposition'>
            <div className='contrabck'></div>
            <input 
            className='contratxt' 
            type='password' 
            placeholder='contrasenia' 
            id='contrasenia'
            required
            value={password}
            onChange={(e) => setcontra(e.target.value)} 
            />
        </div>
        <div className='confirmposition'>
            <div className='confirmbck'></div>
            <input 
            className='confirmtxt' 
            type='password' 
            placeholder='confirmar contrasenia' 
            id='confirm'
            required 
            value={confrimcontra}
            onChange={(e) => setconfirmcontra(e.target.value)}
            />
        </div>
        <div className='termsnconditions'>al hacer click en continuar aceptas nuestros terminos y condiciones</div>
        </form>
    </div>
    </div>
</div>
  )
}

export default Registerpage