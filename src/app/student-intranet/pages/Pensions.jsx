import styled from 'styled-components';
import { FaArrowLeft } from 'react-icons/fa';
import avatar from '../../../../src/app/admin-intranet/assets/avatar.png';
import Dues from '../components/Dues';
import PaidPensions from "../components/PaidPensions.jsx";
import { useEffect, useState } from "react";
import {getCookie, removeCookie} from "../../login/setup/utils/cookiesConfig.js";
import { getPensions } from "../setup/api/student.js";
import { useQuery } from "react-query";
import { PropagateLoader } from "react-spinners";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import {useNavigate} from "react-router-dom";
import {PaymentModal} from "../components/PaymentModal.jsx";

export default function Pensions() {
  const [totalDebt, setTotalDebt] = useState(0);
  const [initialPensions, setInitialPensions] = useState([]);
  const [pensions, setPensions] = useState([]);
  const [isMultiplePaymentEnabled, setMultiplePaymentEnabled] = useState(false);
  const [selectedPensions, setSelectedPensions] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMainSectionVisible, setMainSectionVisible] = useState(true);

  const { isLoading: arePensionsLoading } = useQuery({
    queryKey: 'pensions',
    queryFn: async () => {
      const token = getCookie('SESSION').token;
      return await getPensions(token,0);
    },
    onSuccess: ({ data }) => {
      if(data.pensions.length === 0){
        toast('No hay pensiones pendientes', {
          icon: '📚🚫',
        });
      }
      setTotalDebt(data.totalDebt);
      setPensions(data.pensions);
      setInitialPensions(data.pensions);
    },
    onError: () => {
      toast.error('Error al obtener las pensiones');
    },
  });

  const {data: paidPensions , isLoading: arePaidPensionsLoading} = useQuery({
    queryKey: 'paidPensions',
    queryFn: async () => {
      const token = getCookie('SESSION').token;
      return await getPensions(token,1);
    },
    onSuccess: ({ data }) => {
      if(data.pensions.length === 0){
        toast('No tienes pensiones pagadas', {
          icon: '📚🚫',
        });
      }
    },
    onError: () => {
      toast.error('Error al obtener las pensiones pagadas');
    },
    enabled: !isMainSectionVisible
  })


  const handlePensionClick = (pensionId) => {
    if (isMultiplePaymentEnabled) {
      const lastSelectedPension = selectedPensions.length > 0 ? selectedPensions[selectedPensions.length - 1] : null;

      if (!lastSelectedPension || lastSelectedPension.pensionCod === pensionId - 1) {
        const selectedPension = pensions[0]?.find((pension) => pension.pensionCod === pensionId);

        if (selectedPension) {
          setSelectedPensions((prevSelectedPensions) => [
            ...prevSelectedPensions,
            selectedPension,
          ]);

          const updatedPensions = pensions[0].filter((pension) => pension.pensionCod !== pensionId);
          setPensions([updatedPensions, ...pensions.slice(1)]);
        }
      } else {
        toast.error('Solo puedes seleccionar pensiones consecutivas');
      }
    } else {
      setModalOpen(true);
      setSelectedPensions([pensions[0].find((pension) => pension.pensionCod === pensionId)]);
    }
  };

  const handleMultiplePaymentEnable = () => {
    setMultiplePaymentEnabled((prevIsMultiplePaymentEnabled) => !prevIsMultiplePaymentEnabled);
    setSelectedPensions([]);
    setPensions(initialPensions);
    if (!isMultiplePaymentEnabled) toast("Dale click a las pensiones que deseas pagar", { icon: '💡' }, { duration: 2000 });
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedPensions([]);
    setPensions(initialPensions);
    setMultiplePaymentEnabled(false)
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <ContStudent>
      {isModalOpen && <PaymentModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        selectedPensions={selectedPensions}/>}
      <TopContent>
        <div className={'top-left'}>
          <Return href='/estudiante'><FaArrowLeft style={{ fontSize: '24px' }} /></Return>
          <h2>Pensiones</h2>
        </div>
        <Image onClick={handleDropdownToggle}>
          <img src={avatar} alt="student_avatar" />
          {isDropdownOpen && (
            <DropdownContent
              initial="hidden"
              animate="visible"
              variants={dropdownVariants}
              transition={{ duration: 0.3 }}>
              <DropdownItem onClick={()=> {
                removeCookie('SESSION')
                const navigate = useNavigate();
                navigate('/login')
              }}>Cerrar Sesión</DropdownItem>
            </DropdownContent>
          )}
        </Image>
      </TopContent>
      <ContTargets>
        <ContTitle>
          <TitleSections>Deuda total</TitleSections>
          <TitleSections>S/{totalDebt}</TitleSections>
        </ContTitle>
        <ContSection>
          <Section isSelected={isMainSectionVisible} onClick={()=>setMainSectionVisible(!isMainSectionVisible)}>Cuotas</Section>
          <Section isSelected={!isMainSectionVisible} onClick={()=>setMainSectionVisible(!isMainSectionVisible)}>Historial</Section>
        </ContSection>
        {
          arePaidPensionsLoading && <Loader><PropagateLoader/></Loader>
        }
        {
          isMainSectionVisible ? (
            <>
              <ButtonsWrapper>
                <StyledButton
                  isMain={false}
                  isSelected={isMultiplePaymentEnabled}
                  onClick={handleMultiplePaymentEnable}>
                  {isMultiplePaymentEnabled ? 'Deshabilitar pago múltiple' : 'Habilitar pago múltiple'}
                </StyledButton>
                <StyledButton
                  isMain={true}
                  isSelected={isMultiplePaymentEnabled}
                  disabled={selectedPensions.length <= 1}
                  onClick={handleModalOpen}
                >
                  Pagar
                </StyledButton>
              </ButtonsWrapper>
              <SelectedPensions>
                <AnimatePresence>
                  {isMultiplePaymentEnabled && selectedPensions.map((selectedPension) => (
                    <motion.div
                      key={selectedPension.pensionCod}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                    >
                      <SelectedPension>
                        <SelectedPin>{selectedPension.pensionCod}</SelectedPin>
                        <SelectedText>{selectedPension.pensionName}</SelectedText>
                      </SelectedPension>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </SelectedPensions>
              <PensionsWrapper>
                {pensions[0]?.length === 0 && <h2>{customText || ''}</h2>}
                {pensions[0]?.map((pension, index) => {
                  return (
                    <Dues
                      key={index}
                      id={pension.status === 'Pendiente' ? 'state2' : 'state'}
                      cod={pension.pensionCod}
                      text={pension.pensionName}
                      nameState={pension.status}
                      amount={pension.pensionAmount}
                      date={pension.dueDate}
                      onClick={() => handlePensionClick(pension.pensionCod)}
                      isSelected={isMultiplePaymentEnabled && selectedPensions.some((selectedPension) => selectedPension.pensionCod === pension.pensionCod)}
                    />
                  );
                })}
              </PensionsWrapper>
            </>
          ) : (
            <PensionsWrapper>
              {
                arePaidPensionsLoading && <Loader><PropagateLoader/></Loader>
              }
              {paidPensions && paidPensions.data.pensions[0]?.map((pension, index) => {
                return (
                  <PaidPensions
                    key={index}
                    pension={pension}
                  />
                );
              })}
            </PensionsWrapper>
          )
        }
      </ContTargets>
    </ContStudent>
  );
}

const DropdownContent = styled(motion.div)`
  background-color: #a8923a;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  z-index: 999;
`;

const DropdownItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background-color: #d1b33e;
	border-radius: 4px;
  }
`;


const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const SelectedPensions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
`;

const SelectedPension = styled.div`
  background-color: #d7d3d1;
  padding: 5px 10px;
  border-radius: 5px;
`;

const SelectedPin = styled.p`
  font-size: 12px;
  margin-bottom: 5px;
`;

const SelectedText = styled.p`
  font-size: 14px;
`;

const ContStudent = styled.div`
  background-color: #2b4433;
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const TopContent = styled.div`
  padding: 1rem 2rem 2rem;
  display: flex;
  flex-direction: row;
  gap: 15px;
  text-align: center;
  align-items: center;
  justify-content: space-between;

  .top-left {
    display: flex;
    gap: 10px;
  }
`;

const Image = styled.div`
  width: 8%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;

  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PensionsWrapper = styled.div`
  padding: 2rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;

  .pension {
    max-width: 1000px;
    width: 100%;
  }
`;

const ContTargets = styled.div`
  background-color: #e1e1e1;
  padding: 2rem;
  border-radius: 3rem 3rem 0 0;
  color: black;
  gap: 10px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const StyledButton = styled.button`
  background-color: ${(props) => (props.isMain ? '#2b4433' : props.isSelected ? '#ababab' : 'transparent')};
  color: ${(props) => (props.isMain ? '#fff' : '#000')};
  border: ${(props) => (props.isMain ? 'none' : '2px solid #ababab')};
  border-radius: 5px;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  max-width: 250px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.isMain ? '#1e2f23' : '#ababab')};
  }

  &:disabled {
    background-color: #676767;
    cursor: not-allowed;
    color: #c0c0c0;
  }
`;

const Return = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  color: white;
`;

const TitleSections = styled.h2`
  font-weight: 500;
  font-size: clamp(8px, 5vw, 24px);
`;

const ContTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ContSection = styled.div`
  gap: 20px;
  display: flex;
  border-bottom: #818181 solid 1px;
`;

const Section = styled.span`
  border-bottom: ${(props) => (props.isSelected ? '#2b4433 solid 2px' : 'none')};
  font-size: clamp(8px, 4vw, 18px);
  cursor: pointer;
  text-decoration: none;
  color: black;
`;
