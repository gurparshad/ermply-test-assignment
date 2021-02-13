import React from 'react'
import './VatDetails.css'

export default function VatDetails({details}) {
    return (
        <div className="vatDetails">
            <p>Country Code: <span>{details.CountryCode}</span></p>
            <p>VAT Number: <span>{details.VATNumber}</span></p>
            <p>Name: <span>{details.Name}</span></p>
            <p>Address: <span>{details.Address}</span></p>
        </div>
    )
}
