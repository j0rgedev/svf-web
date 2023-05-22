import styled from "styled-components";
import {motion} from "framer-motion";
import {useContext, useState} from "react";
import {AlertContext} from "../setup/context/AlertContext.jsx";
import {useMutation} from "react-query";
import {deleteStudent} from "../setup/api/deleteStudent.js";
import toast from "react-hot-toast";

export function DeleteAlert({title, description, data}) {

	const {setAlert} = useContext(AlertContext)
	const [isOpen, setIsOpen] = useState(true);
	const cookie = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJTVkYwMDA3IiwiaWF0IjoxNjg0NjE1Njc4LCJleHAiOjE2ODQ3MDIwNzh9.ImH5mgwsr046vYo_gx_X3akEMsI3kFu5NzJ5nVlfSjc"
	const {selectedRow} = data

	const handleClose = () => {
		setIsOpen(!isOpen);
		setAlert(null)
	}

	let toastId = null;

	const deleteStudentMutation = useMutation({
		mutationFn: deleteStudent,
		onSuccess: () => {
			toast.success('Estudiante eliminado con éxito', {id: toastId, duration: 3000});
		},
		onError: (error) => {
			toast.error('Error al eliminar estudiante', {id: toastId, duration: 3000});
		}
	})

	const handleDelete = async () => {
		toastId = toast.loading('Elimando estudiante...');
		const request = {token: cookie, selectedRow}
		await deleteStudentMutation.mutateAsync(request)
	}

	return (
		<Background>
			<Container
				initial={{opacity: 0, scale: 0.8}} // Estado inicial de la alerta (no visible)
				animate={{opacity: 1, scale: 1}} // Estado animado de la alerta (visible)
				exit={{opacity: 0, scale: 0.8}} // Estado de salida de la alerta (no visible)
				transition={{duration: 0.3}}
			>
				<MainInfo>
					<div className={'icon-wrapper'}>
						<h1 className={'icon'}>!</h1>
					</div>
					<h2>{title}</h2>
					<p>{description}</p>
				</MainInfo>
				<Buttons>
					<Button className={'secondary'} onClick={handleClose}>Cancelar</Button>
					<Button
						className={'main'}
						onClick={handleDelete}
						disabled={deleteStudentMutation.isLoading}
					>
						Eliminar
					</Button>
				</Buttons>
			</Container>
		</Background>
	)
}

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
`

const Container = styled(motion.div)`
  width: 85%;
  max-width: 650px;
  height: 44%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MainInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 75%;
  padding: 2rem 3rem;
  background-color: #2b342f;

  .icon-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 50%;
  }

  .icon-wrapper h1 {
    width: 100%;
    text-align: left;
    font-size: 6rem;
    color: #ef233c
  }

  h2, p {
    width: 100%;
    text-align: left;
    height: 25%;
  }
`

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 25%;
  padding: 1.3rem 3rem;
  background-color: #1c231f;
`

const Button = styled.button`
  width: 200px;
  height: 100%;
  color: white;
  font-size: 16px;
  font-weight: 500;
  border-radius: 10px;
  cursor: pointer;

  &.main {
    background-color: #ef233c;
    border: none;
  }

  &.secondary {
    background-color: transparent;
    border: 1px solid white;
  }
  
  &:disabled {
    cursor: not-allowed;
    background-color: #cccc !important;
    color: #666 !important;
  }
`