import { useEffect, useState } from 'react'

const getLocalValue = (key, initValue) => {
    //if we're using SSR NextJS then return only the initValue params (if it's running on our server then probably we don't have a window)
    if (typeof window === 'undefined') return initValue

    //if a value is already stored in localStorage then get the value using the key and return it
    const localValue = JSON.parse(localStorage.getItem(key))
    if (localValue) return localValue

    //return the result of a function (if a result of a function stored in localStorage)
    //this is if the initValue is coming from a function then return the result of the initValue() function
    if (initValue instanceof Function) return initValue()

    //if non of the above condition satisfies
    return initValue
}

//props...
//key is for localStorage name 
//initValue is to define the value of key
const useLocalStorage = (key, initValue) => {
    //get the value from function getLocalValue that is defined above
    const [value, setValue] = useState(() => getLocalValue(key, initValue))

    useEffect(() => {
        //if key or value changes then set the localStorage key value to 'value' container
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]
}

export default useLocalStorage