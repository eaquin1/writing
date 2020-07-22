import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const AutoTypist = ({ phrases, typeSpeed, backspaceSpeed }) => {
    
    const [phrase, setPhrase] = useState(phrases[0]);
    const [letter, setLetter] = useState("");
    const [loopNum, setLoopNum] = useState(1);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const typing = (word) => {
            for (let i = 0; i < word.length; i++) {
                setTimeout(() => {
                    setLetter((l) => l + word[i]);
                }, i * typeSpeed);
            }
        };

        const backspace = (word) => {
            for (let i = 1; i <= word.length; i++) {
                setTimeout(() => {
                    setLetter(word.slice(0, -i));
                }, i * backspaceSpeed);
            }
        };

        if (letter === "" && !isDeleting) {
            typing(phrase);
            setIsDeleting(true);
        }

        if (letter === phrase && isDeleting) {
            setTimeout(() => {
                backspace(phrase);
            }, 1000);
            
            setTimeout(() => {
                setLoopNum((ln) => ln + 1);
                setPhrase(phrases[Number(loopNum) % Number(phrases.length)]);
                setIsDeleting(false);
                setLetter("");
            }, 3000);
        }
    }, [phrase, letter, isDeleting, typeSpeed, backspaceSpeed, phrases, loopNum]);

    if (phrases.length === 0) {
        return null;
    }

    return <span style={{ color: "red" }}>{letter}</span>;
};
AutoTypist.propTypes = {
    phrases: PropTypes.arrayOf(PropTypes.string).isRequired,
    typeSpeed: PropTypes.number,
    backspaceSpeed: PropTypes.number,
};
AutoTypist.defaultProps = {
    typeSpeed: 100,
    backspaceSpeed: 80,
};

const App = () => {
    return (
        <h1>
            My favorite hobbies are{" "}
            <AutoTypist
                phrases={[
                    "running",
                    "playing violin",
                    "coding",
                    "nom nom nom"
                ]}
            />
        </h1>
    );
};

export default App;
