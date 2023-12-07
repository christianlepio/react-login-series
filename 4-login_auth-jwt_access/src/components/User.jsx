import { useEffect, useState } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
//this is to get new accessToken value
// import useRefreshToken from "../hooks/useRefreshToken"

const User = () => {
    const [users, setUsers] = useState()
    //define axiosPrivate that has interceptors that will handle JWT tokens that we need and retry get new accessToken if it expires
    const axiosPrivate = useAxiosPrivate()

    //define refresh funciton that will give new value for acessToken
    // const refresh = useRefreshToken()

    useEffect(() => {
        // if page loads set isMounted to true
        let isMounted = true
        //define controller, it is used to use cancellation token
        //this will cancel the request if the component/page unmounts/done loading
        const controller = new AbortController()

        const getUsers = async () => {
            try {
                //request users list to the backend using axiosPrivate with interceptors for JWT tokens
                const response = await axiosPrivate.get('/users', {
                    //this will allow to cancel the request if we need to
                    signal: controller.signal
                })
                console.log('users: ', response.data)
                //if the page loads then get and set all list of users
                isMounted && setUsers(response.data)

            } catch (err) {
                console.error('users error: ', err)
            }
        }

        getUsers()

        // cleanup function of useEffect
        return () => {
            //after page loads, set isMounted to false
            isMounted = false
            //abort or cancel any request if the page successfully loads
            controller.abort()
        }

    }, [])

    return (
        <article className="px-4 py-4 mx-4 shadow border rounded-4 align-self-center">
            <h2 className="h2 mb-4 mt-2 text-center">L<u>IST OF USER</u>S</h2>
            {
                users?.length 
                    ? (
                        <ul class="list-group">
                            {
                                users.map((user, index) => <li key={index} className="list-group-item">{user?.username}</li>)
                            }                            
                        </ul>
                    )
                    : <p className="lead mb-4 text-center me-1">No users to display!</p>
            }

            {/* this button will get new accessToken by calling refresh function */}
            {/* <div className="d-flex justify-content-center">
                <button 
                    type="button" 
                    className="btn btn-light mt-3 flex-grow-1"
                    onClick={refresh}
                >
                    Get new Access Token
                </button>
            </div> */}
        </article>
    )
}

export default User