import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Link, router } from '@inertiajs/react';
import { User, MoreVertical, Edit2, Trash2 } from 'lucide-react';

const CondidateCard = ({ condidat, onEdit, onDelete }) => {

    const getStepBadge = (step) => {
        switch (step) {
            case 'pending':
                return 'bg-[#f2f2f2] text-[#212529]';
            case 'accepté':
                return 'bg-[#00C851] text-white';
            case 'refusé':
                return 'bg-[#ff4444] text-white';
            default:
                return 'bg-[#212529] text-white';
        }
    };

    return (
        <Card
            onClick={() => router.visit(`/candidates/${condidat.id}`)}
            className="border rounded-lg hover:shadow-xl transition-all cursor-pointer duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-[1.02] bg-white h-full flex flex-col overflow-hidden relative"
        >
            <div className="relative">
                {condidat.image ? (
                    <img
                        src={'/storage/' + condidat.image}
                        className="h-[45vh] w-full object-cover bg-top rounded-t-lg"
                        alt={condidat.name}
                    />
                ) : (
                    <div className="h-[45vh] w-full bg-gray-100 flex items-center justify-center rounded-t-lg">
                        <User className="h-12 w-12 text-gray-400" />
                    </div>
                )}

                {/* Badge */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <Badge className={`${getStepBadge(condidat?.final_decision)} rounded-lg text-xs font-medium w-fit`}>
                        {condidat?.final_decision?.replaceAll('_', ' ') || 'Unknown'}{(condidat.gender == "F" && condidat.final_decision != "discuter") && "e"}
                    </Badge>
                </div>

                {/* Three-dot dropdown */}
                {/* <div className="absolute top-3 right-3">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="sm" className="p-1">
                                <MoreVertical className="w-5 h-5" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent align="end" className="w-32 p-2">
                            <Button variant="ghost" size="sm" className="w-full justify-start gap-2" onClick={() => onEdit(condidat)}>
                                <Edit2 className="w-4 h-4" /> Edit
                            </Button>
                            <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-destructive" onClick={() => onDelete(condidat)}>
                                <Trash2 className="w-4 h-4" /> Delete
                            </Button>
                        </PopoverContent>
                    </Popover>
                </div> */}
            </div>

            <CardContent className="p-4 flex-1 flex flex-col cursor-pointer" >
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#212529] mb-3 line-clamp-2">
                        {condidat?.name || 'Unknown Participant'}
                    </h3>
                </div>
            </CardContent>
        </Card>
    );
};

export default CondidateCard;
