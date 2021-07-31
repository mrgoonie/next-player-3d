import { useEffect, useRef, useState } from "react";
import { gsap } from 'gsap';

// import { ScrollTrigger } from 'gsap/ScrollTrigger'

// gsap.registerPlugin(ScrollTrigger);


export default function Sticky({
    children,
    height,
    classNames,
    ...rest
}) {
    const [isSticky, setSticky] = useState(false);
    const [dimension, setDimension] = useState({});
    // const [heightScroll, setHeightScroll] = useState(height);
    const stickyRef = useRef(null);

    let tl;

    useEffect(() => {
        if (typeof window !== "undefined") {
            const { ScrollTrigger } = require('gsap/ScrollTrigger');

            gsap.registerPlugin(ScrollTrigger);
        }
        return () => {

        }
    }, [])

    // useEffect(() => { 
    //     setHeightScroll(height);
    // })
    useEffect(() => {
        const stickyRect = stickyRef.current.getBoundingClientRect();
            setDimension({
                width: stickyRect.width,
                height: stickyRect.height,
                left: stickyRect.x,
            });
            console.log("test", stickyRect.height);
    }, [height]); 

    useEffect(() => {
        if (height > 0) {

            tl = gsap.timeline({
                scrollTrigger: {
                    trigger: stickyRef.current,
                    pin: true,                              // pin the trigger element while active
                    start: "center 100px",
                    end: (height - window.innerHeight + 100) + "px",
                    // end: '"100px ' + (height - window.innerHeight)+ '"',
                    // scrub: true,
                    // markers: true,
                    onUpdate: self => {
                        //console.log("test", height);
                    }
                }
            });
        }
        return () => {

        }
    }, [height]);


    return <>
        <div ref={stickyRef} className={classNames}>

            {children}

        </div>
        <style jsx>{`
        
        .sticky-wrapper {
            position: relative;
            background-color: pink;
            z-index: 100
        }
        
        
        `}</style>
    </>
}