import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
    //initialize useNavigate()
    const navigate = useNavigate()
    //-1 lets user to go back to page where they came from
    const goBack = () => navigate(-1)

    return (
        <section className="px-4 py-4 shadow border rounded-4 align-self-center homie">
            <h1 className="h1 mb-4 mt-2 text-center">UNAUTHORIZED PAGE</h1> 
            <p className="lead mb-4 text-center">You do not have access to the page you requested!</p>

            <div className="d-flex">
                <button 
                    type="button"
                    className="btn btn-secondary flex-grow-1 mt-2"
                    onClick={goBack}
                >
                    Go Back
                </button>
            </div>
        </section>
    )
}

export default Unauthorized