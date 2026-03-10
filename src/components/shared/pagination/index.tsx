import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface AppPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function AppPagination({ page, totalPages, onPageChange }: AppPaginationProps) {
  const pages = [page - 1, page, page + 1].filter((p) => p >= 1 && p <= totalPages);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(Math.max(1, page - 1))}
            className={page === 1 ? "pointer-events-none opacity-40" : "cursor-pointer"}
          />
        </PaginationItem>

        {page > 2 && (
          <>
            <PaginationItem>
              <PaginationLink onClick={() => onPageChange(1)} className="cursor-pointer">
                1
              </PaginationLink>
            </PaginationItem>
            {page > 3 && <PaginationEllipsis />}
          </>
        )}

        {pages.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              onClick={() => onPageChange(p)}
              isActive={p === page}
              className="cursor-pointer"
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        {page < totalPages - 1 && (
          <>
            {page < totalPages - 2 && <PaginationEllipsis />}
            <PaginationItem>
              <PaginationLink onClick={() => onPageChange(totalPages)} className="cursor-pointer">
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            className={page === totalPages ? "pointer-events-none opacity-40" : "cursor-pointer"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
