import { Table, TableBody } from "@/components/ui/table";
import { TableSkeletonRow } from "@/helpers/TableSkeletonRow";

const UserBookingSkeleton = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="shadow-lg p-4 bg-white rounded-md animate-pulse"
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
                <div className="h-6 w-32 bg-gray-300 rounded"></div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
                <div className="h-6 w-24 bg-gray-300 rounded"></div>
              </div>
              <div className="h-6 w-36 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
      <Table className="mt-8">
        <TableBody>
          <TableSkeletonRow cellLength={4} rowLength={2} />
        </TableBody>
      </Table>
    </div>
  );
};
export default UserBookingSkeleton;
