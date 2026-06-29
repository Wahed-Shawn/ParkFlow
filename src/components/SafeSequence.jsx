import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";

const SafeSequence = ({ result, displaySequence }) => {

    if (!result) {
        return (
            <Card className="h-full flex items-center justify-center">
                <p className="text-slate-500">
                    Click Run to execute the algorithm.
                </p>
            </Card>
        );
    }
    const { safe } = result;


    return (
        <Card className="h-full">

            <CardHeader className="flex flex-row justify-between items-center">

                <CardTitle>
                    Safe Sequence
                </CardTitle>

                <Badge
                    className={
                        safe
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    }
                >
                    {safe ? "SAFE" : "DEADLOCK"}
                </Badge>

            </CardHeader>

            <CardContent className="space-y-6">

                <div className="flex flex-wrap items-center gap-2">

                    {safe &&
                        displaySequence.map((process, index) => (
                            <div
                                key={process}
                                className="flex items-center gap-2 animate-in fade-in zoom-in duration-500"
                            >
                                <Badge
                                    variant="secondary"
                                    className="h-[3rem] w-[3rem] rounded-xl"
                                >
                                    {process}
                                </Badge>

                                {index !== displaySequence.length - 1 && (
                                    <span className="text-slate-400 text-lg">
                                        →
                                    </span>
                                )}
                            </div>
                        ))}

                </div>

                {safe ? (
                    <div className="flex items-start gap-3 text-green-700">

                        <CheckCircle2 size={22} />

                        <div>

                            <p className="font-semibold">
                                System is Safe
                            </p>

                            <p className="text-sm text-slate-500">
                                All processes can complete without deadlock.
                            </p>

                        </div>

                    </div>
                ) : (
                    <div className="flex items-start gap-3 text-red-700">

                        <XCircle size={22} />

                        <div>

                            <p className="font-semibold">
                                Deadlock Detected
                            </p>

                            <p className="text-sm text-slate-500">
                                No safe sequence exists.
                            </p>

                        </div>

                    </div>
                )}

            </CardContent>

        </Card>
    );
};

export default SafeSequence;