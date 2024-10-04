import React, { useState, useEffect } from 'react'

const Calculator = () => {
    // State to hold the current input value and calculation history
    const [inputValue, setInputValue] = useState('')
    const [history, setHistory] = useState([])
    const [memory, setMemory] = useState(0)

    // Function to clear the input
    const clear = () => setInputValue('')

    // Function to handle number and operator inputs
    const handleInput = (value) => {
        setInputValue(prevInput => prevInput + value)
    }

    // Function to calculate the result
    const calculateResult = () => {
        try {
            // Using Function constructor instead of eval for better security
            const result = new Function('return ' + inputValue)()
            setInputValue(result.toString())
            setHistory(prevHistory => [...prevHistory, `${inputValue} = ${result}`])
        } catch (error) {
            setInputValue('Error')
        }
    }

    // Function to handle backspace
    const handleBackspace = () => {
        setInputValue(prevInput => prevInput.slice(0, -1))
    }

    // Function to handle memory operations
    const handleMemory = (operation) => {
        switch(operation) {
            case 'M+':
                setMemory(prevMemory => prevMemory + parseFloat(inputValue || '0'))
                break
            case 'M-':
                setMemory(prevMemory => prevMemory - parseFloat(inputValue || '0'))
                break
            case 'MR':
                setInputValue(memory.toString())
                break
            case 'MC':
                setMemory(0)
                break
        }
    }

    // Function to handle percentage
    const handlePercentage = () => {
        setInputValue(prevInput => (parseFloat(prevInput) / 100).toString())
    }

    // Function to handle square root
    const handleSquareRoot = () => {
        setInputValue(prevInput => Math.sqrt(parseFloat(prevInput)).toString())
    }

    // Use effect to save history to local storage
    useEffect(() => {
        localStorage.setItem('calculatorHistory', JSON.stringify(history))
    }, [history])

    return (
        <div>
          <h2 style={{textAlign: 'center'}}>My Calculator</h2>
            <form className='calculator' name='cal'>
                {/* Display for input and result */}
                <input type="text" className='calculator__display' value={inputValue} readOnly />
                
                {/* Clear and backspace buttons */}
                <span className="calculator__button calculator__button--clear" onClick={clear}>C</span>
                <span className="calculator__button calculator__button--backspace" onClick={handleBackspace}>⌫</span>
                
                {/* Memory buttons */}
                <span className="calculator__button calculator__button--memory" onClick={() => handleMemory('M+')}>M+</span>
                <span className="calculator__button calculator__button--memory" onClick={() => handleMemory('M-')}>M-</span>
                
                {/* Number buttons */}
                <span className="calculator__button calculator__button--number" onClick={() => handleInput('7')}>7</span>
                <span className="calculator__button calculator__button--number" onClick={() => handleInput('8')}>8</span>
                <span className="calculator__button calculator__button--number" onClick={() => handleInput('9')}>9</span>
                <span className="calculator__button calculator__button--operator" onClick={() => handleInput('/')}>/</span>
                
                <span className="calculator__button calculator__button--number" onClick={() => handleInput('4')}>4</span>
                <span className="calculator__button calculator__button--number" onClick={() => handleInput('5')}>5</span>
                <span className="calculator__button calculator__button--number" onClick={() => handleInput('6')}>6</span>
                <span className="calculator__button calculator__button--operator" onClick={() => handleInput('*')}>*</span>
                
                <span className="calculator__button calculator__button--number" onClick={() => handleInput('1')}>1</span>
                <span className="calculator__button calculator__button--number" onClick={() => handleInput('2')}>2</span>
                <span className="calculator__button calculator__button--number" onClick={() => handleInput('3')}>3</span>
                <span className="calculator__button calculator__button--operator" onClick={() => handleInput('-')}>-</span>
                
                <span className="calculator__button calculator__button--number calculator__button--zero" onClick={() => handleInput('0')}>0</span>
                <span className="calculator__button calculator__button--decimal" onClick={() => handleInput('.')}>.</span>
                <span className="calculator__button calculator__button--operator" onClick={() => handleInput('+')}>+</span>
                
                {/* Equal button to calculate result */}
                <span className="calculator__button calculator__button--equal" onClick={calculateResult}>=</span>
                
                {/* Additional operation buttons */}
                <span className="calculator__button calculator__button--operator" onClick={handlePercentage}>%</span>
                <span className="calculator__button calculator__button--operator" onClick={handleSquareRoot}>√</span>
                <span className="calculator__button calculator__button--memory" onClick={() => handleMemory('MR')}>MR</span>
                <span className="calculator__button calculator__button--memory" onClick={() => handleMemory('MC')}>MC</span>
            </form>
            
            {/* Display calculation history */}
            <div className="calculator__history">
                <h3>History</h3>
                <ul>
                    {history.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Calculator