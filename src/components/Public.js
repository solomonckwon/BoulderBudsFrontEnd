import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <>
            
            <section className="public">
                <header className='public-header'>
                    <h1>Welcome to <span className="nowrap">BoulderBuds!</span></h1>
                </header>
                <main className="public__main">
                    <p>For friendly competition to encourage competitive spirit of climbers.</p>
                    <br />
                </main>
                <footer>
                <div className='public-footer'>
                    <Link to="/login">User Login</Link>
                </div>
                </footer>
            </section>
        </>

    )
    return content
}
export default Public