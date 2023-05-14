import React from 'react'
import './sidebarStyles.css'
import baseColors from '../../config/baseColors.js'
import student from '../../assets/svf_boy.png'
import logo from '../../assets/svf_logo.webp'
import {motion} from 'framer-motion'
import {BiLogOut} from "react-icons/bi";
import {removeCookie} from "../../setup/utils/cookiesConfig.js";
import {useNavigate} from "react-router-dom";

export default function Sidebar({width, isMain}) {

    const navigate = useNavigate()

    const handleLogOut = () => {
        removeCookie('SESSION')
        navigate('/matricula/')
    }

    return (
        <motion.div
            initial={{x: -200}}
            animate={{x: -10}}
            transition={{duration: 1.5}}
            className="sidebar"
            style={{backgroundColor: baseColors.leftGreen, width: width}}>
            <div className="logo-image">
                <img src={logo} alt="svf_logo"/>
            </div>
            <div className="student-image">
                <img src={student} alt="svf_boy"/>
            </div>
            {
                !isMain && <div className={'logout'}>
                    <BiLogOut onClick={handleLogOut}/>
                </div>
            }
        </motion.div>
    )
}
