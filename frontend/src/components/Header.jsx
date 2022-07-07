import PropTypes from 'prop-types'
import AboutLink from './AboutLink'
import { useLocation, Link} from "react-router-dom";
import { FaHome, FaQuestion } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'

function Header({text, bgColor, textColor}) {
    const headerStyles = {
        backgroundColor: bgColor,
        color: textColor,
    }

    const location = useLocation();

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

  return (
    <>
    <div style={headerStyles}>
        <div className='head'>
            <h2>{text}</h2>
           
            {location.pathname === "/" 
            ? <div className='about-link center'><Link to='/about'>
                <FaQuestion size={30} />
              </Link></div>
            :   <div className='about-link center'>
                    <Link to='/'>
                        <FaHome size={30} />
                    </Link>
                </div> }
            <div>
            {user 
            ? (
                < >
                    <button className="btn btn-secondary" onClick={onLogout}>
                        <FaSignOutAlt/> Logout
                    </button>
                </>
            ) 
            : ( 
                <div>
                    <Link to='/login' className='login'>
                        <FaSignInAlt /> Login
                    </Link>
                    &nbsp; &nbsp;
                    <Link to='/register' className='login'>
                        <FaUser /> Register
                    </Link>
                </div>
            )}
            </div>
        </div>
    </div>
    </>
  )
}

Header.defaultProps = {
    text: 'Feedback',
    bgColor: 'rgba(0,0,0,0.4)',
    textColor: '#ff6a95',
}

Header.propTypes = {
    text: PropTypes.string,
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
}

export default Header
