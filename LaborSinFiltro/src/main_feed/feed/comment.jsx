import './sass_files_comment/comment.css'
import UserIcon from '../../assets/User_duotone_line-1.svg'

function Comment({comments}) {
    const {content, user} = comments

    return(
    <div className="commentpos">
        <div className='commentbck' />
        <div className='useIconPoscomment'>
            <img className='usericoncomment' src={UserIcon}/>
        </div>
        <div className='usernamecomment'>{user.username}</div>
        <div className='usercomment'>{content}</div>
    </div>
    )
}

export default Comment