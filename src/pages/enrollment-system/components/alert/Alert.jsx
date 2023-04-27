import './alerts.css'
import {AiFillCheckCircle, AiFillWarning, } from "react-icons/ai";
import {MdError} from "react-icons/md";
import {motion} from "framer-motion";
import {useState} from "react";

export default function Alert (
    {
        alertType,
        title,
        description,
        onClose
    }
) {
    const [isOpen, setIsOpen] = useState(true);
    const [hideBackground, setHideBackground] = useState(false);

    const handleAccept = () => {
        setIsOpen(false);
        setTimeout(() => {
            setHideBackground(true);
            onClose();
        }, 300);
    };


    return (
        <div
            className='modal'
            style={!hideBackground ? { display: "flex" } : { display: "none" }}>
            <motion.div
                className="alert-container"
                initial={{ scale: 0 }}
                animate={
                    isOpen
                        ? { rotate: 360, scale: 1 }
                        : { rotate: 360, scale: 0, transition: { duration: 0.3 } }
                }
                transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                }}
            >
                <div className={`icon-alert ${alertType}`}>
                    {alertType === "warning" ? <AiFillWarning color={'white'} width={'2em'} height={'2em'}/> : null}
                    {alertType === "error" ? <MdError color={'white'} width={'2em'} height={'2em'}/> : null}
                    {alertType === "success" ? <AiFillCheckCircle color={'white'} width={'2em'} height={'2em'}/> : null}
                </div>
                <div className={'alert-content'}>
                    <h2>{title}</h2>
                    <p>{description}</p>
                    <button className={`btn-accept ${alertType}`} onClick={handleAccept}>Aceptar</button>
                    <button
                        className='btn-cancel'
                        style={{ display: alertType === 'error' ? 'none' : 'block' }}>
                        CANCELAR
                    </button>
                </div>
            </motion.div>
        </div>
    )
  
}

