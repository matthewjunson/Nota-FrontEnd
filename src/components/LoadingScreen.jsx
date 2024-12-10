// Whenever the Render site is closed or not active for a certain amount of time, the backend goes to sleep,
// effectively closing connections to the MongoDB server.
// Because of this the NOTAs don't load as fast as the rest of the web UI on first launch.
// To not leave the user waiting clueless looking at a blank background, this loading screen is will be displayed
// with the approximate time until a connection to the DB has been properly established.

import {useEffect, useState} from "react";

function LoadingScreen() {
    const [timer, setTimer] = useState(22); // value in seconds

    // this is a countdown timer
    useEffect(() => {
        if (timer > 0) {
            const countdown = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
            return () => clearInterval(countdown);
        }
    }, [timer]);

    return (
        <>
            <div className={'loading-screen'}
                 style={{
                     fontFamily: "Pangolin",
                     fontSize: '3em',
                     textAlign: 'center',
                     color: 'white',
                     position: 'fixed',
                     top: '60px',
                     left: '100px',
                     right: '0',
                     bottom: '0',
                     display: 'flex',
                     flexDirection: 'column',
                     justifyContent: 'center',
                     alignItems: 'center',
                     border: 'none',
                 }}>
                {timer > 0
                    ? <>
                        <div>{"Loading..."}</div>
                        <div>{`(~${timer}s)`}</div>
                    </>
                    : <div>{"this is taking longer than usual :("}</div>
                }
            </div>
        </>
    )
}

export default LoadingScreen