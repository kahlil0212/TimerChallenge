import { useState, useRef } from "react";


export default function Player() {

  const [enteredplayerName, setPlayerName] = useState(null);
 

  //allows you to map to an element using ref property. Input below
  const playerName = useRef();

  

  function handleSubmit(){
   setPlayerName(playerName.current.value)
   //to clear input. Not advisable but works in use case. Avoid manually manipulating the DOM
   playerName.current.value = '';
  }

  return (
    <section id="player">
      {
        //If the value being checked is the same as will be displayed. If varaible is true use it otherwise use false value
      }
      <h2>Welcome {enteredplayerName ?? "unknown entity"}</h2>
      <p>
        <input ref={playerName} type="text"/>
        <button onClick={handleSubmit}>Set Name</button>
      </p>
    </section>
  );
}
