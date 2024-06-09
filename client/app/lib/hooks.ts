/*
Reference link: https://www.youtube.com/watch?v=Aq8PnD-gn1g
Name of video: Learn how to call a function when pressing a specific key | Custom React Hook | useOnKeyPress
*/
import React, { useEffect } from "react";

/**
 * Does not work
 * @param callback 
 * @param targetKey 
 */
// export const useKeyDown = (callback: Function, targetKey: string) => {
//     useEffect(() => {
//         const keyPressHandler = (event: KeyboardEvent) => {
//             if(event.key === targetKey) {
//                 callback();
//             }
//         };
//         window.addEventListener("keydown", keyPressHandler);
//         return () => {
//             window.removeEventListener("keydown", keyPressHandler);
//         };
//     }, [callback, targetKey]);
// };

/**
 * A hook for pressing a key
 * @param handler Should be EventListenerOrEventListenerObject
 * @param dependencies 
 */
export const useKeyPress = (handler: any, dependencies = []) => {
    useEffect(() => {
        document.addEventListener("keydown", handler);
        // clean up
        return () => {
            document.removeEventListener("keydown", handler);
        };
    }, dependencies);
};