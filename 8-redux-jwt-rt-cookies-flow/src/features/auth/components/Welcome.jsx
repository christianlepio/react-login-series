//useSelector here is to get global state variable from store
import { useSelector } from 'react-redux'
import { selectCurrentUser, selectCurrentToken } from '../authSlice'
import { Link } from 'react-router-dom'

const Welcome = () => {
    const user = useSelector(selectCurrentUser)
    const token = useSelector(selectCurrentToken)

    const welcome = user ? `Welcome ${user}` : 'Welcome'
    const tokenAbbr = `${token.slice(0, 9)}...`

    const content = (
        <section className="px-4 py-4 mx-4 shadow border rounded-4 align-self-center">
            <h1 className="h1 mb-4 mt-2 text-center">{welcome}</h1>
            <p className="lead mb-4 text-center">{tokenAbbr}</p>
            <p className="lead mb-3">Go to <Link to='/userslist'>User's</Link> list</p>
        </section>
    )

    return content
}

export default Welcome