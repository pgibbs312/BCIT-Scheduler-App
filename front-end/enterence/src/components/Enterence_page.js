import campus_back from '../images/campus.jpg';
import bcit_icon from '../images/bcit-icon.png'
import './Enterence_page.css';

function Enterence_page() {
    return (
        <div className='Homepage'>

            <body className='ImageText'>
                <img src={bcit_icon} className="HomeLogoContainer" alt="Logo" />
                <img src={campus_back} className="HomeImageContainer" alt="Background" />
                <div className='TextBox'>
                    <p className='Title1'>Tech Hub</p>
                    <p className='Title2'>Study Room Booking System</p>
                    <button className='EnterButton'>Enter</button>
                </div>
            </body >
        </div >
    );
};

export default Enterence_page;