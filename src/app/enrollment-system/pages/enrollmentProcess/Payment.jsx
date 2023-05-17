import Button from '../../components/Button.jsx'
import styled, {css} from 'styled-components'
import PaymentOptions from "../../components/PaymentOptions.jsx";
import {useFormik} from "formik";
import {creditCardSchema} from "../../setup/schemas/creditCardSchema.js";
import {useContext, useEffect, useState} from "react";
import {useMutation, useQuery} from "react-query";
import {EnrollmentProcessContext} from "../../setup/context/EnrollmentProcessContext.jsx";
import {useEnrollment} from "../../setup/api/enrollmentAPI.js";
import {getCookie} from "../../setup/config/cookiesConfig.js";

function Payment({setAlertInfo}) {

    const {enrollmentProcess, setEnrollmentProcess} = useContext(EnrollmentProcessContext);

    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false)

    const {data: studentData} = useQuery('student')
    const student = studentData.data;

    const {data: schoolTerms} = useQuery('schoolTerms')

    const token = getCookie('SESSION');

    const getTotalAmount = () => {
        const amounts = schoolTerms['levelCosts'];
        const studentNewLevel = student['newLevel'];
        let totalAmount = 0;
        amounts.forEach((amount) => {
            if (amount['name'] === studentNewLevel) {
                totalAmount = amount['cost'];
            }
        })
        return totalAmount;
    }

    const getDate = () => {
        const date = new Date();
        date.setUTCHours(date.getUTCHours() - 5);
        return date.toISOString();
    }

    const getLevel = () => {
        const studentNewLevel = student['newLevel'];
        const currentYear = new Date().getFullYear();
        const levelID = `L${studentNewLevel[0].toUpperCase()}${currentYear}`;
        return {
            levelId: levelID,
            levelName: studentNewLevel
        }
    }


    const enrollmentMutation = useMutation({
        mutationFn: useEnrollment,
        onSuccess: (data) => {
            setIsSubmitting(false);
            setEnrollmentProcess({
                enrollmentId: data['enrollmentId'],
            })
        },
        onError: () => {
            setIsSubmitting(false);
            setAlertInfo({
                type: "error",
                text: "Oops! Algo salió mal",
                subtext: "No se pudo realizar la matrícula, por favor, intenta nuevamente.",
            });
        }
    })

    const handleCancel = () => {
        setAlertInfo({
            type: "warning",
            text: "¿Estas seguro?",
            subtext: "Estas a punto de cancelar la operación",
            redirectUrl: "/matricula/login"
        })
    }

    const onSubmit = async (actions) => {
        const date = getDate();
        setIsSubmitting(true);
        const enrollmentBody = {
            ...enrollmentProcess,
            date: date
        };
        const body = JSON.stringify(enrollmentBody);
        const values = {
            token,
            body
        }
        await enrollmentMutation.mutateAsync(values)
        if (enrollmentMutation.status === 'success' || enrollmentMutation.status === 'error') {
            actions.resetForm();
        }
    }

    useEffect(() => {
        const totalAmount = getTotalAmount();
        const level = getLevel();
        setEnrollmentProcess({...enrollmentProcess, totalAmount, level});
    }, [])

    const formik = useFormik({
        initialValues: {
            card_holder: '',
            card_number: '',
            card_exp: '',
            card_cvv: ''
        },
        validationSchema: creditCardSchema,
        onSubmit
    })

    const formik1 = useFormik({
        initialValues: {},
        onSubmit
    });

    return (
        <PaymentWrapper>
            <SummaryWrapper>
                <h2>Resumen</h2>
                <Table>
                    <tbody>
                    <tr>
                        <td>Código</td>
                        <td>{student['studentCod']}</td>
                    </tr>
                    <tr>
                        <td>Monto</td>
                        <td>S/{getTotalAmount()}</td>
                    </tr>
                    <tr>
                        <td>Descuentos</td>
                        <td>S/0</td>
                    </tr>
                    <tr>
                        <td>Total a pagar</td>
                        <td>S/{getTotalAmount()}</td>
                    </tr>
                    </tbody>
                </Table>
            </SummaryWrapper>
            <PaymentMethodsWrapper>
                <h2>Métodos de Pago</h2>
                <Form onSubmit={selectedOption === 'credit-card' ? formik.handleSubmit : formik1.handleSubmit}>
                    <FormWrapper>
                        <PaymentOptions
                            formik={formik}
                            selectedOption={selectedOption}
                            setSelectedOption={setSelectedOption}/>
                        <ButtonWrapper>
                            <Button text={'Cancelar'} isMain={false} onClick={handleCancel}/>
                            {
                                !isSubmitting && selectedOption ?
                                    <Button text={'Pagar'} isMain={true} submit={true}/> :
                                    <Button text={'Pagar'} isMain={true} isLoading={true} submit={true}/>
                            }
                        </ButtonWrapper>
                    </FormWrapper>
                </Form>
            </PaymentMethodsWrapper>
        </PaymentWrapper>
    )
}

const PaymentWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
    width: 100%;
    margin-top: 12px;
  height: 100%;
    
    @media (min-width: 920px) {
        justify-content: space-between;
        gap: 0;
    }
`

const Form = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: 920px) {
    height: inherit;
  }
`

const FormWrapper = styled.div`
  display: flex;
  height: 100%;
  gap: 22px;
  flex-direction: column;
`

const ContainerStyles = css`
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.25);
  border-radius: 25px;
  padding: 2rem;
  width: 100%;

  @media (min-width: 920px) {
    height: 100%;
    min-height: 450px;
    padding: 1.5rem;
  }
`

const SummaryWrapper = styled.div`
  ${ContainerStyles};
  @media (min-width: 920px) {
    width: 40%;
  }
`

const PaymentMethodsWrapper = styled.div`
  ${ContainerStyles};
  height: 650px;
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  gap: 20px;

  button {
    height: 40px;
    font-size: 16px;
  }

  @media (min-width: 920px) {
    width: 55%;
    overflow-y: auto;
  }
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  tr {
    height: 40px;
  }

  td {
    font-size: 14px;
  }

  tr:last-child {
    height: 60px;
    border-top: 2px solid black;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 1rem;
`

export default Payment