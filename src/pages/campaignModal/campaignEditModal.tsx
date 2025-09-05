import ModalBasic from "../../components/ModalBasic";

export default function CampaignModal({modalOpen, setModalOpen, campaign}) {

    return (
        <ModalBasic id="feedback-modal" modalOpen={modalOpen} setModalOpen={setModalOpen}
                    title="Edit Campaign">
            {/* Modal content */}
            <div className="px-5 py-4">
                <div className="text-sm">
                    <div className="font-medium text-gray-800 dark:text-gray-100 mb-3"> Edit Campaign
                    </div>
                </div>
                <div className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="name">
                            Campaign ID: {campaign?.id ?? ''}
                        </label>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="text">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input id="email" className="form-input w-full px-2 py-1" type="text" required value={campaign?.name ?? ''}/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="feedback">
                            Status <span className="text-red-500">*</span>
                        </label>
                        <textarea id="feedback" className="form-textarea w-full px-2 py-1" rows={4} required value={campaign?.status ?? ''}></textarea>
                    </div>
                </div>
            </div>
            {/* Modal footer */}
            <div className="px-5 py-4 border-t border-gray-200 dark:border-gray-700/60">
                          <div className="flex flex-wrap justify-end space-x-2">
                            <button
                              className="btn-sm border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300"
                              onClick={(e) => {
                                e.stopPropagation();
                                setModalOpen(false);
                              }}
                            >
                              Cancel
                            </button>
                            <button className="btn-sm bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white">Send</button>
                          </div>
                        </div>
        </ModalBasic>
    )

}