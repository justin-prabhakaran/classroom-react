import Er from '../asset/404 error lost in space-pana.svg'
import './Error.css'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <div className='errorstyle'>

      {/* image */}
      <img className='image' src={Er} alt=''/>
      <div className='text'>
      <p className='textError'>Page Not Found </p>
      </div>
     <div className='error'>
     <p className='textcont'> oops! The page you are looking for dose not exist. It might have been moved or deleted. </p>
     </div>
        <div className='button'>
                <button className='backhomebtn'> <Link className='link' to="/">Go to Home</Link></button>
        </div>
    </div>
  )
}

export default ErrorPage