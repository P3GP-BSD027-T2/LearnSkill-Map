import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AdminCoursesTable() {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">No</TableHead>
            <TableHead className="font-semibold">Title</TableHead>
            <TableHead className="font-semibold">Price</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Price</TableHead>
            <TableHead className="font-semibold">Action</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    </>
  );
}
