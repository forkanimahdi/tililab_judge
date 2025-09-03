"use client";

export default function JudgesTab({ evaluations }) {
    return (
        <div className="overflow-x-auto mt-6">
            <table className="w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 text-left">Juge</th>
                        <th className="p-3 text-center">Motivation</th>
                        <th className="p-3 text-center">Implication</th>
                        <th className="p-3 text-center">Originalité</th>
                        <th className="p-3 text-center">Communication</th>
                        <th className="p-3 text-center">Total</th>
                        <th className="p-3 text-center">Décision</th>
                    </tr>
                </thead>
                <tbody>
                    {evaluations.map((e, i) => (
                        <tr key={i} className="border-t border-gray-200">
                            <td className="p-3">{e.user.name}</td>
                            <td className="p-3 text-center">{e.motivation}/5</td>
                            <td className="p-3 text-center">{e.implication}/5</td>
                            <td className="p-3 text-center">{e.originalite}/5</td>
                            <td className="p-3 text-center">{e.communication}/5</td>
                            <td className="p-3 text-center font-bold">{e.motivation + e.implication + e.originalite + e.communication}/20</td>
                            <td className="p-3 text-center">{e.decision}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
