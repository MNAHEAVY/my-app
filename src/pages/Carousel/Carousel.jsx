import { useNavigate } from "react-router";
import imageOne from "../../assets/a.jpg";
import imageTwo from "../../assets/Iph.png";
import imageThree from "../../assets/c.jpg";
import Carousel from "react-bootstrap/Carousel";
import "./Carousel.css";

export default function Carrousel() {
  const navigate = useNavigate();

  return (
    <Carousel className="containerCarousel" variant="dark">
      <Carousel.Item interval={3000}>
        <img
          className="imageCarousel"
          src={imageOne}
          alt="First slide"
          onClick={() => navigate("/detail/6318c6acce607c902c86dd24")}
        />
      </Carousel.Item>

      <Carousel.Item interval={3000}>
        <img
          className="imageCarousel"
          src={imageTwo}
          alt="Second slide"
          onClick={() => navigate("/detail/6318c6acce607c902c86dd04")}
        />
      </Carousel.Item>

      <Carousel.Item interval={3000}>
        <img
          className="imageCarousel"
          src={imageThree}
          alt="Third slide"
          onClick={() => navigate("/detail/6318c6acce607c902c86dd18")}
        />
      </Carousel.Item>
    </Carousel>
  );
}
