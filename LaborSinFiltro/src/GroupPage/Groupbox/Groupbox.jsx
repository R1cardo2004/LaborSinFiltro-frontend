import './groupbox_sass/GBmain.css'
import LikeIcon from '../../assets/favorito blend.svg'
import GroupIcon from '../../assets/Group_light.svg'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import JoinIcon from '../../assets/Add_square_light.svg'
import JoinedIcon from '../../assets/Done_ring_round.svg'
import likeHover from '../../assets/favorito_hover.svg';
import likeClick from '../../assets/favorito_click.svg';
import axios from 'axios'


function GroupBox({Integrantes, favedby}) {
    const baseurl = import.meta.env.VITE_API_BASEURL;
    const uri = baseurl+`/api/grupo/`
    const {state} = useLocation();
    const { grupo, token } = state;
    const finduserUri = baseurl+'/api/usuario/findbyid'
    const joinuri = baseurl+'/api/grupo/join/' + grupo
    const favuri = baseurl+'/api/grupo/fav/' + grupo
    const [name , setname] = useState('')
    const [empresarial, setempresarial] = useState(false)
    const [empresa, setempresa] = useState('')
    const [join, setJoin] = useState(JoinIcon)
    const [imageUrl, setImageUrl] = useState(LikeIcon);
    const data = null

    const headers= {
        'authorisation': token
    }
    
    const getgroup = () => {
        axios.get(uri + grupo).then((res) => {
            setname(res.data.Grupo.NombreGrupo)
            setempresarial(res.data.Grupo.grupoEmpresarial)
            setempresa(res.data.Grupo.Empresa.Nombre)
        })
    }

    const getuser = () => {
        axios.get(finduserUri, {headers: headers}).
        then( async (res)=>{
            const currenuser = res.data.usuario._id
            if(Integrantes.some(object => object._id === currenuser)){
                setJoin(JoinedIcon)
            }
            if(favedby.some(object => object === currenuser)){
                setImageUrl(likeClick);
            }
        }) 
    }
    const favGroup = () => {
        axios.patch(favuri,data,{headers: headers}).then((res) =>{
            console.log(res);
        })
    }

    useEffect(()=>{
        const fetchData = async () => {
            await getgroup(); 
            await getuser(); 
        };
    
        fetchData();
    },[])

    const handlejoin = () =>{
        if(join == JoinIcon){
            setJoin(JoinedIcon)
            axios.patch(joinuri,data, {headers:headers}).then((res) =>{
                console.log(res.status);
            })

        }
        if(join == JoinedIcon){
            setJoin(JoinIcon)
            axios.patch(joinuri,data, {headers:headers}).then((res) =>{
                console.log(res.status);
            })

        }
    }

    const handleImageClick = () => {
        if (imageUrl === LikeIcon || imageUrl === likeHover) {
          setImageUrl(likeClick);
          favGroup();
        } else {
          setImageUrl(LikeIcon);
          favGroup();
        }
    };

    const handleImageHoverIn = () => {
        if (imageUrl == LikeIcon){
            setImageUrl(likeHover);
        }
    };
    
    const handleImageHoverOut = () => {
        if(imageUrl == likeHover){
            setImageUrl(LikeIcon);
        }
    };
    
    return(
        <div className="gbpos">
    <div className='gbback' />
    <div className='gruopIconGB'>
        <div className='gruopIconbckGB' />
        <div className='GIpos'>
        <img src={GroupIcon} className='GIcon'></img>
        </div>
    </div>
    <div className='groupName'>{name}<br/></div>
    {empresarial && <div className='empresaName'>{empresa}<br/></div>}
    <div className='likeGroupPos'>
        <img className='favIcon' onClick={handleImageClick} onMouseEnter={handleImageHoverIn} onMouseLeave={handleImageHoverOut} src={imageUrl}></img>
    </div>
    <div className='joinGroupPos'>
        <img className='joinIcon' src={join} onClick={handlejoin}></img>
    </div>
</div>
    )
}

export default GroupBox