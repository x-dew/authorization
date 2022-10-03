import React, {useState} from 'react'

export const usePagination = () => {
    const [params, setParams] = useState({
        count: 0,
        amount: 0,
        offset: 0,
        page: 1,
        limit: 4,
    })

    const amountChange = (amount) => {
        setParams({...params, amount: amount, count: Math.ceil(amount / params.limit)})
    }

    const pageChange = (e, page) => {
        setParams({
            ...params,
            page: params.page !== 1 ? page : '',
            offset: (page - 1) * params.limit
        })
    }

    return {...params, pageChange, amountChange}
}