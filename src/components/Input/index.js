import React from 'react'
import PropTypes from 'prop-types'
import { InputBase } from './styles'


export default function Input({ onChange, placeholder, ...props }) {
    return (
        <div>
            <InputBase 
                placeholder={placeholder}
                onChange={onChange}  
                {...props}
            />
        </div>
    )
}

Input.defaultProps = {
    value: ''
}

Input.propTypes = {
    inputName: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
}