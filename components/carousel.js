import utilStyles from "./../styles/utils.module.css";
import Image from "next/image";

export default function Carousel({slide}){
    return(
        <div id="myCarousel" className='carousel slide' data-bs-ride="carousel">
            <div className="carousel-indicators">
            {
                slide.h1.map((str,idx)=>{
                    if (idx == 0){
                        return (
                            <button type = "button" key={"button"+idx} data-bs-target="#myCarousel" data-bs-slide-to={idx} className = "active" aira-current = "true" aria-label={`Slide ${idx+1}`}></button>
                        );
                    } else {
                        return (
                            <button type = "button" key={"button"+idx} data-bs-target="#myCarousel" data-bs-slide-to={idx} aria-label={`Slide ${idx+1}`}></button>
                        );
                    }
                })
            }
            </div>
            <div className="carousel-inner">
            {
                slide.h1.map((str,idx)=>{
                    if (idx == 0){
                        return(
                            <div className={"carousel-item active"} key = {idx}>
                                <Image
                                    priority
                                    src={`/slider/${idx+1}.jpg`}
                                    className={utilStyles.fullSize}
                                    width = "100"
                                    height = "100"
                                    alt = "image"
                                />
                                <div className="container">
                                    <div className="carousel-caption text-start">
                                        <h1>{str}</h1>
                                        <p>{slide.p[idx]}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    } else {
                        return(
                            <div className={"carousel-item"} key = {idx}>
                                <Image
                                    priority
                                    src={`/slider/${idx+1}.jpg`}
                                    className={utilStyles.fullSize}
                                    width = "100"
                                    height = "100"
                                    alt = "image"
                                />
                                <div className="container">
                                    <div className="carousel-caption text-start">
                                        <h1>{str}</h1>
                                        <p>{slide.p[idx]}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                    
                })
            }
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}