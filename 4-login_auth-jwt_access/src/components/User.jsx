import { useState } from "react"

const User = () => {
    const [users, setUsers] = useState()

    return (
        <article className="px-4 py-4 mx-4 shadow border rounded-4 align-self-center">
            <h1 className="h1 mb-4 mt-2 text-center">L<u>IST OF USER</u>S</h1>
        </article>
    )
}

export default User