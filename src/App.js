import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

const AutoTypist = ({ phrases, typeSpeed, backspaceSpeed, pause }) => {
    const [states, setStates] = useState([]);
    const [partial, setPartial] = useState("");
    const [index, setIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const init = useCallback(() => {
        const wordsAndDelayArr = [];

        //iterate over all the phrases
        phrases.forEach((phrase) => {
            // push "h", "he", "hel", etc
            for (let i = 1; i <= phrase.length; i++) {
                wordsAndDelayArr.push({
                    text: phrase.substr(0, i),
                    delay: typeSpeed,
                });
            }
            //now backspace the word: "hello", "hell", "hel", etc
            for (let i = phrase.length - 1; i >= 0; i--) {
                wordsAndDelayArr.push({
                    text: phrase.substr(0, i),
                    delay: i === phrase.length - 1 ? pause : backspaceSpeed,
                });
            }
            //push blank text
            wordsAndDelayArr.push({ text: "", delay: typeSpeed });
        });
        setStates(wordsAndDelayArr);
        console.log(wordsAndDelayArr);
    }, [phrases, typeSpeed, backspaceSpeed, pause]);

    //call init;
    useEffect(() => {
        init();
    }, [init]);

    // in the beginning, and if loopNum changes, set timeout to schedule the next text change
    useEffect(() => {
        if (states.length === 0) {
            return;
        }
        const delay = states[index].delay;

        //calculate the next states index
        const nextIndex = (index + 1) % states.length;

        //schedule next state
        const timeout = setTimeout(() => {
            const nextDelay = states[nextIndex].delay;
            setIsDeleting(
                nextDelay === typeSpeed || nextDelay === backspaceSpeed
            );
            //update displayed text
            setPartial(states[index].text);
            //advance to the next text state
            setIndex(nextIndex);
        }, delay);

        //cleanup
        return () => clearTimeout(timeout);
    }, [states, index, typeSpeed, backspaceSpeed, pause, phrases]);

    return <span style={{ color: "red" }}>{partial}</span>;
};
AutoTypist.propTypes = {
    phrases: PropTypes.arrayOf(PropTypes.string).isRequired,
    typeSpeed: PropTypes.number,
    backspaceSpeed: PropTypes.number,
};
AutoTypist.defaultProps = {
    typeSpeed: 150,
    backspaceSpeed: 50,
    pause: 2000,
};

const App = () => {
    return (
        <h1 style={{ padding: "100px" }}>
            My favorite hobbies are{" "}
            <AutoTypist
                phrases={["running", "playing violin", "coding", "nom nom nom"]}
            />
        </h1>
    );
};

export default App;
