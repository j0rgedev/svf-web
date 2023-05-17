import {useMutation, useQuery} from "react-query";
import {useSchoolTerms} from "../../setup/api/schoolTermsAPI.js";
import {useEffect, useState} from "react";
import styled from 'styled-components'
import Skeleton from "react-loading-skeleton";
import Button from "../../components/Button.jsx";

function SchoolTerms({termsAccepted, setHandleTermAccepted}) {

    const {isLoading, data} = useQuery('schoolTerms', useSchoolTerms, {
        onError: (error) => {
            console.log(error);
        }
    });

    const handleClick = () => {
        setHandleTermAccepted(true);
    }

    return (
        <TermsContainer className='terms-container'>
            <h2 align={'center'}>AÑO ESCOLAR 2023</h2>
            {
                isLoading ? <Skeleton count={9} width={'100%'}/> :
                    <>
                        <p>{data['mainInfo']}</p>
                        {data['termDetails'].map((termDetail, index) => {
                            return (
                                <TermDetail key={index}>
                                    <h4>{termDetail.title}</h4>
                                    <p>{termDetail.body}</p>
                                </TermDetail>
                            )
                        })}
                        <Button
                            isMain={true}
                            text={'Aceptar'}
                            submit={false}
                            onClick={handleClick}
                            isLoading={termsAccepted}
                        />
                    </>
            }
        </TermsContainer>
    )
}

const TermDetail = styled.div`
  margin: 1rem 0
`

const TermsContainer = styled.div`
  width: 100%;
  height: 100%;
  max-height: 550px;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.25);
  border-radius: 25px;
  padding: 1rem 1.5rem;
  overflow-y: scroll;

  button {
    height: 40px;
  }

  p {
    font-size: clamp(0.8rem, 1.2vw, 1rem));
    text-align: justify;
  }
  
`
export default SchoolTerms