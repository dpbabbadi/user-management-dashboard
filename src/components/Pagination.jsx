import { PAGE_SIZES } from "../utils/constants";

export default function Pagination({
  total,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const canPrev = page > 1;
  const canNext = page < pageCount;

  // Keep page buttons compact
  const start = Math.max(1, page - 2);
  const end = Math.min(pageCount, page + 2);
  const pages = [];
  for (let p = start; p <= end; p++) pages.push(p);

  return (
    <div className="pagination">
      <div className="pagination-left">
        <span className="muted">
          Total: <b>{total}</b>
        </span>

        <select
          className="input small"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          {PAGE_SIZES.map((s) => (
            <option key={s} value={s}>
              {s}/page
            </option>
          ))}
        </select>
      </div>

      <div className="pagination-right">
        <button className="btn small" disabled={!canPrev} onClick={() => onPageChange(1)}>
          {"<<"}
        </button>
        <button className="btn small" disabled={!canPrev} onClick={() => onPageChange(page - 1)}>
          Prev
        </button>

        {start > 1 && <span className="muted">…</span>}
        {pages.map((p) => (
          <button
            key={p}
            className={`btn small ${p === page ? "primary" : ""}`}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        ))}
        {end < pageCount && <span className="muted">…</span>}

        <button className="btn small" disabled={!canNext} onClick={() => onPageChange(page + 1)}>
          Next
        </button>
        <button className="btn small" disabled={!canNext} onClick={() => onPageChange(pageCount)}>
          {">>"}
        </button>
      </div>
    </div>
  );
}