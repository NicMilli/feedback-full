import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {toast} from 'react-toastify'
import { FaUser } from "react-icons/fa"
import {useSelector, useDispatch} from 'react-redux'
import { register, reset } from "../features/auth/authSlice"
import Spinner from "../components/shared/Spinner"
import Card from "../components/shared/Card"

function Register() {
    const [formData, setFormData] = useState({
        email: '',
    })

    const {email} = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user, isLoading, isSuccess, isError, message} = useSelector(state => state.auth)

    console.log(user)

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        //Redirect when logged in
        if(isSuccess || user) {
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
            </form>
        </section>
    </Card>
  )
}

export default Register