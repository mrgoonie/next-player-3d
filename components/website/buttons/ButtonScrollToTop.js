import { useEffect, useState } from "react";
import gsap from "gsap";
import ScrollToPlugin from "gsap/dist/ScrollToPlugin";

import asset from "plugins/assets/asset";
import Color from "../../../plugins/utils/Color";
import { useNextScroll } from 'plugins/next-scroll';
import { DefaultStyles } from 'components/dashkit/style/DashkitGlobalStyle';

gsap.registerPlugin(ScrollToPlugin);

/**
 * a component to scroll the page back to top ( requires gsap, diginext plugins )
 * @param {Object} props Component properties
 * @param {String} props.background  hex color of the button && variant of the box shadow
 * @param {Number} props.activePosition scrolling position to show the button
 * @param {Number} props.positionBottom bottom position of the button
 * @returns {ReactComponentElement} component
 */
function ScrollToTop({
    background = "#ffffff",
    positionBottom = 40,
    activePosition = null,
    ...rest
}) {

    const windowScroll = useNextScroll();
    const [visible, setVisible] = useState(false);

    const _variantRGB = Color.hexToRgb(background) || { r: 100, g: 100, b: 100 };
    const _stateClassName = visible ? "active" : "";

    useEffect(() => {
        if (window) {
            const _activePos = activePosition || window.innerHeight; // fallback to 100vh
            setVisible(windowScroll.y > _activePos);
        }
    }, [windowScroll.y]);

    const handleClick = e => {
        if (typeof window != "undefined") {
            gsap.to(window, { scrollTo: 0, duration: 1 });
        }
    }

    return (
        <button
            className={["btn-scroll-to-top", _stateClassName].join(" ")}
            onClick={handleClick}
            {...rest}
        >

            <span className="icon">
                <img src={asset("/favicon.ico")} alt="" />
            </span>


            <style jsx>{`
                $trans: all .2s ease-in-out;
                .btn-scroll-to-top {
                    position: fixed;
                    width: 40px;
                    height: 40px;
                    cursor: pointer;
                    background-color: ${background};
                    padding: 12px;
                    bottom: ${positionBottom - 3}px;
                    right: 40px;
                    opacity: 0;
                    pointer-events: none;
                    z-index: -1;
                    border: 0 none;
                    outline: 0 none;                    
                    transition: $trans;
                    box-shadow: 1px 1px 14px rgba(100, 100, 100, 0.2);
                    border-radius: 2px;

                    &.active {
                        z-index: 1000;
                        bottom: ${positionBottom}px;
                        opacity: 1;
                        pointer-events: all;
                    }


                    &:hover {
                        ${`box-shadow: 1px 1px 14px rgba(${_variantRGB.r}, ${_variantRGB.g}, ${_variantRGB.b}, 0.9);`}

                        .icon {
                            img {
                                transform: translateY(-2px);
                            }
                        }
                    }

                    &:active {
                        box-shadow: none;
                        transition: none;

                        .icon {
                            img {
                                transition: none;
                            }
                        }
                    }

                }

                .icon {
                    transition: $trans;
                    img {
                        transition: $trans;
                    }
                }

                @media all and (max-width: ${DefaultStyles.container.maxWidthSM}px) {
                    .btn-scroll-to-top {
                        right: 25px;
                    }
                }

            `}</style>
        </button>
    );
}


export default ScrollToTop;