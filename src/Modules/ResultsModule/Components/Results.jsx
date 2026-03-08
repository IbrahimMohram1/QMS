import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

export default function Results() {
  return (
    <>
      <div className="w-11/12 mx-auto">
        <div className="flex justify-between items-center mt-5">
          <h1 className="text-2xl font-bold">Closed Quizzes</h1>

          <div className="relative md:w-1/3 w-full ">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={22}
            />

            <Input
              className="w-full py-6 pl-10 rounded-full border border-gray-300 placeholder:text-black placeholder:text-lg"
              placeholder="Search By Name"
              onChange={(e) => {}}
            />
          </div>
        </div>

        {/* <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table> */}
      </div>
    </>
  );
}
