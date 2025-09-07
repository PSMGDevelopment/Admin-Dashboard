import {useState} from "react";
import {FullCampaign} from "../api/types/FullCampaign";
import {TeamType} from "../api/types/TeamType";


export default function CampaignCreate() {

    const [fullCampaign, setFullCampaign] = useState<FullCampaign>({} as FullCampaign);
    const [teams, setTeams] = useState<TeamType[]>([]);

    const addTeam = () => {
        setTeams(prev => [
            ...prev,
            {
                id: "",
                organizationId: "",
                campaignId: "",
                campaign: "",
                coach: "Mecha T-Rex the son of God",
                name: "Chosen of the MechaRex",
                tenant: "",
                status: "",
                expectedPlayerCount: 1
            }
        ])
    }

    const removeTeam = (index: number) => {
        setTeams(prev => prev.filter((_, i) => i !== index));
    };


    return (
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white dark:bg-gray-900">
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
                {/* Page header */}
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Input Form</h1>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="mandatory">
                        Campaign Name <span className="text-red-500">*</span>
                    </label>
                    <input id="mandatory" className="form-input w-full" type="text" required/>
                </div>

                <div>
                    {teams.map((team, index) => (
                        <TeamRow team={teams[index]} deleteTeamRow={() => removeTeam(index)}/>
                    ))}
                    <div className="m-1.5">
                        {/* Start */}
                        <button
                            className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
                            onClick={addTeam}
                        >
                            <svg className="fill-current text-gray-400 shrink-0" width="16" height="16"
                                 viewBox="0 0 16 16">
                                <path
                                    d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"/>
                            </svg>
                            <span className="ml-2">Add Team</span>
                        </button>
                        {/* End */}
                    </div>
                </div>
            </div>
        </div>
    );
}

function TeamRow({team, deleteTeamRow}) {

    return (
        <div className="space-y-8 mt-8">

            <div className="flex flex-wrap items-center -m-1.5">
                <div className="grid gap-5 md:grid-cols-5">
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="country">
                            Linage Team
                        </label>
                        <select id="country" className="form-select w-full">
                            <option>Dinos of MechaRex</option>
                            <option>Meteor of Demise</option>
                            <option>Re-Evolution</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="mandatory">
                            Team Name <span className="text-red-500">*</span>
                        </label>
                        <input id="mandatory" className="form-input w-full" type="text" required
                               defaultValue={team.name}/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="mandatory">
                            Coach Name <span className="text-red-500">*</span>
                        </label>
                        <input id="mandatory" className="form-input w-full" type="text" required
                               defaultValue={team.coach}/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="mandatory">
                            Expected Player Count <span className="text-red-500">*</span>
                        </label>
                        <input id="mandatory" className="form-input w-full" type="number" required
                               defaultValue={team.expectedPlayerCount}/>
                    </div>
                    <div className="">
                        {/* Start */}
                        <button
                            className="btn mt-[1.5rem] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-red-500"
                            onClick={deleteTeamRow}
                        >
                            <svg className="fill-current shrink-0" width="16" height="16" viewBox="0 0 16 16">
                                <path
                                    d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z"/>
                            </svg>
                            <span className="ml-2">Delete</span>
                        </button>
                        {/* End */}
                    </div>
                </div>
            </div>
        </div>
    )

}