import { CarFront, SquareParking } from "lucide-react";

const ParkingLot = ({ available, totalSlots }) => {

    const slots = [];

    const createSlots = (type, total, free) => {
        const occupied = total - free;

        for (let i = 0; i < occupied; i++) {
            slots.push({
                type,
                occupied: true,
            });
        }

        for (let i = occupied; i < total; i++) {
            slots.push({
                type,
                occupied: false,
            });
        }
    };

    createSlots("C", totalSlots.c, available.c);
    createSlots("L", totalSlots.l, available.l);
    createSlots("E", totalSlots.e, available.e);

    return (
        <div className="h-full bg-[#5C6C7B] rounded-xl border shadow-sm p-5 text-white">

            <h2 className="text-xl font-bold text-center mb-5">
                Parking Lot
            </h2>

            <div className="grid grid-cols-5 gap-4">

                {slots.map((slot, index) => (
                    <div
                        key={index}
                        className={`
                            h-20 rounded-xl border-2
                            flex flex-col items-center justify-center
                            transition-all duration-300 text-black
                            ${slot.occupied
                                ? "bg-red-100 border-red-400"
                                : "bg-green-100 border-green-400"
                            }
                        `}
                    >
                        <CarFront
                            size={28}
                            className={
                                slot.occupied
                                    ? "text-red-600"
                                    : "text-green-600"
                            }
                        />

                        <span className="font-bold mt-1">
                            {slot.type}
                        </span>

                        <span className="text-xs text-slate-500">
                            {slot.occupied ? "Occupied" : "Free"}
                        </span>
                    </div>
                ))}

            </div>

            <div className="flex justify-center gap-8 mt-6 text-sm">

                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-green-400"></div>
                    Free
                </div>

                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-red-400"></div>
                    Occupied
                </div>

            </div>

        </div>
    );
};

export default ParkingLot;