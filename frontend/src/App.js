import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import FeedbackList from './components/FeedbackList'
import FeedbackStats from './components/FeedbackStats'
import FeedbackForm from './components/FeedbackForm'
import Header from './components/Header'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import AboutPage from './pages/AboutPage'
import AboutLink from './components/AboutLink'
import { FeedbackProvider } from './context/FeedbackContext'

function App() {

    return (
      <FeedbackProvider>
    <Router>
      <Header />    
        <div className='container'>
          <Routes>
          <Route exact path='/' element={
            <>
              <FeedbackForm /> 
              <FeedbackStats />
              <FeedbackList />
              <AboutLink />
            </>
          }
          ></Route>

            <Route path='/about' element={<AboutPage />} />
            </Routes>
        </div>
    </Router>
    <ToastContainer/>
    </FeedbackProvider>
    

    )
}

export default App

// TBD: see if double clicking edit button to cancel edit and fix problem when deleting item while in edit mode leaves item info in submit area
// See if these are fixed later in course