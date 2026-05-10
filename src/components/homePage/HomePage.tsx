
import HeroSection from "../heroSection/HeroSection";
import BrandTicker from "../BrandTicker/BrandTicker";
import ScrollPage from "../ScrollPage/ScrollPage";
import OurServicePage from "../OurServericePage/OurServicePage";
import CardStack from "../CardStack/CardStack";
import LiquidCardSection from "../CardScrollEffect/LiquidCardSection";
import FeaturedWork from "../FeaturedWork/FeaturedWork";
import Marquee from "../Marquee/Marquee";




const HomePage = () => {
    return (
        <div className="bg-[#f0efeb]">
            <HeroSection/>
            <BrandTicker />
            <FeaturedWork />
            <OurServicePage />
            <Marquee />
            <CardStack />
            <LiquidCardSection />
            <ScrollPage />
        </div>
    );
};

export default HomePage;