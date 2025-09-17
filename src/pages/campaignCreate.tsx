import {useEffect, useState} from "react";
import {FullCampaign} from "../api/types/FullCampaign";
import {TeamType} from "../api/types/TeamType";
import {CampaignType} from "../api/types/CampaignType";
import {fetchOperatorByTenantID} from "../api/operatorsByTenantIdAPI";
import {useUser} from "@descope/react-sdk";
import {OrganizationType} from "../api/types/OrganizationType";
import {createFullCampaignAPI} from "../api/createFullCampaignAPI";
import Notification from "../components/Notification";


export default function CampaignCreate() {

    const {user, isUserLoading} = useUser();

    const currentTenant = user?.userTenants[0]?.tenantName;

    useEffect(() => {

        if (isUserLoading) {
            return
        }

        const tenantName = user.userTenants[0].tenantName;

        setCampaign(prev => ({
            ...prev,
            tenant: tenantName
        }));

        setOrganization(prev => ({
            ...prev,
            tenant: tenantName
        }));

        fetchOperatorByTenantID(tenantName).then(operator => {
            setCampaign(prev => ({
                ...prev,
                operatorID: operator?.id || ""
            }));
        });
    }, [isUserLoading, user]);

    const [teams, setTeams] = useState<TeamType[]>([]);
    const [campaign, setCampaign] = useState<CampaignType>({
        id: "",
        name: "",
        operatorID: "",
        tenant: "",
        active: true,
        status: "new"
    })
    const [organization, setOrganization] = useState<OrganizationType>({
        id: "",
        name: "",
        tenant: "",
        isSchool: true,
        isClub: false
    })

    const addTeam = () => {
        setTeams(prev => [
            ...prev,
            {
                id: "",
                organization: "",
                campaignID: "",
                campaign: "",
                coach: {id: "", descopeUserID: "", teamID: "", displayName: ""},
                name: "",
                tenant: currentTenant,
                status: "new",
                expectedPlayerCount: 0
            }
        ])
    }

    const removeTeam = (index: number) => {
        setTeams(prev => prev.filter((_, i) => i !== index));
    };

    const updateCoachDisplayName = (index: number, newDisplayName: string) => {
        setTeams(prev =>
            prev.map((team, i) =>
                i === index
                    ? {
                        ...team,
                        coach: {
                            ...team.coach,
                            displayName: newDisplayName,
                        },
                    }
                    : team
            )
        );
    };

    const handleOrgTypeUpdate = (selection) => {

        if (selection === 0) {
            setOrganization(prev => ({
                ...prev,
                isSchool: true,
                isClub: false,
            }));
            return;
        }
        if (selection === 1) {
            setOrganization(prev => ({
                ...prev,
                isSchool: false,
                isClub: true,
            }));
            return;
        }
        if (selection === 2) {
            setOrganization(prev => ({
                ...prev,
                isSchool: false,
                isClub: false,
            }));
            return;
        }
        return;
    }

    const [validationNotification, setValidationNotification] = useState(false);
    const [validationErrorList, setValidationErrorList] = useState<String[]>([]);

    const handleCreate = () => {
        createCampaign(campaign, organization, teams, validationErrorList, setValidationErrorList, setValidationNotification)
    }

    return (
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white dark:bg-gray-900">
            <div className="px-4 sm:px-6 lg:px-2 py-2 w-full max-w-[96rem] mx-auto">
                <div className={"space-y-8 mt-8"}>
                    <div>
                        <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Create
                            Campaign</h1>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="mandatory">
                            Organization Name <span className="text-red-500">*</span>
                        </label>
                        <input id="mandatory" className="form-input w-full" type="text" required
                               onChange={(e) => setOrganization(prev => ({...prev, name: e.target.value}))}
                        />
                    </div>
                    <div>
                        <div className="flex flex-wrap items-center -m-3">
                            <div className="m-3">
                                <label className="flex items-center">
                                    <input type="radio" name="radio-buttons" className="form-radio"
                                           defaultChecked
                                           onChange={() => handleOrgTypeUpdate(0)}
                                    />
                                    <span className="text-sm ml-2">School</span>
                                </label>
                            </div>
                            <div className="m-3">
                                <label className="flex items-center">
                                    <input type="radio" name="radio-buttons" className="form-radio"
                                           onChange={() => handleOrgTypeUpdate(1)}
                                    />
                                    <span className="text-sm ml-2">Club</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="mandatory">
                            Campaign Name <span className="text-red-500">*</span>
                        </label>
                        <input id="mandatory" className="form-input w-full" type="text" required
                               onChange={(e) => setCampaign(prev => ({...prev, name: e.target.value}))}
                        />
                    </div>
                    <div>
                        {teams.map((team, index) => (
                            <TeamRow team={teams[index]}
                                     deleteTeamRow={() => removeTeam(index)}
                                     updateTeam={(updatedFields) =>
                                         setTeams(prev =>
                                             prev.map((t, i) => i === index ? {...t, ...updatedFields} : t)
                                         )}
                                     updateCoachName={updateCoachDisplayName}
                                     index={index}
                            />
                        ))}
                    </div>
                    <div>
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
                    <Notification type="warning" open={validationNotification} setOpen={setValidationNotification}
                                  className={""} containsActionButton={false}>
                        <div className="font-medium text-gray-800 dark:text-gray-100 mb-1">Validation Error</div>
                        <div>
                            {validationErrorList.map((validationError, index) => (
                                <div key={index}>
                                    {validationError}
                                    <br/>
                                </div>
                            ))}
                        </div>
                    </Notification>
                    <div>
                        <button
                            className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
                            onClick={handleCreate}
                        >Create
                            Campaign
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TeamRow({team, updateTeam, deleteTeamRow, updateCoachName, index}) {

    return (
        <div className="space-y-8 mt-8">
            <div className="flex flex-wrap items-center -m-1.5">
                <div className="grid gap-5 md:grid-cols-5">
                    {/*<div>*/}
                    {/*    <label className="block text-sm font-medium mb-1" htmlFor="country">*/}
                    {/*        Linage Team*/}
                    {/*    </label>*/}
                    {/*    <select id="country" className="form-select w-full">*/}
                    {/*        <option>Dinos of MechaRex</option>*/}
                    {/*        <option>Meteor of Demise</option>*/}
                    {/*        <option>Re-Evolution</option>*/}
                    {/*    </select>*/}
                    {/*</div>*/}
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="mandatory">
                            Team Name <span className="text-red-500">*</span>
                        </label>
                        <input id="mandatory" className="form-input w-full" type="text" required
                               defaultValue={team.name}
                               onChange={e => updateTeam({name: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="mandatory">
                            Coach Name <span className="text-red-500">*</span>
                        </label>
                        <input id="mandatory" className="form-input w-full" type="text" required
                               defaultValue={team.coach.displayName}
                               onChange={(e) => updateCoachName(index, e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="mandatory">
                            Expected Player Count <span className="text-red-500">*</span>
                        </label>
                        <input id="mandatory" className="form-input w-full" type="number" required
                               defaultValue={team.expectedPlayerCount}
                               onChange={e => updateTeam({expectedPlayerCount: e.target.value})}
                        />
                    </div>
                    <div className="">
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

function createCampaign(campaign: CampaignType, organization: OrganizationType, Teams: TeamType[], validationErrorList, setValidationErrorList, setValidationNotification) {

    //reset past validation
    setValidationNotification(false);
    setValidationErrorList([]);

    //validation
    if (!organization.name.trim()) setValidationErrorList(prev => [...prev, "Organization needs Name"]);
    if (!campaign.name.trim()) setValidationErrorList(prev => [...prev, "Campaign needs Name"]);

    Teams.map((team, index) => {
        const missingFields: string[] = [];
        if (!team.name) missingFields.push("Name");
        if (!team.coach?.displayName) missingFields.push("Coach Name");
        if (team.expectedPlayerCount <= 0) missingFields.push("Expected Player Count must be greater then 0");

        if (missingFields.length > 0) setValidationErrorList(prev => [...prev, `Team #${index + 1} needs the following: ${missingFields.join(", ")}`]);
    })

    if (validationErrorList.length > 0) {
        setValidationNotification(true);
        return;
    }

    const fullCampaign: FullCampaign = {
        Campaign: campaign,
        Organization: organization,
        Teams: Teams
    }
    createFullCampaignAPI(fullCampaign)
}