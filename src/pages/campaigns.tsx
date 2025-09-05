import {useCallback, useEffect, useState} from "react";
import {fetchCampaigns} from "../api/campaignsAPI"
import CampaignModal from "../pages/campaignModal/campaignEditModal"


export default function Campaigns() {

    const [campaigns, setCampaigns] = useState([]);
    const [page, setPage] = useState(1);
    const [editModal, setEditModal] = useState(false)
    const [selectedCampaign, setSelectedCampaign] = useState(null);

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
                            <th className="p-2">
                                <div className="font-semibold text-center"></div>
                            </th>
                        </tr>
                        </thead>
                        {/* Table body */}
                        <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
                        {Array.isArray(campaigns) && campaigns.length > 0 ? (
                            campaigns.map((campaign, index) => (
                                <tr key={campaign.id || index}>
                                    <td className="p-2">
                                        <div className="text-center">{campaign.id}</div>
                                    </td>
                                    <td className="p-2">
                                        <div className="text-center">{campaign.name}</div>
                                    </td>
                                    <td className="p-2">
                                        <div className="text-center">{campaign.status}</div>
                                    </td>
                                    <td className="p-2">
                                        <button onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedCampaign(campaign)
                                            setEditModal(true);
                                        }} type={"button"}
                                                className="btn bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300">
                                            <svg className="fill-current text-gray-400 dark:text-gray-500 shrink-0"
                                                 width="16" height="16" viewBox="0 0 16 16">
                                                <path
                                                    d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z"/>
                                            </svg>

                                            <span className="ml-2">Edit Campaign</span>
                                        </button>
                                    </td>
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
                    <CampaignModal modalOpen={editModal} setModalOpen={setEditModal} campaign={selectedCampaign}/>
                </div>
            </div>
        </div>
    )
}