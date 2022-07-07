import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import { register, reset } from "../features/auth/authSlice"
import Spinner from "../components/shared/Spinner"
import Card from "../components/shared/Card"
import { FaSignInAlt, FaUser} from 'react-icons/fa'

function Register() {
    const [formData, setFormData] = useState({
        email: '',
    })

    const {email} = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user, isLoading, isSuccess, isError, status} = useSelector(state => state.auth)

    useEffect(() => {
        if(isError) {
            toast.error(status)
            if(status === 'User already exists') {
                navigate('/')
            }
        }

        //Redirect when logged in
        if(isSuccess && user) {
            toast.success('Successfully registered, welcome!')
            navigate('/')
        } else if (user) {
            toast.error('please logout first')
            navigate('/')
        }

        dispatch(reset())
    }, [isError, isSuccess, user, status, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit =(e) => {
        e.preventDefault()

            const userData = {
                email,
            }

            dispatch(register(userData))
        }

    if(isLoading) {
        return <Spinner />
    }

  return (
    <Card>
        <section className="heading">
            <h1>
                <FaUser /> Register
            </h1>
            <p>
                Please create an account to leave feedback.
                <br /> <br />
                The email is so that no one else can edit or delete your feedback, feel free to make one up!
                <br /> <br />
            </p>
        </section>

        <section className="form">
            <form onSubmit={onSubmit}>

                <div className="form-group">
                    <input type="email" 
                    className='form-input'
                    id='email' 
                    name='email'
                    value={email} 
                    onChange={onChange} 
                    placeholder='Enter your email'
                    required />
                </div>

                <div >
                    <button className="btn btn-secondary">
                        Submit
                    </button>
                </div>
                <br />
            </form>
            <div >
                    <Link to='/login' className="noUnder">
                    <FaSignInAlt/> &nbsp; Login instead
                    </Link>
                </div>
        </section>
        
    </Card>
  )
}

export default Register