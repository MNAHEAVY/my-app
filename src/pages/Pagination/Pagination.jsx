import "./Pagination.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { GrNext, GrPrevious } from "react-icons/gr";

export default function Pagination({
  currentPage,
  postPerPage,
  totalPosts,
  paginate,
}) {
  const maxButtons = 5;
  const pages = [];
  const totalPages = Math.ceil(totalPosts / postPerPage);

  let startPage = 1;
  let endPage = totalPages;

  if (totalPages > maxButtons) {
    const halfButtons = Math.floor(maxButtons / 2);

    if (currentPage <= halfButtons) {
      endPage = maxButtons;
    } else if (currentPage + halfButtons >= totalPages) {
      startPage = totalPages - maxButtons + 1;
    } else {
      startPage = currentPage - halfButtons;
      endPage = currentPage + halfButtons;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="Pagination">
      <ul>
        {currentPage > 1 && (
          <li className="pagItem" onClick={() => paginate(currentPage - 1)}>
            <GrPrevious />
          </li>
        )}
        {pages.map((page) => (
          <li
            key={page}
            className={`pagItem ${page === currentPage ? "active" : ""}`}
            onClick={() => paginate(page)}
          >
            {page}
          </li>
        ))}
        {currentPage < totalPages && (
          <li className="pagItem" onClick={() => paginate(currentPage + 1)}>
            <GrNext />
          </li>
        )}
      </ul>
    </div>
  );
}
