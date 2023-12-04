
import './sass_files_sb/sidebarmain.css'
import SettingsLogo from '../../assets/Setting_line_duotone_line.svg'
import BuscarIcon from '../../assets/Search_light.svg'
import Grupoicon from '../../assets/Group_light.svg'
import Homeicon from '../../assets/Home_light.svg'
import NotiIfcon from '../../assets/Bell_light.svg'
import UserIcon from '../../assets/User_duotone_line-1.svg'
import CreateGroupIcon from '../../assets/Add_round.svg'
import { useLocation, useNavigate } from 'react-router-dom';


function Sidebar() {
    const {state} = useLocation();
    const { token } = state; 
    const navigate = useNavigate();


    const UserIconClick = (()=>{
        navigate('/user',{ state: { token: token} })
    })

    const HomeIconClick = (()=>{
        navigate('/feed',{ state: { token: token} })
    })

    const GruopIconClick = (()=>{
        navigate('/groupfeed',{ state: { token: token} })
    })
    const CrearGruopIconClick = (()=>{
        navigate('/groupcreate',{ state: { token: token} })
    })


  return (
    <div className="sidebarposition">
    <div  className="sidebarbackposition">
        <div className='sidebarbckcolour' />
    </div>
    <div className='settingsposition'>
        <div className='settingsbck' />
        <div className='settingstxt'>Settings</div>
        <div className='settingsiconposition'>
            <img className='settingsicon' src={SettingsLogo} />
        </div>
    </div>
    <div className='buscarposition'>
        <div className='buscarbck' />
        <div className='buscariconposition'>
            <img className='buscaricon' src={BuscarIcon} />
        </div>
        <div className='bucardtxt'>Buscar<br/></div>
    </div>
    <div className='grupoposition' onClick={GruopIconClick}>
        <div className= 'grupobck' />
        <div className='grupoiconposition'>
            <img className='grupoicon' src={Grupoicon} />
        </div>
        <div className='grupotxt'>Grupos</div>
    </div>
    <div className='CrearGrupoposition' onClick={CrearGruopIconClick}>
        <div className= 'CrearGrupobck' />
        <div className='CrearGrupoiconposition'>
            <img className='CrearGrupoicon' src={CreateGroupIcon} />
        </div>
        <div className='CrearGrupotxt'>Crear Grupo</div>
    </div>
    <div onClick={HomeIconClick} className='homeposition'>
        <div className='homebck' />
        <div className='homeiconposition'>
            <img className='homeicon' src={Homeicon} />
        </div>
        <div className='hometxt'>Inicio<br/></div>
    </div>
    <div className='notificacionesposition'>
        <div className='notibck' />
        <div className='notiiconposition'>
            <img className='notiicon' src={NotiIfcon} />
        </div>
        <div className='notitxt' >Notificaciones</div>
    </div>
    <div className='pfpposition'>
        <div className='pfpbck' />
        <div className='pfpiconposition'>
            <img onClick={UserIconClick} className='pfpicon' src={UserIcon} />
        </div>
    </div>
</div>
  )
}

export default Sidebar