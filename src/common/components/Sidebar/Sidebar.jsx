import React from 'react'
import {baseColors} from '../styles/baseColors'
import logo from '../assets/images/sfv_logo.png'
import student from '../assets/images/sfv_boy.png'

function Sidebar() {
  return (
    {<div className='sidebar' style={backgroundColor: baseColors.leftGreen}>
      
      <img src={logo} alt="imageS"  className='logo'/>;
      <img src={student} alt="imageS" className='student-image'/>

    </div>}
  )
}

export default sidebar