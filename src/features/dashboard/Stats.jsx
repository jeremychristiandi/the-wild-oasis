import React from 'react'
import Stat from './Stat'
import { HiOutlineBriefcase, HiOutlineBanknotes, HiOutlineCalendarDays, HiOutlineChartBar } from "react-icons/hi2"
import { formatCurrency } from '../../utils/helpers'

export default function Stats({ bookings, confirmedStays, numOfDays, cabinCount }) {
    // 1. 
    const numBookings = bookings?.length
    // 2. 
    const sales = bookings?.reduce((acc, curr) => acc + curr.totalPrice, 0)
    // 3. 
    const checkins = confirmedStays?.length
    // 4.
    let occupation = confirmedStays?.reduce((acc, curr) => acc + curr.numNights, 0) / (numOfDays * cabinCount)
    occupation = String(Math.round(occupation * 100)) + "%"

    return (
        <>
            <Stat title="Bookings" color="blue" icon={<HiOutlineBriefcase />} value={numBookings} />
            <Stat title="Sales" color="green" icon={<HiOutlineBanknotes />} value={formatCurrency(sales)} />
            <Stat title="Check Ins" color="indigo" icon={<HiOutlineCalendarDays />} value={checkins} />
            <Stat title="Occupancy Rate" color="yellow" icon={<HiOutlineChartBar />} value={occupation} />
        </>
    )
}
