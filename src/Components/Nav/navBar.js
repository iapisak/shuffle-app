export default function NavBar ({ searchKey, setSearchKey, recentlyPlayed, toggle, setToggle }) {                                                                                        

    const logOut = () => {
        const url = 'https://www.spotify.com/logout/'                                                                                                                                                                                                                                                                               
        window.open(url, 'Spotify Logout', 'width=400,height=500,top=40,left=40')
    }

    return  <nav className="container navbar navbar-expand-md navbar-dark px-0 px-3"
                 style={{ backgroundColor: '#5d4954' }}>
                <h2 className="m-0 py-1"
                    style={{ textShadow: '0 0.05rem 0.1rem rgba(0,0,0,0.2))', cursor: 'pointer' }} 
                    onClick={()=> setSearchKey('') }>Shuffle by Spotify</h2>
                <button className="navbar-toggler collapsed my-3 text-dark" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false">
                    <span className="navbar-toggler-icon text-dark"></span>
                </button>
                <div className="navbar-collapse collapse" id="navbarCollapse">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <input className="form-control border-0 p-2" 
                                style={{ borderRadius: '30px' }}
                                type="search" placeholder="Search Songs/Artists" aria-label="Search" 
                                value={ searchKey }
                                onChange={(e)=> setSearchKey(e.target.value)} />
                        </li>
                        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                            <div className="nav-link navbar-link" 
                                 onClick={()=> { 
                                     setToggle(false)
                                     setSearchKey('')
                                 } }>Home</div>
                        </li>
                        { recentlyPlayed.length ?   <li className="nav-item">
                                                        <div className="nav-link navbar-link" 
                                                        onClick={()=> {
                                                            setToggle(!toggle)
                                                            setSearchKey('')
                                                        } }>Recently Played</div>
                                                    </li> : null }
                        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                            <a className="nav-link" 
                                href='/'
                                onClick={()=> logOut() }>Log out</a>
                        </li>
                    </ul>
                </div>
            </nav>
}
