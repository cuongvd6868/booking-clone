
import Carousel from '~/components/Carousel';
import DefaultLayout from '~/layouts/DefaultLayout';
import "./_home.scss";
import HistorySearchItem from '~/components/HistorySearchItem';
import SubBanner from '~/components/SubBanner';
import { LIST_CAROUSEL_IMAGE_FAKE, LIST_DATA_SIMPLE_COMPONENT_FAKE, LIST_VIET_NAM_TRAVEL_FAKE } from '~/constants';
import ImageTextCarouselItemLoader from '~/components/MyLoader/components/ImageTextCarouselItemLoader';
import SimpleItemCarouselLoader from '~/components/MyLoader/components/SimpleItemCarouselLoader';
import OnlyImageCarouselLoader from '~/components/MyLoader/components/OnlyImageCarouselLoader';
import ImageTitleDescCarouselLoader from '~/components/MyLoader/components/ImageTitleDescCarouselLoader';
import SimpleItemCarouselBackgroundLoader from '~/components/MyLoader/components/SimpleItemCarouselBackgroundLoader';
import HistorySearchLoader from '~/components/MyLoader/components/HistorySearchLoader';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTypesHotel } from '~/store/actions/typeHotel.action';
import { getTopHotels } from '~/store/actions/hotel.action';
import { getTopProvinces } from '~/store/actions/province.action';

const Home = () => {

    const [histories, setHistories] = useState([]);
    // const [recommendStay, setRecommendStay] = useState([]);
    const [perfectWhere, setPerfectWhere] = useState([]);
    const [listTrending, setListTrending] = useState([]);

    const dispatch = useDispatch();
    const typicalStay = useSelector(state => state.typeHotel.typesHotel);
    const recommendStay = useSelector(state => state.hotel.topHotels);
    const topVNProvinces = useSelector(state => state.province.topProvinces);

    console.log(topVNProvinces);

    useEffect(() => {
        setTimeout(() => {
            setHistories([1, 2, 3, 4]);
            // setRecommendStay(LIST_DATA_SIMPLE_COMPONENT_FAKE);
            setPerfectWhere(LIST_DATA_SIMPLE_COMPONENT_FAKE);
            setListTrending(LIST_CAROUSEL_IMAGE_FAKE);
            // setExploreVietNam(LIST_VIET_NAM_TRAVEL_FAKE);
        }, 500);

        dispatch(getTypesHotel());
        dispatch(getTopHotels());
        dispatch(getTopProvinces());

    }, []);

    return (
        <div className='home__wrapper'>
            <DefaultLayout>
                <div className='home__content'>
                    <div className='home__recent__searches'>
                        <h5 className='home__recent__searches__title'>Your recent searches</h5>
                        {histories.length > 0
                            ?
                            <ul className='home__recent__searches__list'>
                                {histories.map((history, idx) => (
                                    <li key={idx} className='home__recent__searches__item'>
                                        <HistorySearchItem />
                                    </li>
                                ))}
                            </ul>
                            :
                            <HistorySearchLoader />
                        }
                    </div>
                    <SubBanner />
                    {typicalStay.length > 0
                        ?
                        <Carousel
                            type='image-text-component'
                            title="Go beyond your typical stay"
                            items={typicalStay?.map(t => ({
                                imgSrc: t.image,
                                type: t.name,
                                typeId: t.id
                            }))}
                            slidesToShow={5}
                            slidesToScroll={2}
                            autoPlay={false}
                            titleStyle={{ marginBottom: "14px" }}
                        />
                        :
                        <ImageTextCarouselItemLoader />
                    }
                    {recommendStay.length > 0
                        ?
                        <Carousel
                            type='image-simple-component'
                            title="Recommended stays for you"
                            description='Based on your most recently viewed property'
                            items={recommendStay?.map(h => ({
                                imgSrc: h?.image?.url,
                                name: h?.name,
                                location: h?.location,
                                isReview: true,
                                reviews: h?.reviews,
                                isSave: true
                            }))}
                            autoPlay={true}
                        />
                        :
                        <SimpleItemCarouselLoader />
                    }
                    {perfectWhere.length > 0
                        ?
                        <Carousel
                            type='image-simple-component'
                            title="Perfect some wheres 2024"
                            items={LIST_DATA_SIMPLE_COMPONENT_FAKE}
                            autoPlay={false}
                            backgroundImage={true}
                        />
                        :
                        <SimpleItemCarouselBackgroundLoader />
                    }
                    {
                        listTrending.length > 0
                            ?
                            <Carousel
                                type='image-only'
                                title="Explore stays in trending destinations"
                                items={LIST_CAROUSEL_IMAGE_FAKE}
                                autoPlay={false}
                                slidesToShow={5}
                            />
                            :
                            <OnlyImageCarouselLoader />
                    }
                    {
                        topVNProvinces.length > 0
                            ?
                            <Carousel
                                type='image-title-desc'
                                title="Explore Vietnam"
                                description='These popular destinations have a lot to offer'
                                items={topVNProvinces}
                                autoPlay={false}
                                slidesToShow={6}
                                slidesToScroll={2}
                                arrowStyle={{ transform: "translateY(-30px) !important" }}
                            />
                            :
                            <ImageTitleDescCarouselLoader />
                    }
                </div>
            </DefaultLayout>
        </div>
    )
}

export default Home
