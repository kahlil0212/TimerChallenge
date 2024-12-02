import { useRef, useState } from "react";
import ResultModal from "./ResultModal";




export default function TimerChallenge({title, targetTime}) {

    // const [isTimeExpired, setIsTimeExpired] = useState(false);
    // const [isTimeStarted, setIsTimeStarted] = useState(false);

    const timer = useRef();
    const showDialog = useRef();

    const [timeRemaing, setTimeRemaining] = useState(targetTime * 1000);

    const timerIsActive = timeRemaing > 0 && timeRemaing < (targetTime * 1000);

    //If we do not stop the timer in time and time runs out
    if(timeRemaing <= 0 ){
        clearInterval(timer.current)
       setTimeRemaining(targetTime * 1000);
       showDialog.current.open();
    }


    function handleStart(){
        timer.current = setInterval(() => {
            //Used to display modal when challenge is lost and function as expected with built-in backdrop
            //uses function from result modal to decouple from time challenge component
            // showDialog.current.open();
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);
        }, 10);

    }

    //Manually stopping the timer
    function handleStop() {
        clearInterval(timer.current);
        showDialog.current.open();
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
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? 'Stop' :'Start'} Challenge
                    </button>
                </p>
                <p className={timerIsActive ? 'active' : undefined}>
                    {timerIsActive ? 'Time is running' : 'Time is not running'}
                </p>
            </section>
        </>
    )
}