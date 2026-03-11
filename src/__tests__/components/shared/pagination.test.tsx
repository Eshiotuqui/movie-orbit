import { render, screen, fireEvent } from "@testing-library/react";
import { AppPagination } from "@/components/shared/pagination";

describe("AppPagination", () => {
  const onPageChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("marks the current page link as active with aria-current=page", () => {
    render(<AppPagination page={3} totalPages={10} onPageChange={onPageChange} />);

    const pageLink = screen.getByText("3").closest("a");
    expect(pageLink).toHaveAttribute("aria-current", "page");
  });

  it("calls onPageChange with page - 1 when clicking Anterior", () => {
    render(<AppPagination page={5} totalPages={10} onPageChange={onPageChange} />);

    fireEvent.click(screen.getByText("Anterior"));

    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it("calls onPageChange with page + 1 when clicking Próximo", () => {
    render(<AppPagination page={5} totalPages={10} onPageChange={onPageChange} />);

    fireEvent.click(screen.getByText("Próximo"));

    expect(onPageChange).toHaveBeenCalledWith(6);
  });

  it("does not go below page 1 when clicking Anterior on page 1", () => {
    render(<AppPagination page={1} totalPages={5} onPageChange={onPageChange} />);

    fireEvent.click(screen.getByText("Anterior"));

    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it("does not go above totalPages when clicking Próximo on last page", () => {
    render(<AppPagination page={5} totalPages={5} onPageChange={onPageChange} />);

    fireEvent.click(screen.getByText("Próximo"));

    expect(onPageChange).toHaveBeenCalledWith(5);
  });

  it("shows page 1 shortcut when current page is far from start", () => {
    render(<AppPagination page={8} totalPages={10} onPageChange={onPageChange} />);

    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("shows last page shortcut when current page is far from end", () => {
    render(<AppPagination page={2} totalPages={10} onPageChange={onPageChange} />);

    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("navigates to page 1 when clicking the page 1 shortcut", () => {
    render(<AppPagination page={9} totalPages={10} onPageChange={onPageChange} />);

    fireEvent.click(screen.getByText("1"));

    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it("navigates to the last page when clicking the last page shortcut", () => {
    render(<AppPagination page={2} totalPages={10} onPageChange={onPageChange} />);

    fireEvent.click(screen.getByText("10"));

    expect(onPageChange).toHaveBeenCalledWith(10);
  });
});
