import styled from 'styled-components';
import {AiOutlineDown} from 'react-icons/ai';
import {useState} from 'react';
import {FaFileContract} from 'react-icons/fa';
import {TbReportMoney} from 'react-icons/tb';


export default function SidebarSections({
	                                        href,
	                                        text,
	                                        icon,
	                                        hasDropdown,
	                                        onClick
                                        }) {

	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	}

	return (
		<OptionsList onClick={onClick}>
			{!hasDropdown ? (
				<OptionItem>
					<a href={href}>
						{icon}
						{text}
					</a>
				</OptionItem>
			) : (
				<>
					<OptionItem onClick={toggleDropdown}>
						<a href={href}>
							<SectionWrapper>
								{icon}
								{text}
							</SectionWrapper>
							<AiOutlineDown/>
						</a>
					</OptionItem>
					<DropdownMenu isOpen={isOpen}>
						<OptionLink className="Item" href="/admin/matriculas" isSelected={false}>
							<FaFileContract/>Matriculas
						</OptionLink>
						<OptionLink className="Item" href="/admin/pensiones" isSelected={true}>
							<TbReportMoney/>Pensiones
						</OptionLink>
					</DropdownMenu>
				</>
			)}
		</OptionsList>
	);
}

const OptionsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const SectionWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  width: 100%;
  height: 100%;
`

const OptionItem = styled.li`
  user-select: none;
  cursor: pointer;

  a {
    gap: 10px;
    display: flex;
    align-items: center;
    padding: 10px;
    font-size: 18px;
    color: ${(props) => props.theme.textColor}; /* Utilizar el color del tema */
    text-decoration: none;
    border-radius: 1rem;

    &:hover {
      background-color: #905D00;
      transition: 0.7s;
    }
  }
`;

const OptionLink = styled.a`
  text-decoration: none;
  color: ${(props) => props.theme.textColor};;
  align-items: center;
  padding: 10px;
  font-size: 18px;
  display: flex;
  gap: 10px;

  &:hover {
    cursor: pointer;
    background-color: #905D00;
    border-radius: 1rem;
    transition: 0.7s;
  }
`;

const DropdownButton = styled.button`
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: white;
  gap: 10px;
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 18px;
  text-decoration: none;

  &:hover {
    cursor: pointer;
    background-color: #905D00;
    border-radius: 1rem;
    transition: 0.7s;
  }
`;

const DropdownMenu = styled.div`
  display: flex;
  flex-direction: column;
  background: transparent;
  max-height: ${({isOpen}) => isOpen ? dropdownHeight : "0"};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
`;

const SpaceDiv = styled.div`
  display: flex;
  gap: 50px;
`;

const dropdownHeight = "100px";