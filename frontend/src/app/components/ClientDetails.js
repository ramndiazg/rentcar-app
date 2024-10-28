const ClientDetails = ({client}) => {
    return (
        <div className="client-details">
            <p><strong>FirstName: </strong>{client.firstName}</p>
            <p><strong>LastName: </strong>{client.lastName}</p>
            <p><strong>Phone: </strong>{client.phone}</p>
            <p><strong>Email: </strong>{client.email}</p>
            <p><strong>Address: </strong>{client.address}</p>
            <p><strong>Membership Status: </strong>{client.membershipStatus}</p>
            <p><strong>Preferred Payment Method: </strong>{client.preferredPaymentMethod}</p>
        </div>

    )
}

export default ClientDetails
