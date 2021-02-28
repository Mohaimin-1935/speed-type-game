import React, { useEffect, useRef, useState } from 'react'
import randomWords from 'random-words'


function App() {

    const STARTING_TIME = 30

    const [text, setText] = useState('')
    const [wordCount, setWordCount] = useState(0)
    const [toType, setToType] = useState('...')
    const [correct, setCorrect] = useState(false)
    const [time, setTime] = useState(STARTING_TIME)
    const [onGame, setOnGame] = useState(false)
    const [score, setScore] = useState(0)

    const inputRef = useRef(null)

    function handleChange(e) {
        setText(e.target.value)
    }

    function handleStartGame() {
        setOnGame(true)

        setText('')
        setWordCount(0)
        setToType(randomWords(1)[0])
        setCorrect(false)
        setTime(STARTING_TIME)
        setScore(0)

        inputRef.current.disabled = false
        inputRef.current.focus()
    }

    function handleEndGame() {
        setOnGame(false)

        setText('')
        setToType(`Score: ${score}`)
        setCorrect(false)
    }

    function increaseScore() {
        setWordCount(wordCount + 1)
        setScore(score + toType.length)
        setToType(randomWords(1)[0])
        setText('')
        setCorrect(true)
        setTimeout(() => {
            setCorrect(false)
        }, 1000)
    }

    useEffect(() => {
        if (text.toLowerCase().trim() === toType.toLowerCase() && onGame) {
            increaseScore()
        } 

    }, [text])

    useEffect(() => {
        if (time > 0 && onGame) {
            setTimeout(() => setTime(time-1), 1000)
        } else if (time === 0) {
            handleEndGame()
        }
    }, [time, onGame])


    return (
        <div className='container'>
            <h2 className='title'>How <span className="highlight">fast</span> do you <span className="highlight">type</span>?</h2>

            <p className="instruction">Type the word below:</p>
            <p className="to-type">{toType}</p>
            <input
                ref={inputRef}
                style={{backgroundColor: (correct) && '#66BF39'}}
                type='text'
                placeholder={onGame ? 'Type here...' : 'Click "Start" to play.'}
                onChange={handleChange}
                value={text}
                disabled={!onGame}
            />
            <h3 className='time'>Time Remaining: <span className={onGame ? 'animation number-highlight' : 'number-highlight'}>{time}</span></h3>
            <h3 className='word-count'>Word Count: <span className='number-highlight'>{wordCount}</span></h3>
            <button 
                onClick={handleStartGame}
                disabled={onGame}
            >Start</button>

            <p className="foot">Made with 💚 <a href='https://www.linkedin.com/in/mohaiminul-islam-682a0a19b/'>Mohaiminul Islam</a></p>
        </div>
    )
}

export default App