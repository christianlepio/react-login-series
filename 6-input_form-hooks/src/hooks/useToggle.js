//get the value of persist from the local storage if there is, otherwise set the value to false
//will return true or false 
import useLocalStorage from "./useLocalStorage" //custom hook to set the value of input in localStorage

const useToggle = (key, initValue) => {
    const [value, setValue] = useLocalStorage(key, initValue)
    
    const toggle = (value) => {
        setValue(prevState => {
            return typeof value === 'boolean' ? value : !prevState
        })
    }

    //return the value variable and toggle function to be used in login component
    return [value, toggle]
}

export default useToggle