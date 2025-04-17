import { Link, useNavigate } from "react-router-dom"


const Navigation = () => {
    const navigate = useNavigate();

    return (
        <nav className="flex items-center justify-between p-7">
            <Link
                to="/"
                className="font-bold text-xl"
            >
                Sharepond
            </Link>
            <button 
                className="btn"
                onClick={() => navigate("/upload")}
            >
                Upload File
            </button>
        </nav>
    )
}

export default Navigation