const ErrorMessages = ({errorMessages}) => {

  if (!errorMessages ||errorMessages.length === 0) return null;

  return (
    <div className="mb-6 p-4 bg-accent/10 border border-accent rounded-md">
      <ul className="list-disc pl-5 space-y-1">
        {errorMessages.map((errorMsg, index) => (
          <li key={index} className="text-accent text-sm">
            {errorMsg}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ErrorMessages