
import React from 'react'
import "./_setting_item.scss";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SettingItem = ({title = "", description = "", ext = "", children, to = "#" }) => {
    return (
        <Link className='setting__item__wrapper' to={to}>
            <div className='setting__item__desc'>
                <div className='setting__item__icon'>
                    {children}
                </div>
                <div className='setting__item__detail'>
                    <h4>{title}</h4>
                    <p>{description}</p>
                </div>
            </div>
            <p className='setting__item__ext'>{ext}</p>
        </Link>
    )
}

SettingItem.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    ext: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    to: PropTypes.string
}

export default SettingItem
