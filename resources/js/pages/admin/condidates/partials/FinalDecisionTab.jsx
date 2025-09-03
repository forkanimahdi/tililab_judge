"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

export default function FinalDecisionTab({ onDecision }) {
    return (
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Button onClick={() => onDecision("accepté")} className="flex items-center gap-2 bg-primary text-white w-full sm:w-auto">
                <CheckCircle className="w-4 h-4" /> Accepter
            </Button>
            <Button onClick={() => onDecision("refusé")} variant="destructive" className="flex items-center gap-2 w-full sm:w-auto">
                <XCircle className="w-4 h-4" /> Refuser
            </Button>
        </div>
    );
}
