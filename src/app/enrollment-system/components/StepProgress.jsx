import styled from "styled-components";


export default function StepProgress({ number, onStepClick, termsAccepted }) {
    const handleStepClick = (step) => {
        termsAccepted ? onStepClick(step) : onStepClick(2);
    };

    return (
            <StepProgressContainer>
                <Step>
                    <Bullet
                        className={number === 1 ? 'bullet completed' : 'bullet'}
                        onClick={() => handleStepClick(1)}
                    >
                        1
                    </Bullet>
                    <StepText className={number === 1 ? 'step-text completed' : 'step-text'}>Datos</StepText>
                </Step>
                <Step>
                    <Bullet
                        className={number === 2 ? 'bullet completed' : 'bullet'}
                        onClick={() => handleStepClick(2)}
                    >
                        2
                    </Bullet>
                    <StepText className={number === 2 ? 'step-text completed' : 'step-text'}>Detalles</StepText>
                </Step>
                <Step>
                    <Bullet
                        last={true}
                        className={number === 3 ? 'last-bullet completed' : 'last-bullet'}
                        onClick={() => handleStepClick(3)}
                    >
                        3
                    </Bullet>
                    <StepText className={number === 3 ? 'step-text completed' : 'step-text'}>Pagos</StepText>
                </Step>
            </StepProgressContainer>
    );
}

const StepProgressContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`

const Step = styled.div`
    text-align: center;
    cursor: pointer;
`

const Bullet = styled.div`
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    border-radius: 100%;
    border: 2px solid #D9D9D9;
    color: #D9D9D9;
    position: relative;
    transition: background-color 500ms;
  
    &.completed {
      color: white;
      border: 2px solid #3A470F;
      background-color:#3A470F;
    }
  
    ${props => !props.last && `
        ::after {
            content: '';
            position: absolute;
            height: 1px;
            width: 84px;
            background-color: #D9D9D9;
            right: -88px;
            bottom: 20px;
        }
    `}
`

const StepText = styled.p`
    margin-bottom: 10px;
    color: #7C7C7C;
  
    &.completed {
        font-weight: bold;
        color: black;
    }
`
