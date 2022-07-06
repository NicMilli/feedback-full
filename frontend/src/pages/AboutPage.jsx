import Card from "../components/shared/Card"
import {Link} from 'react-router-dom'

function AboutPage() {
  return (
    <Card>
        <div className="about">
            <h1>About This Project</h1>
            <p>This is a react app to leave feedback for my website
                 and other projects. It has been adapted from
                 'React Front to Back 2022' on Udemy.com <br />
                 I have adapted it to have a Nodejs backend and MongoDB database
                 using the Mern stack.</p>
            <p>Version 1.0.0</p>
            <p>
                <Link to='/'>Back to the Feedabck app</Link>
            </p>
        </div>
      
    </Card>
  )
}

export default AboutPage
