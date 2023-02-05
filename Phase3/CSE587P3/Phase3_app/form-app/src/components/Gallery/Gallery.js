import Slider from "@madzadev/image-slider";
import "@madzadev/image-slider/dist/index.css";
import Graph1 from "./plot1.png";

export const Gallery = ({ text, closePopup }) => {
  const images = [{ url: Graph1 }];
  return <Slider imageList={images} width="55%" height="55%" />;
};
