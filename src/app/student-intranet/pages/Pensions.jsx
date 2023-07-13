import styled from 'styled-components';
import { FaArrowLeft } from 'react-icons/fa';
import avatar from '../../../../src/app/admin-intranet/assets/avatar.png';
import Dues from '../components/Dues';
import { useEffect, useState } from "react";
import { getCookie } from "../../login/setup/utils/cookiesConfig.js";
import { getPensions } from "../setup/api/student.js";
import { useQuery } from "react-query";
import { PropagateLoader } from "react-spinners";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

const PaymentModal = ({ isOpen, onClose }) => {
  const [isCardChecked, setCardChecked] = useState(false);
  const [isCashChecked, setCashChecked] = useState(false);
  const MotionOptionsCard = motion(OptionsCard);

  const handleConfirm = () => {
    onClose();
    toast.success('Pensión pagada');
  };

  const handleCancel = () => {
    onClose();
  };

  const handleCardCheckboxChange = () => {
    setCardChecked(true);
    setCashChecked(false);
  };

  const handleCashCheckboxChange = () => {
    setCardChecked(false);
    setCashChecked(true);
  };

  return (
    <ModalWrapper isOpen={isOpen}>
      <ModalContent>
        <ModalTitle>Metodos de Pago</ModalTitle>
        <ModalBody>
          <CheckboxWrapper>
            <CheckContent>
              <Circle>
              <Checkbox
                type="checkbox"
                checked={isCardChecked}
                onChange={handleCardCheckboxChange}
              /> </Circle>Tarjeta de Credito
            </CheckContent>
            <AnimatePresence>
              {isCardChecked && (
                <MotionOptionsCard
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <OptionsCard visible={isCardChecked}>
                  <InputWrapper gridFull={false}>
                      <label htmlFor="card_holder">Nombre del titular</label>
                      <Input type='text' />
                    </InputWrapper>
                    <InputWrapper gridFull={false}>
                      <label htmlFor="card_number">Número de la tarjeta</label>
                      <Input type='text' />
                    </InputWrapper>
                    <InputWrapper gridFull={false}>
                      <label htmlFor="card_exp">Vencimiento</label>
                      <Input type='date' />
                    </InputWrapper>
                    <InputWrapper gridFull={false}>
                      <label htmlFor="card_exp">CVV</label>
                      <Input type='text' />
                    </InputWrapper>
                  </OptionsCard>
                </MotionOptionsCard>
              )}
            </AnimatePresence>
          </CheckboxWrapper>
          <CheckboxWrapper>
            <CheckContent>
              <Circle>
              <Checkbox
                type="checkbox"
                checked={isCashChecked}
                onChange={handleCashCheckboxChange}
              /></Circle> Pago Efectivo
            </CheckContent>
          </CheckboxWrapper>
        </ModalBody>
        <ModalActions>
          <ButtonCancel onClick={handleCancel}>Cancelar</ButtonCancel>
          <ButtonPay onClick={handleConfirm}>Confirmar pago</ButtonPay>
        </ModalActions>
      </ModalContent>
    </ModalWrapper>
  );
};



