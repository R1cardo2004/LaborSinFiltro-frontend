import logo from '../../assets/logo.jpg'
import './tittle_sass/tittle.css'

function Tittle() {

    return(
        <div className='tittlenlogopos'>
            <img src={logo} className='logo'></img>
            <div className='tittle'>LaborSinFiltro</div>
        </div>
    )
}

export default Tittle