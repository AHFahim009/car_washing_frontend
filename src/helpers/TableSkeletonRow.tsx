import { TableCell, TableRow } from "@/components/ui/table";

export const TableSkeletonRow = ({
  rowLength = 5,
  cellLength = 5,
}: {
  rowLength?: number;
  cellLength?: number;
}) => (
  <>
    {[...Array(rowLength)].map((_, rowIndex) => (
      <TableRow key={rowIndex}>
        {[...Array(cellLength)].map((_, cellIndex) => (
          <TableCell key={cellIndex}>
            <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
          </TableCell>
        ))}
      </TableRow>
    ))}
  </>
);
