import { createGlobalStyle } from 'styled-components';

const Globals = createGlobalStyle`
    h1 {
        font-size: clamp(22px, 2.5vw, 24px);
        text-align: center;
        line-height: 1.3;
    }

    p {
        font-size: clamp(12px, 2.5vw, 18px);
        text-align: center;
    }

    .hero {
        width: 100%;
        height: 100%;
        padding: 2rem clamp(1rem, 5vw, 2.5rem);
    }
`

export default Globals;