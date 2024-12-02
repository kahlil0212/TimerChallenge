import { forwardRef, useImperativeHandle, useRef } from "react"
import { createPortal } from "react-dom";

/**
 * In order to show dialog and function properly needs to be called programatically. The React function forwardRef allows for the ref from one Modal/component to be sent to another
 * component. In this case timerchallenge -> resultmodal
 */

const ResultModal = forwardRef(function ResultModal({ targetTime, remainingTime, onReset}, ref){

    const showDialog = useRef();

    const userLost = remainingTime <= 0;
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);

    const playerScore = Math.round((1 -  (remainingTime / (targetTime * 1000))) * 100);

    /**
     * Allows to use callable functions outside of component when using refs
     */
    useImperativeHandle(ref, () => {
        return {
            open () {
                showDialog.current.showModal();
            }
        };
    });

    return(
        createPortal(
        <dialog ref={showDialog} className="result-modal" onClose={onReset}>
            {userLost && <h2>You lost</h2>}
            {!userLost && <h2>Your score: {playerScore}</h2>}
            <p>The target time was <strong>{targetTime}</strong> seconds. </p>
            <p> You stopped the timer with <strong>{formattedRemainingTime} seconds left</strong></p>

            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>, document.getElementById('modal')
    )
)
});

export default ResultModal;