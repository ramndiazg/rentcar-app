const UserDetails = ({user}) => {
    return (
        <div className="user-details">
            <p><strong>FirstName: </strong>{user.firstName}</p>
            <p><strong>LastName: </strong>{user.lastName}</p>
            <p><strong>Phone: </strong>{user.phone}</p>
            <p><strong>Email: </strong>{user.email}</p>
            <p><strong>Role: </strong>{user.role}</p>
        </div>

    )
}

export default UserDetails
