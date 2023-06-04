import {useContext, useEffect} from 'react';
import styled from 'styled-components';
import {EnrollmentProcessContext} from "../setup/context/EnrollmentProcessContext.jsx";

const PaymentOptions = ({formik, selectedOption, setSelectedOption}) => {

    const {enrollmentProcess, setEnrollmentProcess} = useContext(EnrollmentProcessContext);

    const updatePaymentMethod = () => {
        switch (selectedOption) {
            case 'credit-card':
                setEnrollmentProcess({
                    ...enrollmentProcess,
                    paymentMethod: {
                        paymentId: 'P10',
                        paymentType: 'Tarjeta de Crédito o Débito'
                    }
                })
                break;
            case 'pago-efectivo':
                setEnrollmentProcess({
                    ...enrollmentProcess,
                    paymentMethod: {
                        paymentId: 'P20',
                        paymentType: 'Pago Efectivo'
                    }
                })
                break;
            default:
                setEnrollmentProcess({
                    ...enrollmentProcess,
                    paymentMethod: {
                        paymentId: 0,
                        paymentType: ''
                    }
                })
        }
    }

    useEffect(() => {
        updatePaymentMethod()
    }, [selectedOption])

    const handleOptionClick = (option) => {
        if (selectedOption === option) {
            setSelectedOption(null);
        } else {
            setSelectedOption(option);
            formik.resetForm()
        }
    };

    return (
        <Container>
            <Option>
                <OptionHeader
                    onClick={() => handleOptionClick('credit-card')}
                    isSelected={selectedOption === 'credit-card'}
                >
                    <Checkbox checked={selectedOption === 'credit-card'}/>
                    <OptionLabel>Tarjeta de crédito o débito</OptionLabel>
                </OptionHeader>
                {selectedOption === 'credit-card' && (
                    <Accordion>
                        <CardDetailsWrapper>
                            <InputWrapper gridFull={true}>
                                <label htmlFor="card_holder">Nombre del titular</label>
                                <Input
                                    type="text"
                                    id="card_holder"
                                    value={formik.values.card_holder}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={formik.errors.card_holder && formik.touched.card_holder ? 'error' : ''}
                                />
                                {
                                    formik.errors.card_holder && formik.touched.card_holder ?
                                        <p className={'error'}
                                           style={{fontSize: '14px'}}>{formik.errors.card_holder}</p>
                                        : null
                                }
                            </InputWrapper>
                            <InputWrapper gridFull={true}>
                                <label htmlFor="card_number">Número de la tarjeta</label>
                                <Input
                                    type="number"
                                    id="card_number"
                                    value={formik.values.card_number}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={formik.errors.card_number && formik.touched.card_number ? 'error' : ''}
                                />
                                {
                                    formik.errors.card_number && formik.touched.card_number ?
                                        <p className={'error'}
                                           style={{fontSize: '14px'}}>{formik.errors.card_number}</p>
                                        : null
                                }
                            </InputWrapper>
                            <InputWrapper gridFull={false}>
                                <label htmlFor="card_exp">Vencimiento</label>
                                <Input
                                    type="month"
                                    id="card_exp"
                                    value={formik.values.card_exp}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={formik.errors.card_exp && formik.touched.card_exp ? 'error' : ''}
                                />
                                {
                                    formik.errors.card_exp && formik.touched.card_exp ?
                                        <p className={'error'} style={{fontSize: '14px'}}>{formik.errors.card_exp}</p>
                                        : null
                                }
                            </InputWrapper>
                            <InputWrapper gridFull={false}>
                                <label htmlFor="card_cvv">CVV</label>
                                <Input
                                    type="number"
                                    id="card_cvv"
                                    value={formik.values.card_cvv}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={formik.errors.card_cvv && formik.touched.card_cvv ? 'error' : ''}
                                />
                                {
                                    formik.errors.card_cvv && formik.touched.card_cvv ?
                                        <p className={'error'} style={{fontSize: '14px'}}>{formik.errors.card_cvv}</p>
                                        : null
                                }
                            </InputWrapper>
                        </CardDetailsWrapper>
                    </Accordion>
                )}
            </Option>
            <Option>
                <OptionHeader
                    onClick={() => handleOptionClick('pago-efectivo')}
                    isSelected={selectedOption === 'pago-efectivo'}
                >
                    <Checkbox checked={selectedOption === 'pago-efectivo'}/>
                    <OptionLabel>Pago Efectivo</OptionLabel>
                </OptionHeader>
                {selectedOption === 'pago-efectivo' && (
                    <Accordion>
                        <p>PAGO EFECTIVO</p>
                    </Accordion>
                )}
            </Option>
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Option = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OptionHeader = styled.div`
  display: flex;
  width: 100%;
  padding: 8px;
  border: 1px solid ${(props) => (props.isSelected ? '#918678' : '#ccc')};
  background-color: ${(props) => (props.isSelected ? '#E8E5E2' : 'none')};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: #918678;
  }
`

const Checkbox = styled.div`
  width: 20px;
  height: 20px;
  border: 1.5px solid ${(props) => (props.checked ? '#61523D' : '#7C7C7C')};
  border-radius: 50%;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;

  &::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #61523D;
    display: ${(props) => (props.checked ? 'block' : 'none')};
  }
`;

const OptionLabel = styled.span`
  flex: 1;
`;

const Accordion = styled.div`
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #918678;
`;

const CardDetailsWrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 44%;
  gap: 16px;
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: ${(props) => (props.gridFull ? '1 / span 2' : 'auto')};

  .error {
    border-color: #FF0000;
    color: #FF0000;
  }

`

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
export default PaymentOptions;
