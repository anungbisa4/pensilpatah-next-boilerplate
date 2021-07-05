export default function HeaderContent ({icon, title, description}) {
  return (
    <div className="header-content flex items-center flex-auto">
      <div className="w-[33px] h-[33px] bg-blue-profile overflow-hidden flex justify-center items-center rounded-[0.438rem]">
        {icon}
      </div>
      <div className="ml-3 leading-none flex-grow">
        <h2 className="text-sm font-bold">{title}</h2>
        <p className="text-10px font-semibold text-gray-light-dark">{description}</p>
      </div>
    </div>
  );
} 