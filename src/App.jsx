import React from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'
export default function App() {
    
    const [dice, setDice] = React.useState(getNewDiceArray())
    const [win, setWin] = React.useState(false)
    const [gameBreak, setGameBreak] = React.useState(false)
    const [currentScore, setCurrentScore] = React.useState(1)
    const [localScore, setLocalScore] = 
    React.useState(()=>localStorage.getItem("result") || undefined)

    React.useEffect(()=>{
        win ? setGameBreak(true) : setGameBreak(false)
    },[win])

    React.useEffect(()=>{
        if (win) {
            localStorage.setItem("result",currentScore)
        }
    },[win])


    function getDice() {
        return {
            value: Math.floor(Math.random()*6)+1,
            id: nanoid(),
            isClicked: false
        }
    }

    React.useEffect(()=>{
    },[gameBreak])

    React.useEffect(()=>{
        const tenzieWin = dice.every((die)=>{
            return die.isClicked && die.value === dice[0].value
        })
        tenzieWin ? setWin(true) : ""

    },[dice])

    function getNewDiceArray() {
        const newArray = new Array(10).fill("").map(()=> {
           return getDice()
        })
        return newArray

    }
    function rollDice() {
        
        if (win) {
            setDice(getNewDiceArray())
            
            !localScore ? setLocalScore(currentScore) 
            : currentScore < localScore 
            ? setLocalScore(currentScore) : ""
            // setLocalScore(currentScore)
            setCurrentScore(0)
            setWin(false)
            
        }
        setCurrentScore(prevScore=>prevScore +1)
        setDice(prevDice=>{
            return prevDice.map(die=>{
                return die.isClicked? die : getDice()
                    })
                }
            )
    }

    function switchDice(id) {
        if (!gameBreak) {
            setDice(prevDice=>{
                return prevDice.map(die=>{
                    return die.id===id ? {...die, isClicked: !die.isClicked} : die
                })
            })

        }
        
    }

    const diceElements = dice.map(die=><Die 
            key={die.id} 
            value={die.value} 
            switchDice={()=>switchDice(die.id)}
            isClicked={die.isClicked}
        />)
    return (
        <div className="main--container">
            {win && <Confetti />}
            <h2 className="main--title">Tenzies</h2>
            <h3 className="main--body">Roll until all dice are the same. 
                Click each die to freeze it at its current value between rolls.</h3>
            <div className="dice--container">
                {diceElements}
            </div>
            <div className="timer--div">
            <button className="roll--btn" onClick={rollDice}>{win ? "New Game" : "Roll"}</button>
                <h3 className="timer--div--rolls">Current Roll count: {currentScore}</h3>
            {localScore &&
                <h3 className="timer--div--rolls">Best Roll count: {localScore}</h3>
            }
            </div>
        </div>
    )
}