import styled from 'styled-components';

const SectionContainer = styled.div`
  background: ${({ backgroundGradient }) =>
  `linear-gradient(to right, ${backgroundGradient})`};
  color: white;
  padding: 0.7rem;
  gap: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 0.5rem;
  font-size: clamp(12px, 10vw, 22px);
  cursor:pointer;
`;

const IconContainer = styled.div`
  border-radius: 2rem;
  display: flex;
  align-items: center;
  background-color: #d9d9d957;
  padding: 0.5rem;
`;

const AnimatedSectionContainer = styled(SectionContainer)`
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;

  &:hover {
    opacity: 0.7;
    transform: translateX(10px); 
  }
`;
const Link = styled.a`
  text-decoration:none;
`;

export default function Sections({ icon, text, backgroundGradient, href }) {
  return (
    <Link href={href}>
    <AnimatedSectionContainer backgroundGradient={backgroundGradient}>
      <IconContainer>{icon}</IconContainer>
      <p>{text}</p>
    </AnimatedSectionContainer>
  </Link>
  );
}