import './GPsass/GPmain.css'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

function GroupPost ({grupo}) {
    const {NombreGrupo,_id, Integrantes, favedby } = grupo
    const navigate = useNavigate()
    const {state} = useLocation();
    const { token } = state; 
    const GroupClick = (()=>{
        navigate('/group',{ state: { token: token , grupo: _id, NombreGrupo:NombreGrupo, Integrantes:Integrantes, favedby: favedby }})
    })


    return(
        <div className="GPpos" onClick={GroupClick}>
            <div className='gpback' />
            <div className='gpphoto' />
            <div className='gname'>{NombreGrupo}</div>
            <div className='gmembers'>miembros<br/></div>
            <div className='gemebercant'>####</div>
        </div>
    )
}

export default GroupPost