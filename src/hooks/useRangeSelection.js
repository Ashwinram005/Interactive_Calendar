import { isAfter, isBefore, isEqual } from 'date-fns'
import { useState } from 'react'

export function useRangeSelection() {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [hoverDate, setHoverDate] = useState(null)

  const collapseToSingle = () => {
    setEndDate(null)
    setHoverDate(null)
  }

  const resetRange = () => {
    setStartDate(null)
    setEndDate(null)
    setHoverDate(null)
  }

  const onDateClick = (date, allowRange = false) => {
    if (!allowRange) {
      setStartDate(date)
      setEndDate(null)
      setHoverDate(null)
      return
    }

    if (!startDate || (startDate && endDate)) {
      setStartDate(date)
      setEndDate(null)
      setHoverDate(null)
      return
    }

    if (isBefore(date, startDate)) {
      setEndDate(startDate)
      setStartDate(date)
      setHoverDate(null)
      return
    }

    if (isEqual(date, startDate)) {
      setEndDate(startDate)
      setHoverDate(null)
      return
    }

    setEndDate(date)
    setHoverDate(null)
  }

  const onDateHover = (date, allowRange = false) => {
    if (!allowRange) {
      setHoverDate(null)
      return
    }

    if (!startDate || endDate) {
      setHoverDate(null)
      return
    }

    setHoverDate(date)
  }

  const getPreviewRange = () => {
    if (!startDate || endDate || !hoverDate) {
      return { previewStart: null, previewEnd: null }
    }

    if (isAfter(hoverDate, startDate)) {
      return { previewStart: startDate, previewEnd: hoverDate }
    }

    return { previewStart: hoverDate, previewEnd: startDate }
  }

  return {
    startDate,
    endDate,
    hoverDate,
    onDateClick,
    onDateHover,
    getPreviewRange,
    resetRange,
    collapseToSingle,
  }
}
