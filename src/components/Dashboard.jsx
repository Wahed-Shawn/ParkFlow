import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import AvailableSpots from "./AvailableSpots";
import VehicleQueue from "./VehicleQueue";
import BankersTable from "./BankersTable";
import ParkingLot from "./ParkingLot";
import SafeSequence from "./SafeSequence";
import { bankersAlgorithm } from "../algorithms/bankersAlgorithm";

const Dashboard = () => {
    const [result, setResult] = useState(null)
    const [displaySequence, setDisplaySequence] = useState([]);

    const [vehicles, setVehicles] = useState([
        {
            id: 1,
            name: "Car A",
            text_color: "#4F46E5",
            bg_color: "#C7D2FE",
            status: "Waiting",

            max: {
                c: 0,
                l: 0,
                e: 0,
            },

            allocation: {
                c: 1,
                l: 0,
                e: 1,
            },

            need: {
                c: 0,
                l: 0,
                e: 0,
            },
        },
        {
            id: 2,
            name: "Car B",
            text_color: "#059669",
            bg_color: "#c2fadd",
            status: "Waiting",

            max: {
                c: 0,
                l: 0,
                e: 0,
            },

            allocation: {
                c: 0,
                l: 1,
                e: 1,
            },

            need: {
                c: 0,
                l: 0,
                e: 0,
            },
        },
        {
            id: 3,
            name: "Car C",
            text_color: "#60A5FA",
            bg_color: "#C7D2FE",
            status: "Waiting",

            max: {
                c: 0,
                l: 0,
                e: 0,
            },

            allocation: {
                c: 1,
                l: 1,
                e: 1,
            },

            need: {
                c: 0,
                l: 0,
                e: 0,
            },
        },
        {
            id: 4,
            name: "Car D",
            text_color: "#D97706",
            bg_color: "#fef1be",
            status: "Waiting",

            max: {
                c: 0,
                l: 0,
                e: 0,
            },

            allocation: {
                c: 0,
                l: 1,
                e: 0,
            },

            need: {
                c: 0,
                l: 0,
                e: 0,
            },
        },
    ]);

    const [available] = useState({
        c: 2,
        l: 1,
        e: 2
    })


    const totalSlots = {
        c: 4,   
        l: 4,   
        e: 5,  
    };


    const [availableHistory, setAvailableHistory] = useState({});
    const [currentAvailable, setCurrentAvailable] = useState(available);


    const handleRun = () => {
        setVehicles((prev) =>
            prev.map((v) => ({
                ...v,
                status: "Waiting",
            }))
        );

        setDisplaySequence([]);
        setAvailableHistory({});
        setCurrentAvailable(available);

        const output = bankersAlgorithm(vehicles, available);
        setResult(output);

        if (!output.safe) {
            setVehicles((prev) =>
                prev.map((v) => ({
                    ...v,
                    status: "Blocked",
                }))
            );
            return;
        }

        output.safeSequence.forEach((processName, index) => {
            setTimeout(() => {
                setDisplaySequence((prev) => [...prev, processName]);
                setAvailableHistory((prev) => ({
                    ...prev,
                    [processName]: output.iterations[index].available,
                }));

                setVehicles((prev) =>
                    prev.map((vehicle) =>
                        vehicle.name === processName
                            ? { ...vehicle, status: "Running" }
                            : vehicle
                    )
                );

                setTimeout(() => {
                    setVehicles((prev) =>
                        prev.map((vehicle) =>
                            vehicle.name === processName
                                ? { ...vehicle, status: "Finished" }
                                : vehicle
                        )
                    );

                }, 1000);
                setCurrentAvailable(output.iterations[index].available);

            }, index * 1500);
        });
    };


    return (
        <div className="pt-[2.5rem] pb-2 grid grid-cols-12 grid-rows-12 h-full px-2">
            <div className="col-span-3 row-span-12 flex flex-col justify-between">
                <div className="h-[38%]">
                    <AvailableSpots currentAvailable={currentAvailable} totalSlots={totalSlots} />
                </div>

                <div className="h-[60%]">
                    <VehicleQueue
                        vehicles={vehicles}
                        setVehicles={setVehicles}
                    />
                </div>
            </div>

            <div className="col-span-6 row-span-12 flex flex-col justify-between">
                <div className="h-[50%] px-3">
                    <ParkingLot currentAvailable={currentAvailable} totalSlots={totalSlots} />
                </div>

                <div className="h-[50%] p-3">
                    <BankersTable vehicles={vehicles} availableHistory={availableHistory} />
                </div>
            </div>

            <div className="col-span-3 row-span-12">
                <div className="h-[40%]">
                    <SafeSequence result={result} displaySequence={displaySequence} />
                </div>
                <div className="h-[7%] mt-5  rounded-xl">
                    <Button onClick={handleRun} className="bg-[#4F46E5] h-full cursor-pointer font-bold w-full text-xl">Run</Button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;