import React from "react";
import styled from "styled-components";

const NavProgress = styled.div`
  display: table;
  overflow: hidden;
  height: 50px;
  border: 2px solid #fff;
  background-color: #f7f7f700;
  border-radius: 2rem;
  width: 76%;
  margin-top: 5rem;
  margin-left: 18rem;

  > div {
    position: relative;
    display: table-cell;
    padding: 14px 0;
    color: #f7f7f7;
    text-align: center;
    font-size: 1.125em;
    line-height: 1.250em;

    &.complete {
      background-color: #51939B;
      color: #FFF;

      .arrow {
        border: 2px solid #fff;
        background: #51939B;
      }
    }

    &.active {
      background-color: #51939B;
      color: #FFF;

      .arrow {
        display: none;
      }
    }

    &.desactive {
      background-color: transparent;

      .arrow {
        background: transparent;
        border: 2px solid #fff;
      }
    }
  }
`;

const LabelWrapper = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
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
  border: 2px solid #fff;
  background: transparent;
  border-radius: 6px;
  rotate: 45deg;
`;

export default function ProgressBar({ className1, className2, className3 }) {
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
