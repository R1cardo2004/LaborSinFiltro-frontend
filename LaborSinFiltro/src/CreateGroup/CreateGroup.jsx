import './CreateGroup_sass/CGmain.css'
import { useEffect, useState } from 'react';
import CloseIcon from '../assets/Close_square_light.svg'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';



function CreatGroup() {
        const baseurl = import.meta.env.VITE_API_BASEURL;
        const [empresarial, setempresarial1] = useState(true);
        const [general, setgeneral2] = useState(false);
        const [priv, setpriv] = useState(false);
        const [empresa, setempresa] = useState([]);
        const [selectedOption, setSelectedOption] = useState(empresa[0]);
        const {state} = useLocation();
        const { token } = state; 
        const navigate = useNavigate()
        const [nombre, setnombre] = useState('')
        const [Descripcion, setDescripcion] = useState('')
        const uri = baseurl+'/api/grupo/save'
        const empreauri = baseurl+'/api/empresa/'
        const headers= {
            'authorisation': token
        }

        const GetGroup = async () =>{
            await axios.get(empreauri)
            .then((res) => {
                const empresas = res.data.Empresa;
                setempresa(empresas)
                setSelectedOption(empresa[0])
            })
        }

        useEffect(() =>{
            setTimeout(() => {
                GetGroup();
            }, 2000);
        },[])

        const handleEmpGen = async () => {
         await setempresarial1(!empresarial);
         await setgeneral2(!general)
        };

        const handlePriv = async () => {
            await setpriv(!priv);
        };

        const handleEmpresa = (event) => {
            setSelectedOption(event.target.value);
        };

        const handlequit = (()=>{
            navigate('/feed',{ state: { token: token} })
        })

        const notempresaria =(async () => {
           await setSelectedOption(null);
        })

        const submithandler = (e) => {
            console.log(selectedOption);
            e.preventDefault()
            if(empresarial == false){
                notempresaria();
                const GroupData = {
                    NombreGrupo: nombre,
                    Empresa: null,
                    Descripcion: Descripcion,
                    grupoEmpresarial: empresarial,
                    priv: priv
                }
                axios.post(uri,GroupData, {headers: headers}).then((res) => {
                    console.log(res);
                 })
                 navigate('/groupfeed',{ state: { token: token} })
            }else{
                const GroupData = {
                    NombreGrupo: nombre,
                    Empresa: selectedOption,
                    Descripcion: Descripcion,
                    grupoEmpresarial: empresarial,
                    priv: priv
                }
                axios.post(uri,GroupData, {headers: headers}).then((res) => {
                    console.log(res);
                 })
                 navigate('/groupfeed',{ state: { token: token} })
            }
            
           
        }

    return (
        <div className="backgroundCG">
            <div className='createbox'>
                <div className='createtittlebck'>
                    <div className='createtittletxt'>Crea tu grupo!!</div>
                    <img src={CloseIcon} className='CloseIcon' onClick={handlequit}></img>
                </div>
                <form className='inputform' onSubmit={submithandler}>
                    <div> Tipo de grupo</div>
                        <div >
                            <label className='formtxt'><input
                            type='checkbox'
                            checked={empresarial}
                            onChange={handleEmpGen}
                            className='custom-checkbox'
                            />
                            Empresarial</label>
                            <label className='formtxt'><input
                            type='checkbox'
                            checked={general}
                            onChange={handleEmpGen}
                            />
                            General</label>
                        </div>
                        <div className='inspos'>
                        {general && <div>
                        <label className='formtxt'><input
                            type='checkbox'
                            checked={priv}
                            onChange={handlePriv}
                            />
                            Grupo Privado</label>
                        </div>}
                        </div>
                    <div className='inspos'>
                        <div className='formtxt'> Nombre del grupo </div>
                        <input className='formins' placeholder='Nombre' type='text' onChange={(e) => setnombre(e.target.value)}></input>
                    </div>
                    <div className='inspos'>
                        {empresarial && <div className='formtxt'> Empresa</div>}
                        {empresarial && <div>
                            <select placeholder='empresas' value={selectedOption} onChange={handleEmpresa} className='empresaSelector'>
                                {empresa.map((empresa) => (
                                <option key={empresa._id} value={empresa._id}>{empresa.Nombre}</option>
                                ))}
                            </select>
                        </div>}
                    </div>
                    <div className='inspos'>
                        <div className='formtxt'> Descripcion del grupo</div>
                        <textarea className='forminsDesc' placeholder='Descripcion' onChange={(e) => setDescripcion(e.target.value)}></textarea>
                    </div>
                    <button className='bttncrear' onClick={submithandler}>Crear Grupo</button>
                </form>
            </div>
        </div>
    )
}

export default CreatGroup