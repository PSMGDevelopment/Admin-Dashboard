import {useEffect, useState} from "react";
import {fetchCampaignsStatics} from "../api/campaignsStaticsAPI"
import {CampaignSummaryType} from "../api/types/CampaignSummaryType";
import DoughnutChart from "../charts/DoughnutChart"

// Import utilities
import {getCssVariable} from '../utils/Utils';


export default function CampaignsStatics() {

    const [campaignStatics, setCampaignsStatics] = useState<CampaignSummaryType>({
        TotalCampaigns: 0,
        ActiveCampaigns: 0,
        ScheduledCampaigns: 0,
        CompleteCampaigns: 0
    });

    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchCampaignsStatics({page, pageSize: 5, sort: "id", order: "desc"})
            .then((data) => setCampaignsStatics(data))
            .catch((err) => console.error(err));
    }, [page]);

    const campaignChartData = {
        labels: ['Active Campaigns', 'Scheduled Campaigns', 'Completed Campaigns'],
        datasets: [
            {
                label: 'Campaign Statics',
                data: [
                    campaignStatics.ActiveCampaigns, campaignStatics.ScheduledCampaigns, campaignStatics.CompleteCampaigns,
                ],
                backgroundColor: [
                    getCssVariable('--color-violet-500'),
                    getCssVariable('--color-sky-500'),
                    getCssVariable('--color-green-600'),
                ],
                hoverBackgroundColor: [
                    getCssVariable('--color-violet-600'),
                    getCssVariable('--color-sky-600'),
                    getCssVariable('--color-green-900'),
                ],
                borderWidth: 0,
            },
        ],
    };

    return (
        <div
            className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
            <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
                <h2 className="font-semibold text-gray-800 dark:text-gray-100">Campaign Statics</h2>
            </header>
            {/* Chart built with Chart.js 3 */}
            {/* Change the height attribute to adjust the chart height */}
            {campaignStatics?.TotalCampaigns > 0 ? (
                <DoughnutChart data={campaignChartData} width={389} height={260}/>
            ) : (
                <p className="text-center text-gray-500">Loading...</p>
            )}
        </div>
    );
}