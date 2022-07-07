import Card from "../components/shared/Card"
import {Link} from 'react-router-dom'
import { FaHome, FaGithub, FaQuestion } from "react-icons/fa"

function AboutPage() {
  return (
    <Card>
        <div className="about">
            <h1>About This Project</h1>
            <h1>Built with the MERN 
              <a target='_blank' rel='noreferrer noreopener' className='noUnder' href="https://www.mongodb.com/languages/mern-stack-tutorial#:~:text=What%20is%20the%20MERN%20Stack%3F%20The%20MERN%20stack,of%20the%20several%20variants%20of%20the%20MEAN%20stack."><FaQuestion/></a> 
              stack</h1>
            <p>This is a react app to leave feedback for my website
                 and other projects. Please leave your thoughts on my projects, website or resume!  <br /> <br />
                 This project has a Nodejs backend and MongoDB database
                 with Redux state control and express backend framework. I have decided to require an email sign-in so that only
                 the original reviewer can edit or delete their feedback.
                 <br /> <br />
                 I will not use this email in any way so please feel free to use your own or make one up!
                 </p>
                  <h1>Thank you for visiting!</h1>
            <p>Version 2.0.0</p>
            <p>
            <a target='_blank' rel='noreferrer noreopener' href="https://github.com/NicMilli/feedback-full" className='noUnder'> <FaGithub/> &nbsp; View the source code! </a>
            <br />
                <Link to='/' className='noUnder'> <FaHome/> &nbsp; Back to the Feedabck app</Link>
                
            </p>
        </div>
      
    </Card>
  )
}

export default AboutPage
