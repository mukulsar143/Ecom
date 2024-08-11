import React, { useEffect, useState } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import {
  AiFillEye,
  AiFillHeart,
  AiOutlineShoppingCart,
  AiOutlineClose,
} from "react-icons/ai";
import {
  BiLogoInstagram,
  BiLogoLinkedin,
  BiLogoWhatsapp,
  BiLogoYoutube,
} from "react-icons/bi";
import logo from "../../Pictures/images/avatars/avatar2.jpg";
import logo1 from "../../Pictures/images/posts/1.jpg";
import logo2 from "../../Pictures/images/posts/2.jpg";
import logo3 from "../../Pictures/images/posts/3.jpg";
import logo4 from "../../Pictures/images/posts/6.jpg";
import logo5 from "../../Pictures/images/posts/5.jpg";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, addToCart } from "../../redux/actions/cartActions";

export default function Home({ setproduct, products }) {
  const [newproducts, setNewProducts] = useState([]);
  const [featuredproducts, setFeaturedProducts] = useState([]);
  const [topproducts, setTopProducts] = useState([]);
  const [detail, setDetail] = useState(false);
  const [prodetails, setProdetails] = useState([]);
  const dispatch = useDispatch();
  // const products = useSelector((state) => state.cart.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/products/");
        const data = await res.json();
        setproduct(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [setproduct]);

  const filterproduct = async (category) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/products/");
      const json = await res.json();
      const filterdata = json.filter((p) => p.category === category);
      setproduct(filterdata);
    } catch (error) {
      console.error("Error filtering products:", error);
    }
  };

  const allTrendingProducts = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/products/");
      const json = await res.json();
      setproduct(json);
    } catch (error) {
      console.error("Error fetching trending products:", error);
    }
  };

  const newcategory = async () => {
    if (products.length > 0) {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/products/");
        const json = await res.json();
        setNewProducts(
          json.filter(
            (x) => x.category === "85c3ef7e-4534-45f2-8183-64c3c072b58f"
          )
        );
        setFeaturedProducts(
          json.filter(
            (x) => x.category === "76570c45-f34b-4f4f-b629-01ec5779d6f6"
          )
        );
        setTopProducts(
          json.filter(
            (x) => x.category === "b98ee365-5899-478a-bd57-3759544ec13e"
          )
        );
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
  };

  const closebtn = () => {
    setDetail(false);
  };

  const detailpage = (product) => {
    setProdetails(product);
    setDetail(true);
  };

  useEffect(() => {
    newcategory();
  }, [products]);

  return (
    <>
      {detail && (
        <div className="product_details">
          <button className="close_btn" onClick={closebtn}>
            <AiOutlineClose />
          </button>
          <div className="container">
            <div className="img_box">
              <img src={prodetails.image} alt="" />
            </div>
            <div className="info">
              <h4># {prodetails.category}</h4>
              <h2>{prodetails.name}</h2>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim,
                deleniti exercitationem pariatur voluptatibus dolorem obcaecati
                vitae sapiente ex iste quis culpa ad dolor est incidunt quod
                quisquam unde, consequuntur sequi?
              </p>
              <h3>${prodetails.price}</h3>
              <button onClick={() => dispatch(addToCart(prodetails))}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="home">
        <div className="top_banner">
          <div className="contant">
            <h3>Gold Jewelry</h3>
            <h2>IPhone 14X</h2>
            <p>30% off at your first order</p>
            <Link to="/shop" className="link">
              Shop Now
            </Link>
          </div>
        </div>
        <div className="trending">
          <div className="container">
            <div className="left_box">
              <div className="header">
                <div className="heading">
                  <h2 onClick={() => allTrendingProducts()}>Trending Products</h2>
                </div>
                <div className="categ">
                  <h3
                    onClick={() =>
                      filterproduct("85c3ef7e-4534-45f2-8183-64c3c072b58f")
                    }
                  >
                    New
                  </h3>
                  <h3
                    onClick={() =>
                      filterproduct("76570c45-f34b-4f4f-b629-01ec5779d6f6")
                    }
                  >
                    Featured
                  </h3>
                  <h3 onClick={() => filterproduct("3")}>Top Rated</h3>
                </div>
              </div>
              <div className="products">
                <div className="container">
                  {products.map((image) => (
                    <div className="box" key={image.id}>
                      <div className="img_box">
                        <img src={image.image} alt="" />
                        <div className="icon">
                          <div className="iconbox">
                            <AiFillHeart />
                          </div>
                          <div className="iconbox">
                            <AiFillEye onClick={() => detailpage(image)} />
                          </div>
                        </div>
                      </div>
                      <div className="info">
                        <h3>{image.name}</h3>
                        <p>Rs. {image.price}</p>
                        <button
                          className="btn"
                          onClick={() => dispatch(addToCart(image))}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button>Show More</button>
              </div>
            </div>
            <div className="right_box">
              <div className="right_container">
                <div className="testimonial">
                  <div className="head">
                    <h3>Our Testimonial</h3>
                  </div>
                  <div className="detail">
                    <div className="img_box">
                      <img src={logo} alt="" />
                    </div>
                    <div className="info">
                      <h3>Make Hrx</h3>
                      <h4>Web Developer</h4>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Totam libero earum dolorum amet consectetur eaque
                        eum eius sapiente architecto reprehenderit ducimus quod
                        repellendus, perferendis alias necessitatibus molestiae
                        qui corrupti in.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="newsletter">
                  <div className="head">
                    <h3>Newsletter</h3>
                  </div>
                  <div className="formbox">
                    <p>Join our mailing list</p>
                    <input type="email" placeholder="E-Mail" autoComplete="off" />
                    <button>Subscribe</button>
                    <div className="icon_box">
                      <div className="icon">
                        <BiLogoLinkedin />
                      </div>
                      <div className="icon">
                        <BiLogoInstagram />
                      </div>
                      <div className="icon">
                        <BiLogoWhatsapp />
                      </div>
                      <div className="icon">
                        <BiLogoYoutube />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="banner">
          <div className="container">
            <div className="left_box">
              <div className="box">
                <img src={logo1} alt="" />
              </div>
              <div className="box">
                <img src={logo2} alt="" />
              </div>
            </div>
            <div className="right_box">
              <div className="top">
                <img src={logo3} alt="" />
                <img src={logo4} alt="" />
              </div>
              <div className="bottom">
                <img src={logo5} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="product_type">
          <div className="container">
            <div className="box">
              <div className="header">
                <h2>New Products</h2>
              </div>
              {newproducts.map((pro) => (
                <div className="product_box" key={pro.id}>
                  <div className="img_box">
                    <img src={pro.image} alt="" />
                  </div>
                  <div className="details">
                    <h3>{pro.name}</h3>
                    <p>{pro.price}</p>
                    <div className="icon">
                      <button>
                        <AiFillEye onClick={() => detailpage(pro)} />
                      </button>
                      <button>
                        <AiFillHeart />
                      </button>
                      <button>
                        <AiOutlineShoppingCart
                          onClick={() => dispatch(addToCart(pro))}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="box">
              <div className="header">
                <h2>Featured Products</h2>
              </div>
              {featuredproducts.map((pro) => (
                <div className="product_box" key={pro.id}>
                  <div className="img_box">
                    <img src={pro.image} alt="" />
                  </div>
                  <div className="details">
                    <h3>{pro.name}</h3>
                    <p>{pro.price}</p>
                    <div className="icon">
                      <button>
                        <AiFillEye onClick={() => detailpage(pro)} />
                      </button>
                      <button>
                        <AiFillHeart />
                      </button>
                      <button>
                        <AiOutlineShoppingCart
                          onClick={() => dispatch(addToCart(pro))}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="box">
              <div className="header">
                <h2>Top Products</h2>
              </div>
              {topproducts.map((pro) => (
                <div className="product_box" key={pro.id}>
                  <div className="img_box">
                    <img src={pro.image} alt="" />
                  </div>
                  <div className="details">
                    <h3>{pro.name}</h3>
                    <p>{pro.price}</p>
                    <div className="icon">
                      <button>
                        <AiFillEye onClick={() => detailpage(pro)} />
                      </button>
                      <button>
                        <AiFillHeart />
                      </button>
                      <button>
                        <AiOutlineShoppingCart
                          onClick={() => dispatch(addToCart(pro))}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