export default function Pensions() {
  const [totalDebt, setTotalDebt] = useState(0);
  const [initialPensions, setInitialPensions] = useState([]);
  const [pensions, setPensions] = useState([]);
  const [isMultiplePaymentEnabled, setMultiplePaymentEnabled] = useState(false);
  const [selectedPensions, setSelectedPensions] = useState([]);
  const [customText, setCustomText] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);


  const { isLoading: arePensionsLoading } = useQuery({
    queryKey: 'pensions',
    queryFn: async () => {
      const token = getCookie('SESSION').token;
      return await getPensions(token);
    },
    onSuccess: ({ data }) => {
      setTotalDebt(data.totalDebt);
      setPensions(data.pensions);
      setInitialPensions(data.pensions);
      setCustomText('No tienes deudas pendientes');
    },
    onError: () => {
      toast.error('Error al obtener las pensiones');
      setCustomText('Error de conexión, intenta de nuevo más tarde');
    },
  });

  if (arePensionsLoading) return <Loader><PropagateLoader /></Loader>;

  const handlePensionClick = (pensionId) => {
    if (isMultiplePaymentEnabled) {
      const lastSelectedPensionId = selectedPensions.length > 0 ? selectedPensions[selectedPensions.length - 1].id : null;

      if (!lastSelectedPensionId || lastSelectedPensionId === pensionId - 1) {
        const pension = pensions[0]?.find((pension) => pension.pensionCod === pensionId);
        setSelectedPensions((prevSelectedPensions) => [
          ...prevSelectedPensions,
          { id: pensionId, pension },
        ]);
        const updatedPensions = { ...pensions };
        updatedPensions[0] = updatedPensions[0].filter((pension) => pension.pensionCod !== pensionId);
        setPensions(updatedPensions);
      } else {
        toast.error('Solo puedes seleccionar pensiones consecutivas');
      }
    } else {
      setModalOpen(true);
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
              <DropdownItem>Cerrar Sesión</DropdownItem>
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
          <SectionDues>Cuotas</SectionDues>
          <SectionHistory href='#'>Historial</SectionHistory>
        </ContSection>
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
            {selectedPensions.map((selectedPension) => (
              <motion.div
                key={selectedPension.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
              >
                <SelectedPension>
                  <SelectedPin>{selectedPension.pension.pensionCod}</SelectedPin>
                  <SelectedText>{selectedPension.pension.pensionName}</SelectedText>
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
                isSelected={selectedPensions.some((selectedPension) => selectedPension.id === pension.pensionCod)}
              />
            );
          })}
        </PensionsWrapper>
      </ContTargets>
      {isModalOpen && <PaymentModal isOpen={isModalOpen} onClose={handleModalClose} />} 
    </ContStudent>
  );
}


const CheckContent = styled.div`
  background: #61523d15;
  padding: 0.6rem;
  display: flex;
  gap: 10px;
`;


const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
  border: solid 1px;
`;

const Checkbox = styled.input`
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #fff;
  outline: none;
  cursor: pointer;
  padding: 0.2rem;

  &:checked {
    background-color: #61523D;
  }
`;

const OptionsCard = styled(motion.div)`
  overflow: hidden;
  padding: 0.4rem;
`;

const DropdownContent = styled(motion.div)`
  background-color: #a8923a;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  z-index: 999;
`;

const Circle= styled.div`
  border-radius: 2rem;
  border: 2px solid #2b4433;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DropdownItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background-color: #d1b33e;
	border-radius: 4px;
  }
`;
const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5); // Fondo oscurecido
  z-index: 999;
  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transition: visibility 0.3s, opacity 0.3s;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  width: 30%;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  color: #000;

  @media (max-width: 850px) {
    width: 60%; 
  }

  @media (max-width: 400px) {
    width: 80%; 
  }
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ModalBody = styled.div`
  margin-bottom: 20px;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  
`;
const ButtonPay = styled.button`
  padding:10px;
  border-radius: 1rem;
  border: none;
  cursor: pointer;
  background: rgb(43, 68, 51);
  color: #fff;

  &:hover{
	background: rgb(59 107 74);
  }
`;

const ButtonCancel = styled.button`
  padding:10px;
  border-radius: 1rem;
  border: none;
  cursor: pointer;
  background: rgb(182 0 0);
  color: #fff;
  &:hover{
	background: rgb(235 52 52);
  }
`;

const Input = styled.input`
  border: 1px solid rgba(124, 124, 124, 0.7);
  border-radius: 4px;
  height: 36px;
  padding: 0 12px;
  font-size: 14px;

  &:focus {
    outline: none;
  }
`
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0px;
  grid-column: ${(props) => (props.gridFull ? '1 / span 2' : 'auto')};

  .error {
    border-color: #FF0000;
    color: #FF0000;
  }

`

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

const SectionDues = styled.a`
  border-bottom: rgb(59, 43, 68) solid 1px;
  font-size: clamp(8px, 4vw, 18px);
  cursor: pointer;
  text-decoration: none;
  color: black;
`;
const SectionHistory = styled.a`
  font-size: clamp(8px, 4vw, 18px);
  cursor: pointer;
  text-decoration: none;
  color: black;
`;
