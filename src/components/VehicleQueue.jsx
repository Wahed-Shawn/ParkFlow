import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CarFront } from "lucide-react";
import { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const VehicleQueue = ({ vehicles, setVehicles }) => {
    const [open, setOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    const [form, setForm] = useState({
        compact: "",
        large: "",
        ev: "",
    });

    const handleConfigure = (vehicle) => {
        setSelectedVehicle(vehicle);

        // Load previously saved values
        // setForm({
        //     compact: vehicle.max.c,
        //     large: vehicle.max.l,
        //     ev: vehicle.max.e,
        // });

        setOpen(true);
    };

    const handleSave = () => {
        if (!selectedVehicle) return;

        const maxNeed = {
            c: Number(form.compact),
            l: Number(form.large),
            e: Number(form.ev),
        };

        setVehicles((prevVehicles) =>
            prevVehicles.map((vehicle) =>
                vehicle.id === selectedVehicle.id
                    ? {
                        ...vehicle,
                        max: maxNeed,
                        need: {
                            c: maxNeed.c - vehicle.allocation.c,
                            l: maxNeed.l - vehicle.allocation.l,
                            e: maxNeed.e - vehicle.allocation.e,
                        },
                    }
                    : vehicle
            )
        );

        setOpen(false);
    };

    return (
        <div className="h-full bg-white rounded-xl relative">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Configure {selectedVehicle?.name}
                        </DialogTitle>

                        <DialogDescription>
                            Enter the maximum resource requirement.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-2">
                        <div className="grid grid-cols-2 items-center gap-4">
                            <Label>Compact (C)</Label>

                            <Input
                                type="number"
                                min={0}
                                value={form.compact}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        compact: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="grid grid-cols-2 items-center gap-4">
                            <Label>Large (L)</Label>

                            <Input
                                type="number"
                                min={0}
                                value={form.large}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        large: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="grid grid-cols-2 items-center gap-4">
                            <Label>EV (E)</Label>

                            <Input
                                type="number"
                                min={0}
                                value={form.ev}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        ev: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>

                        <Button onClick={handleSave}>
                            Save
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Badge
                variant="default"
                className="absolute -rotate-90 top-1/2 -translate-x-1/2"
            >
                Vehicle Queue (Processes)
            </Badge>

            <div className="grid grid-rows-4 gap-3 h-full p-4 rounded-xl text-[#334155] font-semibold">
                {vehicles.map((vehicle) => (
                    <div
                        key={vehicle.id}
                        className="bg-gray-100 rounded-sm flex justify-between items-center p-3"
                    >
                        <div className="flex items-center gap-2">
                            <div
                                style={{ color: vehicle.text_color }}
                                className="flex justify-center items-center h-[3rem] w-[3rem] rounded-sm bg-white"
                            >
                                <CarFront />
                            </div>

                            <div className="text-sm">
                                <p>{vehicle.name}</p>

                                <p className="text-[#64748B] font-normal">
                                    {vehicle.status}
                                </p>
                            </div>
                        </div>

                        <Button
                            onClick={() => handleConfigure(vehicle)}
                            style={{
                                color: vehicle.text_color,
                                backgroundColor: vehicle.bg_color,
                            }}
                            className="cursor-pointer"
                        >
                            Configure
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VehicleQueue;