import { useState, useEffect, useRef } from 'react';
import Pensions from './Pensions';
import Historial from './Historial';
import styled from 'styled-components';
import Header from '../components/Header';
import { useQuery,QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default function PensionsLayout() {
  const [currentStep, setCurrentStep] = useState('Pensions');
  const [totalDebt, setTotalDebt] = useState(0);
  const [pensions, setPensions] = useState([]);
  const [initialPensions, setInitialPensions] = useState([]);
  const [customText, setCustomText] = useState('');
  const pensionsRefetch = useRef();


  const { isLoading: arePensionsLoading, refetch: refetchPensions } = useQuery({
    queryKey: 'pensions',
    onSuccess: ({ data }) => {
      setTotalDebt(data.totalDebt);
      setPensions(data.pensions);
      setInitialPensions(data.pensions);
    },
    onError: () => {
      setCustomText('Error de conexión, intenta de nuevo más tarde');
    },
  });

  useEffect(() => {
    refetchPensions();
  }, [currentStep]);

  const handleStepClick = (step) => {
    setCurrentStep(step);
  };

  let component;
  switch (currentStep) {
    case 'Pensions':
      component = <Pensions refetch={pensionsRefetch} />;
      break;
    case 'Historial':
      component = <Historial/>;
      break;
    default:
      component = null;
  }

  return (
    <QueryClientProvider client={queryClient}>
    <Container>
      <Header />
      <ContStudent>
        <ContTargets>
          <ContTitle>
            <TitleSections>Deuda total</TitleSections>
            <TitleSections>S/{totalDebt}</TitleSections>
          </ContTitle>
          <ContSection>
            <SectionDues onClick={() => handleStepClick('Pensions')}>Cuotas</SectionDues>
            <SectionHistory onClick={() => handleStepClick('Historial')}>Historial</SectionHistory>
          </ContSection>
          <Body>{component}</Body>
        </ContTargets>
      </ContStudent>
    </Container>
    </QueryClientProvider>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Body = styled.div`
  width: 100%;
  flex: 1 1 0;
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

const SectionDues = styled.button`
  border-bottom: rgb(59, 43, 68) solid 1px;
  font-size: clamp(8px, 4vw, 18px);
  cursor: pointer;
  text-decoration: none;
  color: black;
  border:none;
  background: transparent;
`;
const SectionHistory = styled.button`
  font-size: clamp(8px, 4vw, 18px);
  cursor: pointer;
  text-decoration: none;
  color: black;
  border:none;
  background: transparent;
`;

const ContStudent = styled.div`
  background-color: #2b4433;
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;