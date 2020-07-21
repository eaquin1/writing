import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'


const AutoTypist = ({ phrases, typeSpeed, backspaceSpeed }) => {
  // Use `useState` to maintain the state of the current phrase
  // as well as the current partial phrase being typed
  const [phrase, setPhrase] = useState(phrases[0])
  const [letter, setLetter] = useState('')
  const typing = (word) => {
    for (let i =0; i < word.length; i++) {
     setLetter(l => l + word[i])
    }
  }

  const backspace = (word) => {
    let i = word.length - 1
    while (i >= 0 ) {
      setLetter(word.slice(0, i));
      i--
    }
  }
  useEffect(() => { 
      const intervalId = setInterval(() => {
       typing(phrase)
      }, typeSpeed)
       
    
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  if (phrases.length === 0) {
    return null
  }

  const partial = phrases[0]

  // Use `useEffect` to set and clear timeouts for typing and
  // backspacing each phrase

  return <span style={{ color: 'red' }}>{letter}</span>
}
AutoTypist.propTypes = {
  phrases: PropTypes.arrayOf(PropTypes.string).isRequired,
  typeSpeed: PropTypes.number,
  backspaceSpeed: PropTypes.number,
}
AutoTypist.defaultProps = {
  typeSpeed: 100,
  backspaceSpeed: 25,
}

const App = () => {
  return (
    <h1>
      My favorite hobbies are{' '}
      <AutoTypist
        phrases={['playing basketball', 'watching movies', 'DIY', 'napping']}
      />
    </h1>
  )
}

export default App

