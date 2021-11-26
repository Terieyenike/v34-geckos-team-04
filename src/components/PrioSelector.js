const PrioSelector = (props) => {
  return (
    <div className='absolute bg-gray-600 rounded-xl p-6 left-4 top-0 z-50'>
      <span className='absolute bg-gray-600 w-3 h-3 -left-1 top-4 transform rotate-45'></span>
      <ul className='flex flex-col space-y-4'>
        <li
          className='text-prioHigh cursor-pointer hover:underline'
          onClick={() => {
            props.setPrio('high');
            props.setPrioSelector(false);
          }}
        >
          High Priority
        </li>
        <li
          className='text-prioMedium cursor-pointer hover:underline'
          onClick={() => {
            props.setPrio('medium');
            props.setPrioSelector(false);
          }}
        >
          Mid Priority
        </li>
        <li
          className='text-prioLow cursor-pointer hover:underline'
          onClick={() => {
            props.setPrio('low');
            props.setPrioSelector(false);
          }}
        >
          Low Priority
        </li>
      </ul>
    </div>
  );
};
export default PrioSelector;
