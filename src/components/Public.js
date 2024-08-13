import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">BoulderBuds!</span></h1>
            </header>
            <main className="public__main">
                <p>For a friendly competition to encourage competitive spirit of climbers.</p>
                <address className="public__addr">
                    Gumby Gary<br />
                    Buttermilk Road<br />
                    Bishop, CA 93514<br />
                    {/* <a href="tel:+15555555555">(555) 555-5555</a> */}
                </address>
                <br />
                {/* <p>Owner: Dan Davidson</p> */}
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>

    )
    return content
}
export default Public