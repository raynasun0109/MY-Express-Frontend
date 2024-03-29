import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import "./Carousel.scss";
function Slide(props)
{
    return (
        <Paper className={'slide_container'}>
            <img src={props.item.url}/>
        </Paper>
    )
}
export default function CarouselComponent(props)
{
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
            url:"https://res.cloudinary.com/raynasun0109/image/upload/v1676386969/myshopaholic/banner_hrgdeh.jpg"
        },
        {
            name: "Random Name #2",
            description: "Hello World!",
            url:"https://res.cloudinary.com/raynasun0109/image/upload/v1683376630/myshopaholic/slider_odp2af.jpg"

        },
        {
            url:"https://res.cloudinary.com/raynasun0109/image/upload/v1677075948/myshopaholic/27546418_molhgj.jpg"
        }
    ]

    return (
        <Carousel
            className={'carousel_container'}
            // height={'470px'}
            fullHeightHover={false}
            indicators={false}
            PrevIcon={<NavigateBeforeRoundedIcon/>}
            NextIcon={<NavigateNextRoundedIcon/>}
        >
            {
                items.map( (item, i) => <Slide key={i} item={item} /> )
            }
        </Carousel>
    )
}
