import React, { useEffect, useState } from "react";
import "./shop.css";
import logo from "../../Pictures/images/banners/banner.jpg";
import logo2 from "../../Pictures/images/banners/1.png";
import { AiFillHeart, AiFillEye, AiOutlineClose } from "react-icons/ai";
import { useParams } from "react-router-dom";


export default function Shop({allTrendingProducts, products, setproduct, addToCart}) {

  const [detail, setdetail] = useState(false)
  const [prodetails, setprodetails] = useState([])
  const { id } = useParams();
  const cartpro = products.find(cartpro => cartpro.id === parseInt(id));

  useEffect(() => {
    allTrendingProducts()
  }, []);

  const filterproduct = async (category) => {
    const res = await fetch("http://127.0.0.1:8000/api/products/");
    const json = await res.json();
    const filterdata = json.filter((p) => p.category === category);
    setproduct(filterdata);
  };

  const detailpage = (product) => {
    const detaildata = ([{product}])
    const productdetail = detaildata[0]['product']
    console.log(productdetail)
    setprodetails(productdetail)
    setdetail(true)
  }

  const closebtn = () => {
    setdetail(false)
  }



  return (
    <>
    {
      detail ? 
      <div className="product_details">
        <button className="close_btn" onClick={closebtn}><AiOutlineClose/></button>
        <div className="container">
          <div className="img_box">
            <img src={prodetails.image} alt="" />
          </div>
          <div className="info">
            <h4># {prodetails.category}</h4>
            <h2>{prodetails.name}</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim, deleniti exercitationem pariatur voluptatibus dolorem obcaecati vitae sapiente ex iste quis culpa ad dolor est incidunt quod quisquam unde, consequuntur sequi?</p>
            <h3>${prodetails.price}</h3>
            <button onClick={()=> addToCart(cartpro)}>Add to Cart</button>
          </div>
        </div>
      </div>

      : null
    }
      <div className="shop">
        <h2># SHop</h2>
        <p>Home . Shop</p>
        <div className="container">
          <div className="left_box">
            <div className="categories">
              <div className="header">
                <h2>All Categories</h2>
              </div>
              <div className="box">
                <ul>
                <li onClick={(()=>allTrendingProducts())}>All</li>
                  <li onClick={(()=>filterproduct('48b0bc8b-d02a-464d-b9eb-63b823278e67'))}>TV</li>
                  <li onClick={(()=>filterproduct('b98ee365-5899-478a-bd57-3759544ec13e'))}>Mobiles</li>
                  <li onClick={(()=>filterproduct('f317107a-02c0-45e4-961a-46f50f6f5d77'))}>Clothes</li>
                  <li onClick={(()=>filterproduct('f317107a-02c0-45e4-961a-46f50f6f5d77'))}>Jwellery</li>
                  <li onClick={(()=>filterproduct('48b0bc8b-d02a-464d-b9eb-63b823278e67'))}>Acceroies</li>
                  <li onClick={(()=>filterproduct('b98ee365-5899-478a-bd57-3759544ec13e'))}>Electronics</li>
                </ul>
              </div>
            </div>
            <div className="banner">
              <div className="img_box">
                <img src={logo} alt="" />
              </div>
            </div>
          </div>
          <div className="right_box">
            <div className="banner">
              <div className="img_box">
                <img src={logo2} alt="" />
              </div>
            </div>
            <duv className="product_box">
              <h2>Shop Products</h2>
              <div className="product_container">
                {products.map((pro) => {
                  return (
                    <>
                      <div className="box">
                        <div className="img_box">
                          <img src={pro.image} alt="" />
                          <div className="icon">
                            <i>
                              <AiFillEye onClick={()=>detailpage(pro)}/>
                            </i>
                            <i>
                              <AiFillHeart />
                            </i>
                          </div>
                        </div>
                        <div className="details">
                          <h3>{pro.name}</h3>
                          <p>Rs. {pro.price}</p>
                          <button onClick={()=>addToCart(cartpro)}>Add to Cart</button>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </duv>
          </div>
        </div>
      </div>
    </>
  );
}
