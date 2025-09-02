import {useEffect, useState} from "react";
import {fetchCampaigns} from "../api/campaignsAPI"


export default function Campaigns() {

    const [campaigns, setCampaigns] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchCampaigns({page, pageSize: 5, sort: "id", order: "desc"})
            .then((data) => setCampaigns(data))
            .catch((err) => console.error(err));
    }, [page]);

    return (
        <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
            <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
                <h2 className="font-semibold text-gray-800 dark:text-gray-100">Campaigns</h2>
            </header>
            <div className="p-3">
                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="table-auto w-full dark:text-gray-300">
                        {/* Table header */}
                        <thead
                            className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50 rounded-xs">
                        <tr>
                            <th className="p-2">
                                <div className="font-semibold text-center">ID</div>
                            </th>
                            <th className="p-2">
                                <div className="font-semibold text-center">Name</div>
                            </th>
                            <th className="p-2">
                                <div className="font-semibold text-center">Status</div>
                            </th>
                        </tr>
                        </thead>
                        {/* Table body */}
                        <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
                        {Array.isArray(campaigns) && campaigns.length > 0 ? (
                            campaigns.map((campaign, index) => (
                                <tr key={campaign.id || index}>
                                    <td className="p-2"><div className="text-center">{campaign.id}</div></td>
                                    <td className="p-2"><div className="text-center">{campaign.name}</div></td>
                                    <td className="p-2"><div className="text-center">{campaign.status}</div></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="text-center">
                                    No active campaigns
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}