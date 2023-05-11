import React from 'react'
import './stepProgressStyles.css'

export default function StepProgress({ number, onStepClick, termsAccepted }) {
    const handleStepClick = (step) => {
        termsAccepted ? onStepClick(step) : onStepClick(2);
    };

    return (
        <div className="step-content">
            <div id="stepProgressBar">
                <div className="step">
                    <div
                        className={number === 1 ? 'bullet completed' : 'bullet'}
                        onClick={() => handleStepClick(1)}
                    >
                        1
                    </div>
                    <p className={number === 1 ? 'step-text completed' : 'step-text'}>Datos</p>
                </div>
                <div className="step">
                    <div
                        className={number === 2 ? 'bullet completed' : 'bullet'}
                        onClick={() => handleStepClick(2)}
                    >
                        2
                    </div>
                    <p className={number === 2 ? 'step-text completed' : 'step-text'}>Detalles</p>
                </div>
                <div className="step">
                    <div
                        className={number === 3 ? 'last-bullet completed' : 'last-bullet'}
                        onClick={() => handleStepClick(3)}
                    >
                        3
                    </div>
                    <p className={number === 3 ? 'step-text completed' : 'step-text'}>Pagos</p>
                </div>
            </div>
        </div>
    );
}