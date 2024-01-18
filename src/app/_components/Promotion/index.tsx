'use client'

import { useEffect, useMemo, useState } from 'react'

import classes from './index.module.scss'

export default function Promotion() {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const targetDate = useMemo(() => {
    const date = new Date()
    date.setDate(date.getDate() + 7)
    return date
  }, [])

  useEffect(() => {
    const updateTimer = () => {
      const currentDate = new Date()
      const timeDifference = targetDate.getTime() - currentDate.getTime()

      // Check if the target date has been reached
      if (timeDifference <= 0) {
        clearInterval(timerInterval)
        // You may perform any action or logic when the target date is reached
        console.log('Target date reached!')
      } else {
        // Calculate remaining time in seconds, minutes, hours, and days
        const seconds = Math.floor((timeDifference / 1000) % 60)
        const minutes = Math.floor((timeDifference / 1000 / 60) % 60)
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24)
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

        // Update the timer state
        setTime({ days, hours, minutes, seconds })
      }
    }

    // Call the updateTimer function every second
    const timerInterval = setInterval(updateTimer, 1000)

    // Clean up the interval when the component unmounts
    return () => clearInterval(timerInterval)
  }, [time, targetDate])
  return (
    <section className={classes.promotion}>
      <div className={classes.textBox}>
        <h3 className={classes.title}>Deals of the Month</h3>
        <p>
          Get ready for a shopping experience like never before with our Deals of the Month! Every
          purchase comes with exclusive perks and offers, making this month a celebration of savvy
          choices and amazing deals. Don't miss out! 🎁🛒
        </p>
        <ul className={classes.stats}>
          <StatBox label="Days" value={time.days} />
          <StatBox label="Hours" value={time.hours} />
          <StatBox label="Minutes" value={time.minutes} />
          <StatBox label="Seconds" value={time.seconds} />
        </ul>
      </div>
    </section>
  )
}

function StatBox({ label, value }: { label: string; value: number }) {
  return (
    <li className={classes.statBox}>
      <h4>{label}</h4>
      <p>{value}</p>
    </li>
  )
}
