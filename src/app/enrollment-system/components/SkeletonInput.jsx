import styled from 'styled-components'
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

function SkeletonInput({icon,labelText}) {
    return (
        <SkeletonTheme baseColor="#ECECEC" highlightColor="#F8F8F8">
            <InputDiv>
                <Skeleton height={'40px'}/>
            </InputDiv>
        </SkeletonTheme>
    )
}

const InputDiv = styled.div`
    height: 40px;
`;

const Label = styled.label`
    color: #848874;
`

export default SkeletonInput
