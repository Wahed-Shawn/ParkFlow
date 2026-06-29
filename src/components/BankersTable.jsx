import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";


const BankersTable = ({ vehicles, availableHistory }) => {
    const statusStyles = {
        Waiting: "bg-slate-200 text-slate-700",
        Running: "bg-blue-100 text-blue-700",
        Finished: "bg-green-100 text-green-700",
        Blocked: "bg-red-100 text-red-700",
    };

    return (
        <div className="h-full bg-white rounded-xl p-5 shadow-sm border">

            <h2 className="text-lg font-bold text-slate-800 text-center mb-2 underline underline-offset-4">
                Banker's Algorithm Table
            </h2>

            <Table>
                <TableHeader>

                    <TableRow>
                        <TableHead rowSpan={2} className="text-center">
                            Process
                        </TableHead>

                        <TableHead colSpan={3} className="text-center">
                            Maximum
                        </TableHead>

                        <TableHead colSpan={3} className="text-center">
                            Allocation
                        </TableHead>

                        <TableHead colSpan={3} className="text-center">
                            Need
                        </TableHead>

                        <TableHead colSpan={3} className="text-center">
                            Available
                        </TableHead>

                        <TableHead rowSpan={2} className="text-center">
                            Status
                        </TableHead>
                    </TableRow>

                    <TableRow>
                        <TableHead className="text-center">C</TableHead>
                        <TableHead className="text-center">L</TableHead>
                        <TableHead className="text-center">E</TableHead>

                        <TableHead className="text-center">C</TableHead>
                        <TableHead className="text-center">L</TableHead>
                        <TableHead className="text-center">E</TableHead>

                        <TableHead className="text-center">C</TableHead>
                        <TableHead className="text-center">L</TableHead>
                        <TableHead className="text-center">E</TableHead>

                        <TableHead className="text-center">C</TableHead>
                        <TableHead className="text-center">L</TableHead>
                        <TableHead className="text-center">E</TableHead>
                    </TableRow>

                </TableHeader>

                <TableBody>

                    {vehicles.map((vehicle) => {
                        const available = availableHistory[vehicle.name];
                        return (<TableRow key={vehicle.id}>

                            <TableCell className="font-medium">
                                {vehicle.name}
                            </TableCell>

                            {/* Maximum */}
                            <TableCell className="text-center">{vehicle.max.c}</TableCell>
                            <TableCell className="text-center">{vehicle.max.l}</TableCell>
                            <TableCell className="text-center">{vehicle.max.e}</TableCell>

                            {/* Allocation */}
                            <TableCell className="text-center">{vehicle.allocation.c}</TableCell>
                            <TableCell className="text-center">{vehicle.allocation.l}</TableCell>
                            <TableCell className="text-center">{vehicle.allocation.e}</TableCell>

                            {/* Need */}
                            <TableCell className="text-center">{vehicle.need.c}</TableCell>
                            <TableCell className="text-center">{vehicle.need.l}</TableCell>
                            <TableCell className="text-center">{vehicle.need.e}</TableCell>

                            <TableCell className="text-center">
                                {available ? available.c : "-"}
                            </TableCell>

                            <TableCell className="text-center">
                                {available ? available.l : "-"}
                            </TableCell>

                            <TableCell className="text-center">
                                {available ? available.e : "-"}
                            </TableCell>

                            <TableCell className="text-center">
                                <Badge className={statusStyles[vehicle.status]}>
                                    {vehicle.status}
                                </Badge>
                            </TableCell>

                        </TableRow>)
                    })}

                </TableBody>
            </Table>

            {/* <div className="mt-5 border rounded-lg p-3 bg-slate-50">
                <h3 className="font-semibold mb-2">
                    Available Resources
                </h3>

                <div className="flex gap-8">
                    <p>
                        <span className="font-bold">C:</span> {currentAvailable.c}
                    </p>

                    <p>
                        <span className="font-bold">L:</span> {currentAvailable.l}
                    </p>

                    <p>
                        <span className="font-bold">E:</span> {currentAvailable.e}
                    </p>
                </div>
            </div> */}

        </div>
    );
};

export default BankersTable;