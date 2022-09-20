import React, {useState, useEffect} from "react";
import Die from "./Die"
import {nanoid} from "nanoid";
import Confetti from "react-confetti";
import { useLayoutEffect } from "react";

function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    console.log("ran")
    return size;
}

export default function Main() {

    const getRandomNum = () => Math.ceil(Math.random() * 6)

    const [tenzies, setTenzies] = useState(false)
    const [dieNumbers, setDieNumbers] = useState(allNewDies())
    const [width, height] = useWindowSize()

    useEffect(() => {
        if(dieNumbers.every(die => die.value === dieNumbers[0].value && die.isHeld)) {
            setTenzies(true)
        }
    }, [dieNumbers])

    function allNewDies() {
        let dieNumbers = []
        for(let i = 0; i < 10; i++) {
            dieNumbers.push({
                id: nanoid(),
                value: getRandomNum(), 
                isHeld: false
            })
        }
        return dieNumbers
    }

    function holdDice(id) {
        setDieNumbers(prevDieNumbers => {
            const newDieNumbers = prevDieNumbers.map(item => {
                return item.id === id ? 
                    {...item, isHeld : !item.isHeld} : 
                    item
            })
            return newDieNumbers
        })
    }

    function rollDice() {
        if(!tenzies) {
            setDieNumbers(prevDieNumbers => {
                const newDieNumbers = prevDieNumbers.map(item => {
                    return item.isHeld ? 
                        item : 
                        {...item, value: getRandomNum()}
                })
                return newDieNumbers
            })
        }
        else {
            setDieNumbers(allNewDies)
            setTenzies(false)
        }
    }

    const dieElement = dieNumbers.map(item => <Die value={item.value} id = {item.id} key ={item.id} isHeld={item.isHeld} handleClick={() => holdDice(item.id)}/>)

    return (
        <main className="main-section">
            {tenzies && <Confetti
                width={width}
                height={height}
            />}
            <div className="die-container">{dieElement}</div>
            <button onClick = {rollDice}>{tenzies ? "New Game" : "Roll"}</button>
        </main>
    )
}