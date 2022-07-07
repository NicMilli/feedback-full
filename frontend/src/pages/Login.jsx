import { useState, useEffect } from "react"
import {toast} from 'react-toastify'
import { FaSignInAlt } from "react-icons/fa"
import {useSelector, useDispatch} from 'react-redux'
import { login, reset } from "../features/auth/authSlice"
import Spinner from "../components/shared/Spinner"
import { useNavigate } from "react-router-dom"
import Card from "../components/shared/Card"

function Login() {
    const [formData, setFormData] = useState({
        email: '',
    })

    const {email} = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user, isLoading, isError, isSuccess, message} = 
    useSelector(state => state.auth)

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        //Redirect when logged in
        if(isSuccess || user) {
            toast.success('Successfully logged in')
            navigate('/')
        }

        dispatch(reset())
    }, [isError, isSuccess, user, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit =(e) => {
        e.preventDefault()
        

        const userData = {
            email
        }

        dispatch(login(userData))
    }

    if(isLoading) {
        return <Spinner />
    }

  return (
    <Card>
        <section>
            <h1>
                <FaSignInAlt /> Login
            </h1>
            <p>
                Please login
                <br /> <br />
            </p>
        </section>

        <section className="">
            <form onSubmit={onSubmit}>
                
                <div className="">
                    <input type="email" 
                    className='form-input'
                    id='email' 
                    name='email'
                    value={email} 
                    onChange={onChange} 
                    placeholder='Enter your email'
                    required />
                </div>

                <div>
                    <button className="btn btn-secondary">
                        Submit
                    </button>
                </div>
            </form>
        </section>
    </Card>
  )
}

export default Login