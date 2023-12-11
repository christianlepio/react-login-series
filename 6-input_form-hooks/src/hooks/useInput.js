//using custom hook to one another
import useLocalStorage from "../hooks/useLocalStorage" //custom hook to set the value of input in localStorage

const useInput = (key, initValue) => {
    const [value, setValue] = useLocalStorage(key, initValue)

    const reset = () => setValue(initValue)

    const attributeObj = {
        value,
        onChange: (e) => setValue(e.target.value)
    }

    //return variable/obj attributeObj and value also reset function to be used in login component
    return [value, reset, attributeObj]
}

export default useInput