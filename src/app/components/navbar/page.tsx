export default function NavBar() {
  return (
    <nav className='flex h-16 bg-white text-black px-4'>
      <div className='flex justify-items-start items-center text-lg font-bold'>
        SWR EXAMPLE
      </div>
      <div className='ml-auto flex items-center'>
        <ul className='flex space-x-4'>
          <li>
            <button
              type='button'
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
            >
              <a href='/' className='hover:text-gray-300'>
                Home
              </a>
            </button>
          </li>
          <li>
            <button
              type='button'
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
            >
              <a href='/latest-weather' className='hover:text-gray-300'>
                Latest Weather
              </a>
            </button>
          </li>
          <li>
            <button
              type='button'
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
            >
              <a href='/random-joke' className='hover:'>
                Random Joke
              </a>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
