import { useAppStore } from '@/store/app';
import './step.css';
import React, {useEffect, useState} from "react";

const Steps: React.FC<{ className: string }> = (props) => {
    const [currentStep, setCurrentStep] = useState(0);
    const {currentProject} = useAppStore();

    useEffect(() => {
        const progressElements = document.querySelectorAll('.progress');

        const animateProgress = () => {
            progressElements.forEach((progress) => {
                const steps = Array.from(progress.querySelectorAll('div.right > div'));
                steps.forEach((step) => {
                    step.classList.remove('current', 'prev');
                });
                steps[steps.length - 1].classList.add('done')
                steps[currentStep].classList.add('current');
                steps.slice(0, currentStep).forEach((prevStep) => {
                    prevStep.classList.add('prev');
                });

                setCurrentStep((prevStep) => (prevStep + 1) % steps.length);
            });
            
        };

        const intervalId = setInterval(animateProgress, 2000);

        return () => clearInterval(intervalId);
    }, [currentStep]);

    return (
        <div className="outer">
            <span className="Prompt__user">@{currentProject?.name}:</span><span className="Prompt__location">~</span><span
            className="Prompt__dollar">$</span>
            <div className="progress dark">
                <div className="left">
                    <div className="current">
                    </div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className="right" id={props.className}>
                    <div className="current">Begin</div>
                </div>
            </div>
        </div>
    )
}

export default Steps