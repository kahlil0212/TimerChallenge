import { useRef, useState } from "react";
import ResultModal from "./ResultModal";




export default function TimerChallenge({title, targetTime}) {

    const [isTimeExpired, setIsTimeExpired] = useState(false);
    const [isTimeStarted, setIsTimeStarted] = useState(false);

    const timer = useRef();
    const showDialog = useRef();


    function handleStart(){
        timer.current = setTimeout(() => {
            setIsTimeExpired(true);
            //Used to display modal when challenge is lost and function as expected with built-in backdrop
            showDialog.current.showModal();
        }, targetTime * 1000);

        setIsTimeStarted(true);
    }

    function handleStop() {
        clearTimeout(timer.current);
    }

    return(
        <>
            <ResultModal ref={showDialog} result="lost" targetTime={targetTime}/>
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-title">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={isTimeStarted ? handleStop : handleStart}>
                        {isTimeStarted ? 'Stop' :'Start'} Challenge
                    </button>
                </p>
                <p className={isTimeStarted ? 'active' : undefined}>
                    {isTimeStarted ? 'Time is running' : 'Time is not running'}
                </p>
            </section>
        </>
    )
}