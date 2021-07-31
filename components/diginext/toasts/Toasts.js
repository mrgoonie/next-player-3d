import React, { useState, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';

export const TOAST_TYPE = {
    SUCCESS: "success",
    DANGER: "danger",
    INFO: "info",
    WARNING: "warning",
}

export const ContainerToast = forwardRef((props, ref) => {

    const autoDelete = props.autoDeleteToast || false;
    const toastDismissTime = props.toastDismissTime || 0;

    const [list, setList] = useState([]);
    const [position, setPosition] = useState('Select Position');
    let [checkValue, setCheckValue] = useState(autoDelete);
    const [autoDeleteTime, setAutoDeleteTime] = useState(false);
    const [dismissTime, setDismissTime] = useState(toastDismissTime);
    let toastProperties = null;

    const selectPosition = (e) => {
        setPosition(e.target.value);
        setList([]);
    }

    const deleteToast = (id, event) => {
        // console.log("delete", event.target.parentElement)
        const newList = list.filter((item) => id != item.id);

        if (event) {
            // console.log("hide", id)
            event.target.parentElement.classList.add("hide");
        }

        setTimeout(() => {
            setList(newList);
        }, 200);
    }

    const showToast = (type, desc = "this is a toast description") => {
        const id = Math.floor((Math.random() * 101) + 1);
        switch (type) {
            case TOAST_TYPE.SUCCESS:
                toastProperties = {
                    id,
                    title: 'Success',
                    description: desc.toString(),
                    backgroundColor: '#5cb85c',
                    icon: "../images/icons/check.svg"
                }
                break;
            case TOAST_TYPE.DANGER:
                toastProperties = {
                    id,
                    title: 'Danger',
                    description: desc.toString(),
                    backgroundColor: '#d9534f',
                    icon: "../images/icons/error.svg"
                }
                break;
            case TOAST_TYPE.INFO:
                toastProperties = {
                    id,
                    title: 'Info',
                    description: desc.toString(),
                    backgroundColor: '#5bc0de',
                    icon: "../images/icons/info.svg"
                }
                break;
            case TOAST_TYPE.WARNING:
                toastProperties = {
                    id,
                    title: 'Warning',
                    description: desc.toString(),
                    backgroundColor: '#f0ad4e',
                    icon: "../images/icons/warning.svg"
                }
                break;

            default:
                setList([]);
        }

        setList([...list, toastProperties]);
    }

    const onCheckBoxChange = () => {
        checkValue = !checkValue;
        setCheckValue(checkValue);
        setList([]);
    }

    const onInputChange = (e) => {
        const time = parseInt(e.target.value, 10);
        setDismissTime(time);
    }

    if (ref) {
        ref.current = {

            showToast: showToast,
            selectPosition: selectPosition,
            deleteToast: deleteToast,
            positions: {
                "top-right": "top-right",
                "top-left": "top-left",
                "bottom-left": "bottom-left",
                "bottom-right": "bottom-right",
            }
        }
    }



    return (
        <div className="toasts" >
            <div className="toasts-header d-none">
                <h1>React Toast Component</h1>
                <div className="toast-buttons">
                    {
                        BUTTON_PROPS.map(e =>
                            <ButtonToast
                                key={e.id}
                                className={`${position === 'Select Position' ? `${e.className} btn-disable` : `${e.className}`}`}
                                label={e.label}
                                handleClick={() => showToast(e.type)}
                            />
                        )
                    }
                </div>

                <div className="select">
                    <input
                        id="auto"
                        type="checkbox"
                        name="checkbox"
                        value={checkValue}
                        onChange={onCheckBoxChange}
                    />
                    <label htmlFor="auto">Auto Dismiss</label>
                </div>
                <div className="select">
                    <input
                        className={`${!checkValue ? 'disabled' : ''}`}
                        type="text"
                        name="checkbox"
                        placeholder="Dismiss time Ex: 3000"
                        autoComplete="false"
                        onChange={onInputChange}
                    />
                </div>
                <div className="select">
                    <select
                        name="position"
                        value={position}
                        onChange={selectPosition}
                        className="position-select"
                    >
                        <option>Select Position</option>
                        <option value="top-right">Top Right</option>
                        <option value="top-left">Top Left</option>
                        <option value="bottom-left">Bottom Left</option>
                        <option value="bottom-right">Bottom Right</option>
                    </select>
                </div>
            </div>

            <Toast
                toastList={list}
                position={position}
                autoDelete={checkValue}
                autoDeleteTime={autoDeleteTime}
                dismissTime={dismissTime}
                deleteToast={deleteToast}
            />
            <style jsx>{`
            .success {
                background-color: #5cb85c;
            }

            .danger {
                background-color: #d9534f;
            }

            .info {
                background-color: #5bc0de;
            }

            .warning {
                background-color: #f0ad4e;
            }

    `}</style>

            {props.children}

        </div>
    );
}
);

export const Toast = props => {
    const { toastList, position, autoDelete, dismissTime, deleteToast } = props;

    useEffect(() => {
        const interval = setInterval(() => {
            if (autoDelete && toastList.length) {
                deleteToast(toastList[0].id);
            }
        }, dismissTime);
        // eslint-disable-next-line
        return () => {
            clearInterval(interval);
        }

    }, [toastList, autoDelete, dismissTime]);

    return (
        <>
            <div
                className={`notification-container ${position}`}
            >
                {
                    toastList.map((toast, i) =>
                        <div
                            key={i}
                            className={`notification toast ${position} ${toast.id}`}
                            style={{ backgroundColor: toast ? toast.backgroundColor : "" }}
                        >
                            <button onClick={(event) => deleteToast(toast.id, event)}></button>
                            <div className="notification-image">
                                <img src={toast.icon} alt="" />
                            </div>
                            <div>
                                <p className="notification-title">{toast.title}</p>
                                <p className="notification-message">
                                    {toast.description}
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>
            <style jsx>{`
            .notification-container {
                font-size: 14px;
                box-sizing: border-box;
                position: fixed;
                z-index: 999999
            }

            .hide.notification.top-right,
            .hide.notification.bottom-right{
                animation: toast-out-right .7s;
            }
            .hide.notification.top-left,
            .hide.notification.bottom-left{
                animation: toast-out-left .7s;
            }
           
            .top-right {
                top: 12px;
                right: 12px;
                transition: transform .6s ease-in-out;
                animation: toast-in-right .7s;
            }

            .bottom-right {
                bottom: 12px;
                right: 12px;
                transition: transform .6s ease-in-out;
                animation: toast-in-right .7s;
            }

            .top-left {
                top: 12px;
                left: 12px;
                transition: transform .6s ease-in;
                animation: toast-in-left .7s;
            }

            .bottom-left {
                bottom: 12px;
                left: 12px;
                transition: transform .6s ease-in;
                animation: toast-in-left .7s;
            }

            .notification {
                background: #fff;
                transition: .3s ease;
                position: relative;
                pointer-events: auto;
                overflow: hidden;
                padding: 30px;
                width: 300px;
                max-height: 100px;
                border-radius: 3px 3px 3px 3px;
                box-shadow: 0 0 8px #999;
                color: #000;
                opacity: .9;
                background-position: 15px;
                background-repeat: no-repeat;
                display: flex;
                flex-direction: row;
            }

            .notification:hover {
                box-shadow: 0 0 12px #fff;
                opacity: 1;
                cursor: pointer
            }

            .notification-title {
                font-weight: 700;
                font-size: 16px;
                text-align: left;
                margin-top: 0;
                margin-bottom: 6px;
                height: 18px;
                max-width: 285px;
            }

            .notification-message {
                margin: 0;
                text-align: left;
                height: 18px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                max-width: 285px;
            }

            .notification-image {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 10px;
            }

            .notification-image img {
                max-width: 30px;
            }

            .toast {
                width: 365px;
                color: #fff;
                padding: 10px 15px;
                height: auto;
            }

            .notification-container button {
                position: absolute;
                right: 5px;
                top: 0px;
                float: right;
                font-weight: 700;
                outline: none;
                border: none;
                text-shadow: 0 1px 0 #fff;
                opacity: .8;
                line-height: 1;
                font-size: 16px;
                padding: 0;
                cursor: pointer;
                background: 0 0;
                border: 0;
                transition: .3s;
                width: 20px;
                height: 20px;
                transition: 0.5s;
                &::after, 
                &::before{
                    content:"";
                    position: absolute;
                    top:13px;
                    left:0;
                    width:15px;
                    height : 3px;
                    border-radius: 2px;
                    background-color: #fff;
                }
                &:hover::after, 
                &:hover::before{
                    background-color: red;
                }
                &::after{
                    transform: rotate(45deg);
                }
                &::before{
                    transform: rotate(-45deg);
                }     
            }
            

            @keyframes toast-in-right {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @keyframes toast-in-left {
                from {
                    transform: translateX(-100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @keyframes toast-out-right {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }

            @keyframes toast-out-left {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(-100%);
                    opacity: 0;
                }
            }
    
            `}</style>
        </>
    );
}

Toast.propTypes = {
    toastList: PropTypes.array.isRequired,
    position: PropTypes.string,
    autoDelete: PropTypes.bool,
    dismissTime: PropTypes.number
}

const BUTTON_PROPS = [
    {
        id: 1,
        type: 'success',
        className: 'success',
        label: 'Success'
    },
    {
        id: 2,
        type: 'danger',
        className: 'danger',
        label: 'Danger'
    },
    {
        id: 3,
        type: 'info',
        className: 'info',
        label: 'Info'
    },
    {
        id: 4,
        type: 'warning',
        className: 'warning',
        label: 'Warning'
    },
];

export function ButtonToast(props) {
    const { label, className, handleClick } = props;

    return (
        <>
            <button
                className={className}
                onClick={handleClick}
            >
                {label}
            </button>
        </>
    );

}

ButtonToast.propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    handleClick: PropTypes.func
}

