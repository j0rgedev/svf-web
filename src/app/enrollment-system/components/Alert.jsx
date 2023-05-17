import styled from 'styled-components';
import {AiFillCheckCircle, AiFillWarning} from 'react-icons/ai';
import {MdError} from 'react-icons/md';
import {motion} from 'framer-motion';
import {useState} from 'react';
import {useNavigate} from "react-router-dom";

const Modal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
`;

const AlertContainer = styled(motion.div)`
  width: 85%;
  max-width: 400px;
  background: white;
  position: absolute;
`;

const IconAlert = styled.div`
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -40px;
  left: calc(50% - 40px);
  border: 6px solid white;
  background-color: ${({alertType}) => {
    switch (alertType) {
      case 'warning':
        return 'rgb(255, 204, 0)';
      case 'error':
        return 'rgb(187, 11, 11)';
      case 'success':
        return 'rgba(0, 162, 152)';
      default:
        return 'transparent';
    }
  }};
`;

const AlertContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 2.5rem 1.5rem 1.5rem;

  p {
    text-align: center;
  }
`;

const AcceptButton = styled.button`
  width: 100%;
  height: 36px;
  border: none;
  color: white;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 2px;
  background-color: ${({alertType}) => {
    switch (alertType) {
      case 'warning':
        return 'rgb(255, 204, 0)';
      case 'error':
        return 'rgb(187, 11, 11)';
      case 'success':
        return 'rgba(0, 162, 152)';
      default:
        return 'transparent';
    }
  }};
  cursor: pointer;
`;

const CancelButton = styled.button`
  width: 100%;
  height: 36px;
  background-color: transparent;
  color: #D4B256;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 2px;
  cursor: pointer;
  display: ${({alertType}) => (alertType === 'warning' ? 'block' : 'none')};
  border: ${({alertType}) => {
    switch (alertType) {
      case 'warning':
        return '1.5px solid #D4B256';
      default:
        return 'transparent';
    }
  }};
`;

export default function Alert({alertType, title, description, onClose, redirectUrl}) {
    const [isOpen, setIsOpen] = useState(true);
    const [hideBackground, setHideBackground] = useState(false);
    const navigate = useNavigate();

    const handleAccept = () => {
        setIsOpen(false);
        setTimeout(() => {
            setHideBackground(true);
            onClose();
            if(redirectUrl) {
                navigate(redirectUrl);
            }
        }, 300);
    };

    const handleCancel = () => {
        setIsOpen(false);
        setTimeout(() => {
            setHideBackground(true);
            onClose();
        }, 300);
    }

    return (
        <Modal style={!hideBackground ? {display: 'flex'} : {display: 'none'}}>
            <AlertContainer
                initial={{scale: 0}}
                animate={
                    isOpen
                        ? {rotate: 360, scale: 1}
                        : {rotate: 360, scale: 0, transition: {duration: 0.3}}
                }
                transition={{type: 'spring', stiffness: 200, damping: 20}}
            >
                <IconAlert alertType={alertType}>
                    {alertType === 'warning' ? (
                        <AiFillWarning color={'white'} width={'2em'} height={'2em'}/>
                    ) : null}
                    {alertType === "error" ? <MdError color={'white'} width={'2em'} height={'2em'}/> : null}
                    {alertType === "success" ? <AiFillCheckCircle color={'white'} width={'2em'} height={'2em'}/> : null}
                </IconAlert>
                <AlertContent>
                    <h2>{title}</h2>
                    <p>{description}</p>
                    <AcceptButton alertType={alertType} onClick={handleAccept}>ACEPTAR</AcceptButton>
                    <CancelButton alertType={alertType} onClick={handleCancel}>
                        CANCELAR
                    </CancelButton>
                </AlertContent>
            </AlertContainer>
        </Modal>
    )
}
            
        

        