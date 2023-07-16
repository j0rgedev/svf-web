import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import toast from "react-hot-toast";
import styled from "styled-components";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {payPensions} from "../setup/api/student.js";
import {getCookie} from "../../login/setup/utils/cookiesConfig.js";

export function PaymentModal ({isOpen, onClose, selectedPensions}) {
	const [isCardChecked, setCardChecked] = useState(false);
	const [isCashChecked, setCashChecked] = useState(false);
	const MotionOptionsCard = motion(OptionsCard);
	const queryClient = useQueryClient();

	let toastId = null;
	const {isLoading, mutateAsync} = useMutation({
		mutationFn: payPensions,
		onSuccess: () => {
			toast.success('Pago realizado con éxito', {id: toastId});
			onClose();
			queryClient.refetchQueries({queryKey: ['pensions']});
			queryClient.refetchQueries({queryKey: ['paidPensions']});
		},
		onError: () => {
			toast.error('Error al realizar el pago', {id: toastId});
		}
	})

	const handleConfirm = async () => {
		const paymentId = getPaymentId();
		const paymentDate = getDate();
		const pensionCod = selectedPensions.map(pension => pension.pensionCod);
		const token = getCookie('SESSION').token;
		const data = {
			pensionCod,
			paymentDate,
			paymentId
		}
		const body = JSON.stringify(data);
		const values = {
			token,
			body
		}
		toastId = toast.loading('Realizando pago de las pensiones: ' + pensionCod.join(', '));
		await mutateAsync(values);
	};

	const handleCancel = () => {
		onClose();
	};

	const getPaymentId = () => {
		if (isCardChecked) {
			return 'P20'
		} else if (isCashChecked) {
			return 'P10'
		}
	}

	const getDate = () => {
		const date = new Date();
		date.setUTCHours(date.getUTCHours() - 5);
		return date.toISOString();
	}

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
					<ButtonPay onClick={handleConfirm} disabled={isLoading || (!isCardChecked && !isCashChecked)}>Confirmar pago</ButtonPay>
				</ModalActions>
			</ModalContent>
		</ModalWrapper>
	);
};


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



const Circle= styled.div`
  border-radius: 2rem;
  border: 2px solid #2b4433;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
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
	
	&:disabled{
		background: rgb(43, 68, 51, 0.5);
		cursor: not-allowed;
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