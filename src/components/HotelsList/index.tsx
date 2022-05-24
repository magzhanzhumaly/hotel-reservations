import React from 'react'

import HotelItem from '../HotelItem'

import './hotels.css'


interface Props {
    hotelList: any
}

const HotelsList = ({hotelList}: Props) => {
    return (
        <div className="wrapper_hotel_list">
            {
                hotelList.map((item:any)=>(
                    <HotelItem  data={item} key={item.Id}/>
                ))
            }
        </div>
    )
}

export default HotelsList
