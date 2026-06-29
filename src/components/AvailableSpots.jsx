import { Badge } from "@/components/ui/badge"
import { Car, EvCharger, Van } from "lucide-react";

const AvailableSpots = ({available}) => {
    return (
        <div className='h-full bg-white rounded-xl relative '>
            {/* <h1 className='text-[10px]'>Available Parking Spots</h1> */}
            <Badge variant="default" className="absolute -rotate-90 top-1/2 -translate-x-1/2 ">Available Parking Spots</Badge>
            <div className="grid grid-rows-3 gap-3 h-full p-4 rounded-xl text-[#334155] font-semibold">
                <div className="bg-[#EEF2FF] rounded-sm flex justify-between items-center p-3">
                    <div className="flex items-center gap-2">
                        <div className="flex justify-center items-center h-[2.5rem] w-[2.5rem] rounded-sm text-[#4F46E5] bg-[#E0E7FF]"><Car /></div>
                        <p>Compact</p>
                    </div>
                    <p><span className="text-xl text-[#4F46E5]">{available.c}</span></p>
                </div>

                <div className="bg-[#ECFDF5] rounded-sm flex justify-between items-center p-3">
                    <div className="flex items-center gap-2">
                        <div className="flex justify-center items-center h-[2.5rem] w-[2.5rem] rounded-sm text-[#059669] bg-[#D1FAE5] "><Van /></div>
                        <p>Large</p>
                    </div>
                    <p><span className="text-xl text-[#059669]">{available.l}</span></p>
                </div>

                <div className="bg-[#FFFBEB] rounded-sm flex justify-between items-center p-3">
                    <div className="flex items-center gap-2">
                        <div className="flex justify-center items-center h-[2.5rem] w-[2.5rem] rounded-sm text-[#D97706] bg-[#FEF3C7]"><EvCharger /></div>
                        <p>EV</p>
                    </div>
                    <p><span className="text-xl text-[#D97706]">{available.e}</span></p>
                </div>
            </div>
        </div>
    );
};

export default AvailableSpots;