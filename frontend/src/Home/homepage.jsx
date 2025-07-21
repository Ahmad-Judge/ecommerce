import React from 'react'
import './homepage.css'
import Products from './products'

export default function homepage() {
  return (
    <div>
      <>
        <div
          id="carouselExampleDark"
          className="carousel carousel-dark carousel-fade"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to={0}
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to={1}
              aria-label="Slide 2"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to={2}
              aria-label="Slide 3"
            />
          </div>
          <div className="carousel-inner">
            {/* First Slide */}
            <div className="carousel-item active" data-bs-interval={2000}>
              <img
                src="/Banner Img/1L.webp"
                className="d-none d-md-block w-100 img-fluid"
                alt="Large Image 1"
              />
              <img
                src="Banner Img/1S.webp"
                className="d-block d-md-none w-100 img-fluid"
                alt="Small Image 1"
              />
              <div className="carousel-caption text-white d-flex flex-column justify-content-between text-center text-md-start">
                <h5 className="fw-bold">UNSTITCHED</h5>
                <h5>FALL/ WINTER '24</h5>
              </div>
            </div>
            {/* Second Slide */}
            <div className="carousel-item" data-bs-interval={2000}>
              <img
                src="Banner Img/2L.webp"
                className="d-none d-md-block w-100 img-fluid"
                alt="Large Image 2"
              />
              <img
                src="Banner Img/2S.webp"
                className="d-block d-md-none w-100 img-fluid"
                alt="Small Image 2"
              />
              <div className="carousel-caption text-white d-flex flex-column justify-content-between text-center text-md-start">
                <h5>READY TO WEAR</h5>
                <p>FALL/ WINTER '24 NEW ARRIVALS</p>
              </div>
            </div>
            {/* Third Slide */}
            <div className="carousel-item" data-bs-interval={2000}>
              <img
                src="Banner Img/3L.webp"
                className="d-none d-md-block w-100 img-fluid"
                alt="Large Image 3"
              />
              <img
                src="Banner Img/3S.webp"
                className="d-block d-md-none w-100 img-fluid"
                alt="Small Image 3"
              />
              <div className="carousel-caption text-BLACK d-flex flex-column justify-content-between text-center text-md-start">
                <h5>WEST</h5>
                <p>FALL/ WINTER '24.</p>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <div className="container">
          <Products />
          <h1 className="text-center text-white mt-5">Popular</h1>
          {/* WHAT'S NEW */}
     {/* WHAT'S NEW */}
<div className="container my-5">
  <div className="fw-bold text-white text-center mt-4">
    <h5>WHAT'S NEW</h5>
  </div>

  <div
    id="imageCarousel"
    className="carousel slide"
    data-bs-ride="carousel"
    data-bs-interval="2000"
  >
    {/* Carousel Indicators */}
    <div className="carousel-indicators ">
      <button
        type="button"
        data-bs-target="#imageCarousel"
        data-bs-slide-to="0"
        className="active"
        aria-current="true"
        aria-label="Slide 1"
      ></button>
      <button
        type="button"
        data-bs-target="#imageCarousel"
        data-bs-slide-to="1"
        aria-label="Slide 2"
      ></button>
    </div>

    <div className="carousel-inner ">
      {/* First Slide */}
      <div className="carousel-item active">
        <div className="row justify-content-center">
          <div className="col-10 col-sm-6 col-md-3 mb-3">
            <img
              src="What's New/fall-winter-kids.jpg"
              className="d-block w-100 img-fluid img-fluid rounded-circle"
              alt="Fall Winter Kids Collection"
            />
          </div>
          <div className="col-10 col-sm-6 col-md-3 mb-3">
            <img
              src="What's New/LUXE-unstitched.jpg"
              className="d-block w-100 img-fluid rounded-circle"
              alt="Luxe Unstitched Collection"
            />
          </div>
          <div className="col-10 col-sm-6 col-md-3 mb-3">
            <img
              src="What's New/men_s-shawls.jpg"
              className="d-block w-100 img-fluid rounded-circle"
              alt="Men's Shawls Collection"
            />
          </div>
          <div className="col-10 col-sm-6 col-md-3 mb-3">
            <img
              src="What's New/quilt-covers_b04e2162-91cd-4276-af05-14ff41e760d0.jpg"
              className="d-block w-100 img-fluid rounded-circle"
              alt="Quilt Covers Collection"
            />
          </div>
        </div>
      </div>
      <div className="carousel-item active">
        <div className="row justify-content-center">
          <div className="col-10 col-sm-6 col-md-3 mb-3">
            <img
              src="What's New/fall-winter-kids.jpg"
              className="d-block w-100 img-fluid img-fluid rounded-circle"
              alt="Fall Winter Kids Collection"
            />
          </div>
          <div className="col-10 col-sm-6 col-md-3 mb-3">
            <img
              src="What's New/LUXE-unstitched.jpg"
              className="d-block w-100 img-fluid rounded-circle"
              alt="Luxe Unstitched Collection"
            />
          </div>
          <div className="col-10 col-sm-6 col-md-3 mb-3">
            <img
              src="What's New/men_s-shawls.jpg"
              className="d-block w-100 img-fluid rounded-circle"
              alt="Men's Shawls Collection"
            />
          </div>
          <div className="col-10 col-sm-6 col-md-3 mb-3">
            <img
              src="What's New/quilt-covers_b04e2162-91cd-4276-af05-14ff41e760d0.jpg"
              className="d-block w-100 img-fluid rounded-circle"
              alt="Quilt Covers Collection"
            />
          </div>
        </div>
      </div>

     
    </div>

    {/* Previous and Next Buttons */}
    <button
      className="carousel-control-prev"
      type="button"
      data-bs-target="#imageCarousel"
      data-bs-slide="prev"
    >
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button
      className="carousel-control-next"
      type="button"
      data-bs-target="#imageCarousel"
      data-bs-slide="next"
    >
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
</div>
          {/* SHOP BY CATEGORY */}
          <div className="fw-bold text-white text-center mt-5">
            <h5>SHOP BY CATEGORY</h5>
          </div>
          <div
            id="imageCarousel1"
            className="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval={3000}
          >
            <div className="carousel-inner">
              {/* First Slide - First 4 images */}
              <div className="carousel-item active">
                <div className="row">
                  <div className="col-12 col-sm-6 col-md-3 mb-3">
                    <img
                      src="categories slider/man-sbc.webp"
                      className="d-block w-100 img-fluid"
                      alt="Image 1"
                    />
                    <h5 className="text-white text-center mt-2">MAN</h5>
                  </div>
                  <div className="col-12 col-sm-6 col-md-3 mb-3">
                    <img
                      src="categories slider/sbc-_-beauty.webp"
                      className="d-block w-100 img-fluid"
                      alt="Image 2"
                    />
                    <h5 className="text-white text-center mt-2">BEAUTY</h5>
                  </div>
                  <div className="col-12 col-sm-6 col-md-3 mb-3">
                    <img
                      src="categories slider/sbc___homeee.webp"
                      className="d-block w-100 img-fluid"
                      alt="Image 3"
                    />
                    <h5 className="text-white text-center mt-2">HOME</h5>
                  </div>
                  <div className="col-12 col-sm-6 col-md-3 mb-3">
                    <img
                      src="categories slider/sbc___kids.webp"
                      className="d-block w-100 img-fluid"
                      alt="Image 4"
                    />
                    <h5 className="text-white text-center mt-2">KIDS</h5>
                  </div>
                </div>
              </div>
              {/* Second Slide - Remaining 4 images */}
              <div className="carousel-item">
                <div className="row">
                  <div className="col-12 col-sm-6 col-md-3 mb-3">
                    <img
                      src="categories slider/sbc___modest_wear.webp"
                      className="d-block w-100 img-fluid "
                      alt="Image 5"
                    />
                    <h5 className="text-white text-center mt-2">MODEST WEAR</h5>
                  </div>
                  <div className="col-12 col-sm-6 col-md-3 mb-3">
                    <img
                      src="categories slider/sbc___rtw.webp"
                      className="d-block w-100 img-fluid"
                      alt="Image 6"
                    />
                    <h5 className="text-white text-center mt-2">READY TO WEAR</h5>
                  </div>
                  <div className="col-12 col-sm-6 col-md-3 mb-3">
                    <img
                      src="categories slider/sbc___us_2.webp"
                      className="d-block w-100 img-fluid"
                      alt="Image 7"
                    />
                    <h5 className="text-white text-center mt-2">UNSTITCHED</h5>
                  </div>
                  <div className="col-12 col-sm-6 col-md-3 mb-3">
                    <img
                      src="categories slider/sbc___west.webp"
                      className="d-block w-100 img-fluid"
                      alt="Image 8"
                    />
                    <h5 className="text-white text-center mt-2">WEST</h5>
                  </div>
                </div>
              </div>
            </div>
            {/* Controls */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#imageCarousel1"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#imageCarousel1"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          {/* TRENDING */}
          <div className="fw-bold text-white text-center mt-5">
            <h5>TRENDING</h5>
          </div>
          <div
            id="imageCarousel2"
            className="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval={3000}
          >
            <div className="carousel-inner">
              {/* First Slide - First 4 images */}
              <div className="carousel-item active">
                <div className="row">
                  <div className="col-12 col-sm-6 col-md-3 mb-3">
                    <img
                      src="Trending/03PESGW24V23_6.webp"
                      className="d-block w-100 zoomed img-fluid"
                      alt="Image 1"
                    />
                    <h6 className="text-white trending_text mt-2">
                      EMBELLISHED SILK KAFTAN
                    </h6>
                    <h6 className="text-white trending_text">
                      RTW Winter '24 New Arrivals
                    </h6>
                    <h6 className="text-white trending_text">Rs.8,990.00</h6>
                  </div>
                  <div className="col-12 col-sm-6 col-md-3 mb-3">
                    <img
                      src="Trending/0TSTSLW24V48_1.webp"
                      className="d-block w-100 zoomed img-fluid"
                      alt="Image 2"
                    />
                    <h6 className="text-white trending_text mt-2">
                      EMBELLISHED SILK KAFTAN
                    </h6>
                    <h6 className="text-white trending_text">
                      RTW Winter '24 New Arrivals
                    </h6>
                    <h6 className="text-white trending_text">Rs.8,990.00</h6>
                  </div>
                  <div className="col-12 col-sm-6 col-md-3 mb-3">
                    <img
                      src="Trending/0U2DEDY24V83_3.webp"
                      className="d-block w-100 zoomed img-fluid"
                      alt="Image 3"
                    />
                    <h6 className="text-white trending_text mt-2">
                      2 PIECE - EMBROIDERED KHADDAR SUIT
                    </h6>
                    <h6 className="text-white trending_text">
                      Unstitched Winter '24 New Arrivals
                    </h6>
                    <h6 className="text-white trending_text">Rs.4,290.00</h6>
                  </div>
                  <div className="col-12 col-sm-6 col-md-3 mb-3">
                    <img
                      src="Trending/2STDW24V437B_2.webp"
                      className="d-block w-100 zoomed img-fluid"
                      alt="Image 4"
                    />
                    <h6 className="text-white trending_text mt-2">
                      EMBROIDERED LAWN SHIRT
                    </h6>
                    <h6 className="text-white trending_text">
                      RTW Winter '24 New Arrivals
                    </h6>
                    <h6 className="text-white trending_text">Rs.5,990.00</h6>
                  </div>
                </div>
              </div>
              {/* Second Slide - Remaining 4 images */}
              <div className="carousel-item">
                <div className="row">
                  <div className="col-12 col-sm-6 col-md-3 mb-3">
                    <img
                      src="Trending/2STDYW24V443_3.webp"
                      className="d-block w-100 zoomed img-fluid"
                      alt="Image 5"
                    />
                    <h6 className="text-white trending_text mt-2">
                      EMBROIDERED DOBBY SHIRT
                    </h6>
                    <h6 className="text-white trending_text">
                      RTW Winter '24 New Arrivals
                    </h6>
                    <h6 className="text-white trending_text">Rs.5,990.00</h6>
                  </div>
                  <div className="col-12 col-sm-6 col-md-3 mb-3">
                    <img
                      src="Trending/U2TEST24V815_5.webp"
                      className="d-block w-100 zoomed img-fluid"
                      alt="Image 6"
                    />
                    <h6 className="text-white trending_text mt-2">
                      2 PIECE - EMBROIDERED DOBBY SUIT
                    </h6>
                    <h6 className="text-white trending_text">
                      Unstitched Winter '24 New Arrivals
                    </h6>
                    <h6 className="text-white trending_text">Rs.4,290.00</h6>
                  </div>
                  <div className="col-12 col-sm-6 col-md-3 mb-3">
                    <img
                      src="Trending/U2TEST24V816_1.webp"
                      className="d-block w-100 zoomed img-fluid"
                      alt="Image 7"
                    />
                    <h6 className="text-white trending_text mt-2">
                      2 PIECE - EMBROIDERED DOBBY SUIT
                    </h6>
                    <h6 className="text-white trending_text">
                      Unstitched Winter '24 New Arrivals
                    </h6>
                    <h6 className="text-white trending_text">Rs.4,090.00</h6>
                  </div>
                  <div className="col-12 col-sm-6 col-md-3 mb-3">
                    <img
                      src="Trending/U3PESG24V826_1.webp"
                      className="d-block w-100 zoomed img-fluid"
                      alt="Image 8"
                    />
                    <h6 className="text-white trending_text mt-2">
                      2 PIECE - EMBROIDERED KHADDAR SUIT
                    </h6>
                    <h6 className="text-white trending_text">
                      Unstitched Winter '24 New Arrivals
                    </h6>
                    <h6 className="text-white trending_text">Rs.7,590.00</h6>
                  </div>
                </div>
              </div>
            </div>
            {/* Controls */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#imageCarousel2"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#imageCarousel2"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          {/* MORE TO EXPLORE */}
          <div
            id="imageCarousel3"
            className="carousel slide py-4"
            data-bs-ride="carousel"
            data-bs-interval={3000}
          >
            <div className="carousel-inner">
              {/* First Slide */}
              <div className="carousel-item active">
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    src="MoreToExplore/fabric-more-to-explore.jpg"
                    className="img-fluid carousel-img"
                    alt="Image 1"
                  />
                </div>
              </div>
              {/* Second Slide */}
              <div className="carousel-item">
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    src="MoreToExplore/fragrances-more-to-exlore.jpg"
                    className="img-fluid carousel-img"
                    alt="Image 2"
                  />
                </div>
              </div>
              {/* Third Slide */}
              <div className="carousel-item">
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    src="MoreToExplore/more_to_explore_c9f48b98-b619-4603-a6c7-9754e5063d2c.jpg"
                    className="img-fluid carousel-img"
                    alt="Image 3"
                  />
                </div>
              </div>
              <div className="carousel-item">
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    src="MoreToExplore/south-collection.jpg"
                    className="img-fluid carousel-img"
                    alt="Image 3"
                  />
                </div>
              </div>
              <div className="carousel-item">
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    src="MoreToExplore/styled-by-iqra.jpg"
                    className="img-fluid carousel-img"
                    alt="Image 3"
                  />
                </div>
              </div>
              <div className="carousel-item">
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    src="MoreToExplore/styled-by-you-more-to-explore.jpg"
                    className="img-fluid carousel-img"
                    alt="Image 3"
                  />
                </div>
              </div>
              <div className="carousel-item">
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    src="MoreToExplore/winter-coats.jpg"
                    className="img-fluid carousel-img"
                    alt="Image 3"
                  />
                </div>
              </div>
            </div>
            {/* Carousel Controls */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#imageCarousel3"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#imageCarousel3"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          {/* SYLED BY YOU */}
          <div
            id="imageCarousel4"
            className="carousel slide py-4"
            style={{ background: "rgb(228, 225, 199)" }}
            data-bs-ride="carousel"
            data-bs-interval={3000}
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="row">
                  <div className="col-12 col-sm-6 col-md-3 mb-3">
                    <img
                      src="styledBy/Rafya-1.webp"
                      className="d-block w-100 zoomed img-fluid"
                      alt="Image 1"
                    />
                    <h6 className="text-dark trending_text text-center fw-bold mt-2">
                      RAFYA MINHAS KHAN
                    </h6>
                    <h6 className="text-dark text-center trending_text">
                      @rafyaminhas
                    </h6>
                    <h6 className="text-dark text-center trending_text">wearing our</h6>
                    <h6 className="text-dark text-center trending_text">
                      3 Piece- Embroidered Organza Suit
                    </h6>
                  </div>
                  <div className="col-12 col-sm-6 col-md-3 mb-3">
                    <img
                      src="styledBy/sby-areesha (1).webp"
                      className="d-block w-100 zoomed img-fluid"
                      alt="Image 2"
                    />
                    <h6 className="text-dark trending_text text-center fw-bold mt-2">
                      ARISHA KHAN
                    </h6>
                    <h6 className="text-dark text-center trending_text">
                      @littlekhanwanderlust
                    </h6>
                    <h6 className="text-dark text-center trending_text">wearing our</h6>
                    <h6 className="text-dark text-center trending_text">
                      3 Piece- Embroidered Velvet Suit
                    </h6>
                  </div>
                  <div className="col-12 col-sm-6 col-md-3 mb-3">
                    <img
                      src="styledBy/sby-hira.webp"
                      className="d-block w-100 zoomed img-fluid"
                      alt="Image 3"
                    />
                    <h6 className="text-dark trending_text text-center fw-bold mt-2">
                      HIRA ATTIQUE
                    </h6>
                    <h6 className="text-dark text-center trending_text">@hirableeh</h6>
                    <h6 className="text-dark text-center trending_text">wearing our</h6>
                    <h6 className="text-dark text-center trending_text">
                      2 Piece- Embroidered Light Khaddar Suit
                    </h6>
                  </div>
                  <div className="col-12 col-sm-6 col-md-3 mb-3">
                    <img
                      src="styledBy/sby-jiya.webp"
                      className="d-block w-100 zoomed img-fluid"
                      alt="Image 4"
                    />
                    <h6 className="text-dark trending_text text-center fw-bold mt-2">
                      JIYA KHURRAM
                    </h6>
                    <h6 className="text-dark text-center trending_text">
                      @dearwalletpk
                    </h6>
                    <h6 className="text-dark text-center trending_text">wearing our</h6>
                    <h6 className="text-dark text-center trending_text">
                      3 Piece- Embroidered Linen Suit
                    </h6>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="row">
                  <div className="col-12 col-sm-6 col-md-3 mb-3">
                    <img
                      src="styledBy/sby-jiya.webp"
                      className="d-block w-100 zoomed img-fluid"
                      alt="Image 8"
                    />
                    <h6 className="text-dark trending_text text-center fw-bold mt-2">
                      JIYA KHURRAM
                    </h6>
                    <h6 className="text-dark text-center trending_text">
                      @dearwalletpk
                    </h6>
                    <h6 className="text-dark text-center trending_text">wearing our</h6>
                    <h6 className="text-dark text-center trending_text">
                      3 Piece- Embroidered Linen Suit
                    </h6>
                  </div>
                  <div className="col-12 col-sm-6 col-md-3 mb-3">
                    <img
                      src="styledBy/sby-mahum.webp"
                      className="d-block w-100 zoomed img-fluid"
                      alt="Image 6"
                    />
                    <h6 className="text-dark trending_text text-center fw-bold mt-2">
                      MAHAM YAQUB
                    </h6>
                    <h6 className="text-dark text-center trending_text">
                      @dearwalletpk
                    </h6>
                    <h6 className="text-dark text-center trending_text">wearing our</h6>
                    <h6 className="text-dark text-center trending_text">
                      3 Piece- Embroidered Linen Suit
                    </h6>
                  </div>
                  <div className="col-12 col-sm-6 col-md-3 mb-3">
                    <img
                      src="styledBy/sby-ramsha.jpg"
                      className="d-block w-100 zoomed img-fluid"
                      alt="Image 7"
                    />
                    <h6 className="text-dark trending_text text-center fw-bold mt-2">
                      RAMSHA AHMAD KHAN
                    </h6>
                    <h6 className="text-dark text-center trending_text">
                      @ramshaahmedkhan
                    </h6>
                    <h6 className="text-dark text-center trending_text">wearing our</h6>
                    <h6 className="text-dark text-center trending_text">
                      Embroidered Cambric Shirt
                    </h6>
                  </div>
                  <div className="col-12 col-sm-6 col-md-3 mb-3">
                    <img
                      src="styledBy/sby-saba.webp"
                      className="d-block w-100 zoomed img-fluid"
                      alt="Image 8"
                    />
                    <h6 className="text-dark trending_text text-center fw-bold mt-2">
                      SABA SALEEM KHAN
                    </h6>
                    <h6 className="text-dark text-center trending_text">
                      @_sabasaleem
                    </h6>
                    <h6 className="text-dark text-center trending_text">wearing our</h6>
                    <h6 className="text-dark text-center trending_text">
                      Embroidered Dobby Shirt
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#imageCarousel4"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#imageCarousel4"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className="py-3 bg-white">
          <span />
        </div>
        <footer>
          <div className="footer container-fluid bg-dark py-4">
            <div className="container text-white">
              <div className="row">
                <div className="col-lg-3 col-md-4 col-12 mb-3">
                  <h6
                    className="fw-bold FH"
                    data-bs-toggle="collapse"
                    data-bs-target=".contactUs"
                  >
                    CONTACT US
                  </h6>
                  <div className="contactUs collapse opacity-50">
                    <p className="mb-1">
                      <i className="bi bi-geo-alt-fill" /> Sapphire Retail Head Office
                      <br />
                      1.5-Km, Defence Road, Bhobtian Chowk,
                      <br />
                      Off Raiwind Road, Opposite University of Lahore, Lahore.
                    </p>
                    <p className="mb-1">
                      <i className="bi bi-envelope" /> wecare@sapphireonline.pk
                    </p>
                    <p>
                      <i className="bi bi-telephone" /> +92(0)42-111-738-245
                    </p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-12 mb-3">
                  <h6
                    className="fw-bold FH"
                    data-bs-toggle="collapse"
                    data-bs-target=".customerCare"
                  >
                    CUSTOMER CARE
                  </h6>
                  <div className="customerCare collapse opacity-50">
                    <ul className="list-unstyled">
                      <li>
                        <a href="#" className="text-white text-decoration-none">
                          Exchange &amp; Return Policy
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-white text-decoration-none">
                          FAQs
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-white text-decoration-none">
                          Contact Us
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-12 mb-3">
                  <h6
                    className="fw-bold FH"
                    data-bs-toggle="collapse"
                    data-bs-target=".information"
                  >
                    INFORMATION
                  </h6>
                  <div className="information collapse opacity-50">
                    <ul className="list-unstyled">
                      <li>
                        <a href="#" className="text-white text-decoration-none lh-1">
                          About Us
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-white text-decoration-none lh-1">
                          Privacy Policy
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-white text-decoration-none lh-1">
                          SafePay Guide
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-white text-decoration-none lh-1">
                          Payments
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-white text-decoration-none lh-1">
                          Store Locator
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-white text-decoration-none lh-1">
                          Fabric Glossary
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-white text-decoration-none lh-1">
                          Blogs
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-12 mb-3">
                  <h6
                    className="fw-bold FH"
                    data-bs-toggle="collapse"
                    data-bs-target=".newsletter"
                  >
                    NEWSLETTER SIGNUP
                  </h6>
                  <div className="newsletter collapse">
                    <p className="opacity-50">
                      Subscribe to our Newsletter for Exclusive Updates
                    </p>
                    <form className="input-group mb-3">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Your email address"
                      />
                      <button className="btn btn-danger" type="submit">
                        Subscribe
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid d-flex flex-wrap justify-content-center m-lg-4 ">
              <a href="https://www.facebook.com/sapphireofficial/">
                <i className="bi-facebook text-white m-2" id="FI1" />
              </a>
              <a href="https://www.instagram.com/sapphirepakistan/">
                <i className="bi-instagram text-white m-2 " id="FI2" />
              </a>
              <a href="https://www.youtube.com/channel/UCvMjM0BkK7SzlYnPTi5CBUQ">
                <i className="bi-youtube text-white m-2 " id="FI3" />
              </a>
            </div>
          </div>
        </footer>
        <h6 className="text-dark text-center bg-white">© COPYRIGHT 2024 SAPPHIRE</h6>
        <div className="d-flex align-items-center justify-content-center">
          <img
            src="/images/logogs_80587d78-218a-43ff-92d2-3b65e39da5f6_1.avif"
            style={{ height: 25 }}
            alt="logo"
          />
        </div>
      </>
    </div>
  )
}