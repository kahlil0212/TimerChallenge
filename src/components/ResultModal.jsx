import { forwardRef, useImperativeHandle, useRef } from "react"

/**
 * In order to show dialog and function properly needs to be called programatically. The React function forwardRef allows for the ref from one Modal/component to be sent to another
 * component. In this case timerchallenge -> resultmodal
 */

const ResultModal = forwardRef(function ResultModal({result, targetTime}, ref){

    const showDialog = useRef();

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

        <dialog ref={showDialog} className="result-modal">
            <h2>You {result}</h2>
            <p>The target time was <strong>{targetTime}</strong> seconds. </p>
            <p> You stopped the timer with <strong>X seconds left</strong></p>

            <form method="dialog">
                <button>Close</button>
            </form>
        </dialog>
    )
});

export default ResultModal;