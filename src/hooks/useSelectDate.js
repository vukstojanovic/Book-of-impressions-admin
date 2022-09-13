import { useReducer } from 'react'
import dayjs from 'dayjs'

const initialState = { dateFrom: '', dateTo: '', custom: false }

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'from_to':
      if (!payload.dateFrom || !payload.dateTo) {
        return { ...state }
      }
      return {
        ...state,
        dateFrom: payload.dateFrom,
        dateTo: payload.dateTo,
      }
    case 'changeDate':
      return {
        ...state,
        dateFrom: payload.dateFrom,
        dateTo: payload.dateTo,
        custom: false,
      }
    case 'custom':
      return {
        ...state,
        custom: true,
      }
    default:
      return state
  }
}
export const useSelectDate = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setTargetDate = (number, isMonth) => {
    if (isMonth) {
      return dayjs().subtract(number, 'month').format('YYYY-MM-DD')
    }
    return dayjs().subtract(number, 'day').format('YYYY-MM-DD')
  }

  const selectDateRange = ({ values, form }) => {
    const value = values[0]?.value
    const today = dayjs().add(1, 'day').format('YYYY-MM-DD')

    switch (value) {
      case 'today':
        dispatch({
          type: 'changeDate',
          payload: { dateFrom: setTargetDate(0), dateTo: today, selectDateValue: value },
        })
        form.resetFields(['pickedDate'])
        break
      case 'last_day':
        dispatch({
          type: 'changeDate',
          payload: {
            dateFrom: setTargetDate(1),
            dateTo: setTargetDate(0),
          },
        })
        form.resetFields(['pickedDate'])
        break
      case 'last_3_days':
        dispatch({
          type: 'changeDate',
          payload: {
            dateFrom: setTargetDate(3),
            dateTo: setTargetDate(0),
          },
        })
        form.resetFields(['pickedDate'])
        break
      case 'last_7_days':
        dispatch({
          type: 'changeDate',
          payload: {
            dateFrom: setTargetDate(7),
            dateTo: setTargetDate(0),
          },
        })
        form.resetFields(['pickedDate'])
        break
      case 'last_3_weeks':
        dispatch({
          type: 'changeDate',
          payload: {
            dateFrom: setTargetDate(21),
            dateTo: setTargetDate(0),
          },
        })
        form.resetFields(['pickedDate'])
        break
      case 'last_month':
        dispatch({
          type: 'changeDate',
          payload: {
            dateFrom: setTargetDate(1, 'month'),
            dateTo: setTargetDate(0),
          },
        })
        form.resetFields(['pickedDate'])
        break
      case 'custom':
        dispatch({ type: 'custom' })
        break
      default:
        if (values.length !== 0) {
          if (values[0].name[0] === 'pickedDate') {
            dispatch({
              type: 'from_to',
              payload: {
                dateFrom: value ? dayjs(value[0]?._d).format('YYYY-MM-DD') : '',
                dateTo: value ? dayjs(value[1]?._d).add(1, 'day').format('YYYY-MM-DD') : '',
              },
            })
          }
        }
        break
    }
  }

  return [selectDateRange, state]
}
