import React from 'react'
import '../Sidebar/styles.css'
import basecolors from '../../styles/basecolors'
import student from '../../../assets/images/svf_boy.png'
import logo from '../../../assets/images/svf_logo.webp'

export default function Sidebar( ) {
  return (
    <div className="sidebar" style={{backgroundColor: basecolors.leftGreen}}>
      <div className="logo-image">
        <img src={logo} alt="svf_logo"/>
      </div>
      <div className="student-image">
        <img src={student} alt="svf_boy"/>
      </div>
    </div>
  )
}
