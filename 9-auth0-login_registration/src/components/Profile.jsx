import { useAuth0 } from "@auth0/auth0-react"

const Profile = () => {
    //get user variable and isAuthenticated from useAuth0 hook
    const { user, isAuthenticated } = useAuth0()

    return (
        isAuthenticated && (
            <article>
                {user?.picture && <img src={user.picture} alt={user?.name} />}
                <h2>Name: {user?.name}</h2>
                <ul>
                    {Object.keys(user).map((objKey, i) => <li key={i}>{objKey}: {user[objKey]}</li>)}
                </ul>
            </article>
        )
    )
}

export default Profile