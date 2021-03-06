import moment from 'moment'
import { useState, useEffect } from 'react'

function useWindowSize() {
    const [windowSize, setWindowSize] = useState({ width: undefined })
  
    useEffect(() => {
        const handleResize = ()=> setWindowSize({ width: window.innerWidth })
        window.addEventListener("resize", handleResize)
        handleResize()
        return () => window.removeEventListener("resize", handleResize);
    }, [])
  
    return windowSize;
  }

export default function Template ({ data, head, setSong, handleModal }) {
    const size = useWindowSize()

    return  <>
                <div className='p-3' style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
                    <div id="carouselExampleInterval" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            { data.map((track, index) => {
                                const { id, title, artists, album_type, image, uri, release_date } = track
                                const date = release_date.replace('/-/g', '')
                                const trackKey = `${id} + ${ title }`
                                return  <div className={ index === 0 ? 'carousel-item active' : 'carousel-item'} key={ trackKey}>
                                            <div className="row m-0 g-0 overflow-hidden flex-md-row h-md-250 position-relative">
                                                <div className="col-auto d-none d-md-block p-3 bg-light">
                                                    <img className="" src={ image } style={{ width: '200px', borderRadius: '50%' }} alt="" />
                                                </div>
                                                <div className="col pl-5 pl-md-4 d-flex flex-column position-static">
                                                    <h4 className="lead mb-0">{ title }</h4>
                                                    <h1 className="display-5 mb-0 text-warning">{ head }</h1>
                                                    <div className="mb-1 text-normal">By { artists.map(artist => artist.name ).join(', ')}</div>
                                                    <div className="mb-3">Released on { moment(date).format('MMMM D, YYYY') }, { moment(date).fromNow() }</div>
                                                    <div>
                                                        <button className='btn btn-lg btn-primary mb-2 d-flex justify-content-center align-items-center'
                                                                style={{ borderRadius: '30px' }}
                                                                onClick={ async ()=> { 
                                                                    await setSong({ id, title, artists, album_type, image, uri, release_date })
                                                                    await handleModal() }}>
                                                                <svg className='p-1' width="1em" height="1em" viewBox="0 0 128 128" preserveAspectRatio="xMidYMid"><path d="M119.351 64L8.65 0v128z" fill="currentColor"></path></svg> 
                                                                Play this song
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                            })}
                        </div>
                        <div className="carousel-control-prev" style={{ width: '5%'}}
                             type="button" data-target="#carouselExampleInterval" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        </div>
                        <div className="carousel-control-next" style={{ width: '5%'}}
                             type="button" data-target="#carouselExampleInterval" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        </div>
                    </div>
                </div>
                <div className="table-responsive flex-grow-1" style={{ backgroundColor: 'rgba(0,0,0,0.8)'}}>
                    <table className="table table-sm text-light" style={{ color: 'rgba(255,255,255,0.5)'}}>
                        <thead>
                            <tr>
                                <th className='pl-4'></th>
                                <th>Title</th>
                                <th>Artist</th>
                                { size.width > 990 ? <> 
                                                        <th className='text-right'>Released</th>
                                                        <th></th>
                                                      </> : null }
                            </tr>
                        </thead>
                        <tbody>
                        { data.map(track => {
                            let { id, title, artists, album_type, image, uri, release_date } = track
                            const date = release_date.replace('/-/g', '')

                            return <tr className='' key={ id } style={{ cursor: 'pointer' }} 
                                        onClick={async () => {
                                            await setSong({ id, title, artists, album_type, image, uri, release_date })
                                            await handleModal()
                                        }}>
                                        <td className='text-right pl-4 pr-3'>
                                            <img src={ image } style={{ height: '30px', width: '30px', borderRadius:'50%' }} alt='' />
                                        </td>
                                        <td>{ title }</td>
                                        <td>{ artists[0].name }</td>
                                        { size.width > 990 ? <>
                                                                <td className='text-right'>{ moment(date).format('MMM D, YYYY') }</td>
                                                                <td className='pl-3'>{ moment(date).fromNow() }</td>
                                                              </> : null }
                                    </tr>})}
                        </tbody>
                    </table>
                </div>
            </>
}