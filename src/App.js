import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const AutoTypist = ({ phrases, typeSpeed, backspaceSpeed }) => {
    
    
    const [partial, setPartial] = useState("");
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const typing = (word) => {
            for (let i = 0; i < word.length; i++) {
                setTimeout(() => {
                    setPartial((l) => l + word[i]);
                }, i * typeSpeed);
            }
        };

        const backspace = (word) => {
            for (let i = 1; i <= word.length; i++) {
                setTimeout(() => {
                    setPartial(word.slice(0, -i));
                }, i * backspaceSpeed);
            }
        };

        if (partial === "" && !isDeleting) {
            typing(phrases[Number(loopNum) % Number(phrases.length)]);
            setIsDeleting(true);
        }

        if (partial === phrases[Number(loopNum) % Number(phrases.length)] && isDeleting) {
            setTimeout(() => {
                backspace(phrases[Number(loopNum) % Number(phrases.length)]);
            }, 1000);

            setTimeout(() => {
                setLoopNum((ln) => ln + 1);
                setIsDeleting(false);
                setPartial("");
            }, 3000);
        }
    }, [partial, isDeleting, typeSpeed, backspaceSpeed, phrases, loopNum]);

    if (phrases.length === 0) {
        return null;
    }

    return <span style={{ color: "red"}}>{partial}</span>;
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
        <h1 style={{padding: "100px"}}>
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
