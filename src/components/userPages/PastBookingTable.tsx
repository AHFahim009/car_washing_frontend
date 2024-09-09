/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function PastBooking({ pastBooking }: { pastBooking: any[] }) {
  if (pastBooking.length === 0) {
    return (
      <div className="text-center p-4">
        <p className="text-lg font-semibold text-gray-500">
          No service data available.
        </p>
      </div>
    );
  }

  return (
    <section className="mt-8 mb-8 ">
      <h1 className="text-2xl font-bold my-5">Past Bookings</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Service Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pastBooking.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.service.name}</TableCell>
              <TableCell>{item.slot.date}</TableCell>
              <TableCell>{`${item.slot.startTime} - ${item.slot.endTime}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
