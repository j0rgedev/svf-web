import '../../styles/globals.css'
import {useMutation, useQuery} from "react-query";
import {useSchoolTerms} from "../../../setup/api/schoolTermsAPI.js";
import {useEffect, useState} from "react";
import styled from 'styled-components'
import Skeleton from "react-loading-skeleton";
import Button from "../../../components/Button.jsx";

function SchoolTerms({termsAccepted, setHandleTermAccepted}) {

    const {isLoading, data, error} = useQuery('schoolTerms', useSchoolTerms, {
        onError: (error) => {
            console.log(error);
        },
        staleTime: 60000, // 1 minute
        cacheTime: 3600000, // 1 hour
    });

    const handleClick = () => {
        setHandleTermAccepted(true);
    }

    return (
        <Container>
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
        </Container>
    )
}

const Container = styled.div`
    height: 100%;
  width: 100%;
`

const TermDetail = styled.div`
    margin: 1rem 0
`

const TermsContainer = styled.div`
    width: 100%;
    max-height: 450px;
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    padding: 1rem 1.5rem;
    overflow-y: scroll;
  
  button{
    height: 40px;
  }
    
    p {
        font-size: 12px;
        text-align: justify;
    }
  
    @media (min-width: 768px) {
        p{
            font-size: 16px;
        }
    }
`
export default SchoolTerms