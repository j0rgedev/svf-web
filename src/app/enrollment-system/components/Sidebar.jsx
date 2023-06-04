import student from '../assets/svf_boy.png'
import logo from '../assets/svf_logo.webp'

import {BiLogOut} from "react-icons/bi";
import styled from 'styled-components';

import {getCookie, removeCookie} from "../../login/setup/utils/cookiesConfig.js";
import {useNavigate} from "react-router-dom";
import {theme} from "../styles/theme.js";

export default function Sidebar() {

    const navigate = useNavigate()

    const handleLogOut = () => {
        removeCookie('SESSION')
        navigate('/login', {replace: true})
    }

    return (
        <Header>
            <SidebarWrapper>
                <ImageWrapper height={'10%'}>
                    <img className={'svf-logo'} src={logo} alt="svf_logo"/>
                </ImageWrapper>
                <ImageWrapper height={'90%'} main={true}>
                    <img className={'svf-boy'} src={student} alt="svf_boy"/>
                </ImageWrapper >
                <ImageWrapper>
                    {
                        getCookie('SESSION') &&
                            <BiLogOut
                                onClick={handleLogOut}
                                fontSize={'2em'}
                                cursor={'pointer'}
                                color={'white'}
                            />
                    }
                </ImageWrapper>
            </SidebarWrapper>
        </Header>
    )
}

const Header = styled.header`
  min-height: 100vh;
  width: 100%;
  min-width: 400px;
  background-color: ${theme.colors.sidebar};
  border-radius: 0 30% 30% 0;
  display: none;

  @media (min-width: 920px) {
    display: flex;
  }
`

const SidebarWrapper = styled.div`
  width: 100%;
    height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0 30% 30% 0;
  padding: 1.5rem;
`

const ImageWrapper = styled.div`
  width: 100%;
  height: ${props => props.height ? props.height : 'unset;'};
  display: flex;
  ${props => props.main ? 'justify-content: center;' : 'justify-content: flex-start;'}
  align-items: center;
  
  img {
    height: 100%;
    object-fit: cover;
  }
  
  .svf-boy{
    width: auto;
    height: 80%;
  }
`
