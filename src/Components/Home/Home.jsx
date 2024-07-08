import CategorySlider from '../CategorySlider/CategorySlider';
import MainSlider from '../MainSlider/MainSlider';
import FeturedProducts from '../FeturedProducts/FeturedProducts';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Helmet } from 'react-helmet';
export default function Home() {

  return <>
   <Helmet>
    <meta charSet="utf-8" />
    <title>Fresh Cart </title>
    <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    <div className="container">
    <MainSlider />
      <CategorySlider />
      <FeturedProducts/>
    </div>

    </>
}
