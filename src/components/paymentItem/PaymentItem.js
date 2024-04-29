import React, { useEffect, useState } from 'react';
import useMainService from '../../services/MainService';

const PaymentItem = ({ id, meter, status }) => {
    const [rate, setRate] = useState({});
    const { getRateById } = useMainService();

    useEffect(() => {
        getRateById(id)
            .then(data => {
                setRate(data)
            })
            .catch(err => console.log(err));
    }, [id]);

    return (
        <div className={"payment__item" + (status == 2 ? " expired" : "")}>
            <div className="payment__title">{rate.name}</div>
            <div className="payment__price">{(parseInt(rate.price) * parseFloat(meter)).toFixed(2)} ₸</div>
        </div>
    );
};

export default PaymentItem;