import React, {useState, useEffect, useRef, Fragment} from 'react';
//styles
import '../../styles.scss';

const useOutsideClick = (ref, callback) => {
    const handleClick = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback();
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    });
};

const useTouchScreenDetect = () => {
    const isSSR = typeof window === 'undefined',
        [isTouchScreen, setIsTouchScreen] = useState(false);

    useEffect(() => {
        if (!isSSR) {
            setIsTouchScreen(
                'ontouchstart' in document.documentElement ||
                navigator.maxTouchPoints > 0 ||
                navigator.msMaxTouchPoints > 0
            );
        }
    }, [isTouchScreen, isSSR]);

    return isTouchScreen;
};

export const FloatingButton = ({ location, buttons, mainButtonIcon }) => {
    const [isHover, setIsHover] = useState(false),
        isHasTouch = useTouchScreenDetect(),
        ref = useRef(),
        radius = 25,
        buttonsLength = buttons.length,
        navigatorDimensions = radius * buttonsLength * 1.6,
        circleRadius = radius * buttonsLength;

    useOutsideClick(ref, () => {
        if (isHasTouch) {
            setIsHover(false);
        }
    });

    const setNavigatorLocation = () => {
        switch (location) {
            case 'top-left':
                return {
                    container: {
                        top: 10,
                        right: 'auto',
                        bottom: 'auto',
                        left: 10,
                    },
                    mainButton: {
                        top: 0,
                        right: 'auto',
                        bottom: 'auto',
                        left: 0,
                    },
                };
            case 'top-right':
                return {
                    container: {
                        top: 10,
                        right: 10,
                        bottom: 'auto',
                        left: 'auto',
                    },
                    mainButton: {
                        top: 0,
                        right: 0,
                        bottom: 'auto',
                        left: 'auto',
                    },
                };
            case 'bottom-left':
                return {
                    container: {
                        top: 'auto',
                        right: 'auto',
                        bottom: 10,
                        left: 10,
                    },
                    mainButton: {
                        top: 'auto',
                        right: 'auto',
                        bottom: 0,
                        left: 0,
                    },
                };
            default:
                return {
                    container: {
                        top: 'auto',
                        right: 10,
                        bottom: 10,
                        left: 'auto',
                    },
                    mainButton: {
                        top: 'auto',
                        right: 0,
                        bottom: 0,
                        left: 'auto',
                    },
                };
        }
    };

    // (x, y) = (r * cos(θ), r * sin(θ))
    const setButtonPosition = (index) => {
        switch (location) {
            case 'top-left':
                return {
                    top: Math.round(circleRadius * Math.sin((Math.PI / 2 / (buttonsLength - 1)) * index)),
                    right: 'auto',
                    bottom: 'auto',
                    left: Math.round(circleRadius * Math.cos((Math.PI / 2 / (buttonsLength - 1)) * index)),
                };
            case 'top-right':
                return {
                    top: Math.round(circleRadius * Math.sin((Math.PI / 2 / (buttonsLength - 1)) * index)),
                    right: Math.round(circleRadius * Math.cos((Math.PI / 2 / (buttonsLength - 1)) * index)),
                    bottom: 'auto',
                    left: 'auto',
                };
            case 'bottom-left':
                return {
                    top: 'auto',
                    right: 'auto',
                    bottom: Math.round(circleRadius * Math.sin((Math.PI / 2 / (buttonsLength - 1)) * index)),
                    left: Math.round(circleRadius * Math.cos((Math.PI / 2 / (buttonsLength - 1)) * index)),
                };
            default:
                return {
                    top: 'auto',
                    right: Math.round(circleRadius * Math.cos((Math.PI / 2 / (buttonsLength - 1)) * index)),
                    bottom: Math.round(circleRadius * Math.sin((Math.PI / 2 / (buttonsLength - 1)) * index)),
                    left: 'auto',
                };
        }
    };

    const mouseEnterHandler = () => {
        setIsHover(true);
    };

    const mouseLeaveHandler = () => {
        setIsHover(false);
    };

    const clickHandler = (handler) => {
        mouseLeaveHandler();
        handler();
    };

    const { container, mainButton } = setNavigatorLocation();
    return (
        <Fragment>
            {buttonsLength > 1 ? (
                <div
                    ref={ref}
                    onMouseEnter={!isHasTouch ? mouseEnterHandler : () => {}}
                    onMouseLeave={!isHasTouch ? mouseLeaveHandler : () => {}}
                    className="toggle-nav"
                    style={{
                        top: container.top,
                        right: container.right,
                        bottom: container.bottom,
                        left: container.left,
                        width: isHover ? navigatorDimensions : 40,
                        height: isHover ? navigatorDimensions : 40,
                    }}
                >
                    <button
                        className="main-button"
                        style={{
                            top: mainButton.top,
                            right: mainButton.right,
                            bottom: mainButton.bottom,
                            left: mainButton.left,
                        }}
                        onClick={isHasTouch ? mouseEnterHandler : () => {}}
                    >
                        {mainButtonIcon}
                    </button>
                    {buttons.map((el, i) => (
                        <Fragment key={i}>
                            <button
                                className="sub-button"
                                style={{
                                    opacity: isHover ? 0.9 : 0,
                                    top: isHover
                                        ? setButtonPosition(i).top
                                        : setButtonPosition(i).top === 'auto'
                                            ? 'auto'
                                            : 0,
                                    right: isHover
                                        ? setButtonPosition(i).right
                                        : setButtonPosition(i).right === 'auto'
                                            ? 'auto'
                                            : 0,
                                    bottom: isHover
                                        ? setButtonPosition(i).bottom
                                        : setButtonPosition(i).bottom === 'auto'
                                            ? 'auto'
                                            : 0,
                                    left: isHover
                                        ? setButtonPosition(i).left
                                        : setButtonPosition(i).left === 'auto'
                                            ? 'auto'
                                            : 0,
                                    transition: `all 0.2s 0.${i + 1}s ease`,
                                }}
                                onClick={() => clickHandler(el.click)}
                            >
                                {el.icon}
                            </button>
                        </Fragment>
                    ))}
                </div>
            ) : (
                <div
                    className="toggle-nav"
                    style={{
                        top: container.top,
                        right: container.right,
                        bottom: container.bottom,
                        left: container.left,
                        width: 150,
                    }}
                >
                    Must be more than one button
                </div>
            )}
        </Fragment>
    );
};
