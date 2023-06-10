import styled, { keyframes } from 'styled-components';

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  justify-content: center;
`;

const ProgContainer = styled.div`
  background: #D9D9D94D;
  border-radius: 1rem;
  display: flex;
  height: 16px;
  font-size: 12px;
`;

const loadAnimation = (width) => keyframes`
  0% {
    width: 0;
  }
  100% {
    width: ${width};
  }
`;

const ProgressValue = styled.div`
  animation: ${loadAnimation} 3s normal forwards;
  box-shadow: 0 10px 40px -10px #fff;
  border-radius: 100px;
  background: #D9D9D9;
  height: 16px;
  width: 0;
`;

const MonthsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 12px;
`;

const VidContainer= styled.span`
  height: 27px;
  background: rgb(170, 166, 166);
  width: 4px;
  float: right;
  margin-top: -7px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LineContainer= styled.span`
  display:flex;
`;

const Month= styled.p`
  margin-top: 22px;
`;

export default function Progress({ month, width }) {

    const shouldHideRuedaContainer = width === "100%";

  return (
    <ContentContainer>
      <ProgContainer>
      <ProgressValue style={{ width }} />
      {!shouldHideRuedaContainer && (
        <LineContainer>
      <VidContainer></VidContainer><Month>{month}</Month></LineContainer>
      )}
      </ProgContainer>

      <MonthsContainer>
        <p>Marzo</p>
        <p>Diciembre</p>
      </MonthsContainer>
    </ContentContainer>
  );
}
