import React from "react";


const Home = () => {
    return (
        <div>
            <div id="carouselExample" className="carousel slide">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://picsum.photos/id/16/1500/500" className="d-block w-100" alt="..." />
                    </div>
                </div>
            </div>
            <div class="mt-5 text-center">
                <h1>Selamat Datang di toEko</h1>
                <p>toEko menyediakan layanan item game yang terpercaya</p>
            </div>
        </div>
    )
}

export default Home;