import "./SearchModal.css"
import { useState } from "react";

type Props = {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const LOCATION_OPTIONS = [
    "United States",
    "San Francisco, CA",
    "New York, NY",
    "Seattle, WA",
    "Austin, TX",
    "Boston, MA",
    "Chicago, IL",
    "Denver, CO",
    "Los Angeles, CA",
    "Portland, OR",
    "Remote",
  ];

export default function SearchModal(props: Props) {
    const { showModal, setShowModal } = props
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

    function handleModal() {
        setShowModal(!showModal)
    }

    function toggleLocation(loc: string) {
        setSelectedLocations((prev) =>
          prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc],
        );
      }

    return (
        <div className="SearchModal_Container">
            <div className="SearchModal">
                <span className="SearchModal_Close" onClick={handleModal}>X</span>
                <label htmlFor="job_title" className="job_title_label job_search_header">
                    Job Title
                    <input 
                        type="text" 
                        id="job_title"
                        placeholder="Enter job title..."
                    />
                </label>

                <div className="search_locations_container">
                    <p className="job_search_header">Locations</p>
                    <div className="search_locations_list">
                        {LOCATION_OPTIONS.map((loc) => (
                        <label key={loc} className="search_location_option">
                            <input
                                type="checkbox"
                                checked={selectedLocations.includes(loc)}
                                onChange={() => toggleLocation(loc)}
                                id="job_locations"
                            />
                            <span>{loc}</span>
                        </label>
                        ))}
                    </div>
                </div>
                <button>Search</button>
            </div>
        </div>
    )
}