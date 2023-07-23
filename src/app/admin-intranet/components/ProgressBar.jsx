import React from "react";
import styled from "styled-components";

export default function ProgressBar({className1, className2, className3}) {

	return (
		<NavProgress>
			<div className={className1}>
				Datos Estudiante
				<LabelWrapper>
					<ArrowCover>
						<Arrow className="arrow"></Arrow>
					</ArrowCover>
				</LabelWrapper>
			</div>
			<div className={className2}>
				Datos Apoderado
				<LabelWrapper>
					<ArrowCover>
						<Arrow className="arrow"></Arrow>
					</ArrowCover>
				</LabelWrapper>
			</div>
			<div className={className3}>Confirmación</div>
		</NavProgress>
	);
}

const NavProgress = styled.div`
	display: table;
	overflow: hidden;
	height: 50px;
  	border: 1px solid ${(props) => props.theme.textColor};
	background-color: #f7f7f700;
	border-radius: 2rem;
  	margin: 26px 0;
	width: 98%;
	
	> div {
		position: relative;
		display: table-cell;
		padding: 14px 0;
		color: ${(props) => props.theme.textColor};
		text-align: center;
		font-size: 1.125em;
		line-height: 1.250em;
      	transition: .5s background-color ease-in-out;
	  
	  	.arrow {
          	transition: .5s background-color ease-in-out;
	    }
	
		&.complete {
			background-color: #51939B;
			color: ${(props) => props.theme.textColor};;
		
			.arrow {
				background: #51939B;
			}
		}
		
		&.active {
			background-color: #51939B;
				color: ${(props) => props.theme.textColor};;
			
			.arrow {
				display: none;
			}
		}
		
		&.desactive {
		    background-color: transparent;
			
		    .arrow {
		        background: transparent;
		    }
		}
	}
`;

const LabelWrapper = styled.div`
	position: absolute;
	top: 0;
	right: 0;
`;

const ArrowCover = styled.div`
	position: absolute;
	overflow: hidden;
	width: 24px;
	height: 50px;
`;

const Arrow = styled.div`
	position: absolute;
	left: -34px;
	z-index: 2;
	width: 50px;
	height: 50px;
  	border: 1px solid ${(props) => props.theme.textColor};;
	background: transparent;
	border-radius: 6px;
	rotate: 45deg;
  	
`;
