const VehicleDetails = ({ vehicle }) => {
  return (
    <div className="vehicle-details">
      <p>
        <strong>Make: </strong>
        {vehicle.make}
      </p>
      <p>
        <strong>Model: </strong>
        {vehicle.model}
      </p>
      <p>
        <strong>Color: </strong>
        {vehicle.color}
      </p>
      <p>
        <strong>Year: </strong>
        {vehicle.year}
      </p>
      <p>
        <strong>Chassis: </strong>
        {vehicle.chassis}
      </p>
      <p>
        <strong>Register: </strong>
        {vehicle.register}
      </p>
      <p>
        <strong>Mileage: </strong>
        {vehicle.mileage}
      </p>
      <p>
        <strong>Status: </strong>
        {vehicle.status}
      </p>
      <p>
        <strong>Cost per day: </strong>
        {vehicle.costPerDay}
      </p>
      <p>
        <strong>Last Service Date: </strong>
        {vehicle.lastServiceDate}
      </p>
      <p>
        <strong>Image: </strong>
        {vehicle.imageUrl}
      </p>
    </div>
  );
};

export default VehicleDetails;
