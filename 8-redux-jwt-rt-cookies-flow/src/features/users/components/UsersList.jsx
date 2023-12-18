//generated custom hook from extended api slice (RTK query)
import { useGetUsersQuery } from "../usersApiSlice"
import { Link } from "react-router-dom"

const UsersList = () => {
    // initialize RTK query custom hook mutation, also 
    // get isLoading, isSuccess, isError, error variable from custom RTK query hook
    // rename data variable to 'users'
    const { 
        data: users,
        isLoading, 
        isSuccess,
        isError,
        error
    } = useGetUsersQuery()

    // define content
    let content

    if (isLoading) {
        content = <h1 className="text-center h1 mb-5">Loading...</h1>
    } else if (isSuccess) {
        content = (
            <article className="px-4 py-4 mx-4 shadow border rounded-4 align-self-center">
                <h3 className="h3 mb-4 mt-2 text-center">LIST OF USERS</h3>
                {
                    users?.length 
                        ? (
                            <ul className="list-group">
                                {
                                    users.map((user, index) => <li key={index} className="list-group-item">{index+1}. {user.username}</li>)
                                }                            
                            </ul>
                        )
                        : <p className="lead mb-4 text-center me-1">No users to display!</p>
                }
                <p className="lead mb-3">Go to <Link to='/welcome'>Welcome</Link> page</p>
            </article>
        )
    } else if (isError) {
        content = <h1 className="text-center h1 mb-5">{JSON.stringify(error)}</h1>
    }

    return content
}

export default UsersList