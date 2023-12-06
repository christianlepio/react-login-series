import { useEffect, useState } from "react"
import axios from '../api/axios'

const User = () => {
    const [users, setUsers] = useState()

    useEffect(() => {
        // if page loads set isMounted to true
        let isMounted = true
        //define controller, it is used to use cancellation token
        //this will cancel the request if the component/page unmounts/done loading
        const controller = new AbortController()

        const getUsers = async () => {
            try {
                //request users list to the backend using axios
                const response = await axios.get('/users', {
                    //this will allow to cancel the request if we need to
                    signal: controller.signal
                })
                console.log('users: ', response.data)
                //if the page loads then get and set all list of users
                isMounted ? setUsers(response.data) : null

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
                    : <p className="lead mb-4 text-center">No users to display!</p>
            }
        </article>
    )
}

export default User