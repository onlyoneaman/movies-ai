type PaginationComponentProps = {
  pageSize: number;
  setPageSize: (pageSize: number) => void;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  load: boolean;
  totalPages: number;
}

const PAGE_SIZE_OPTIONS = [10, 20, 50];

const PaginationComponent = (
  {
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
    totalPages
  }: PaginationComponentProps
) => {
  const pageNumbers = [];
  for(let i = 1; i <= totalPages; i++) {
    if(i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
      pageNumbers.push(i);
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(event.target.value));
  };

  return (
    <div className={"flex py-3"}>
      <select
        className={"mx-1 px-2 py-1 rounded-md border border-gray-300 hover:bg-gray-200 bg-gray-300"}
        value={pageSize}
        onChange={handlePageSizeChange}
      >
        {
          PAGE_SIZE_OPTIONS.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))
        }
      </select>
      {pageNumbers.map((page, index, array) => (
        <div key={page.toString()}>
          <button
            className={`
            mx-1 px-2 py-1 rounded-md border border-gray-300 hover:bg-gray-200 bg-gray-300
            ${page === currentPage ? "bg-gray-400 cursor-not-allowed" : ""}
            `}
            onClick={() => handlePageChange(page)}
            disabled={page === currentPage}
          >
            {page}
          </button>
          {(array[index + 1] - page > 1) && <span>...</span>}
        </div>
      ))}
    </div>
  )
};

export default PaginationComponent;
