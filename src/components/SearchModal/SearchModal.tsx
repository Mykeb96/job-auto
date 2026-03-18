import "./SearchModal.css"
import { useState } from "react";
import { searchJobs } from "../../api/jobs";
import { Oval } from 'react-loader-spinner'

type Props = {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    onSearchComplete: () => void;
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
    const { showModal, setShowModal, onSearchComplete } = props
    const [jobTitle, setJobTitle] = useState<string>("");
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false)
    const [submitError, setSubmitError] = useState<string | null>(null);

    function handleModal() {
        setShowModal(!showModal)
    }

    function toggleLocation(loc: string) {
        setSelectedLocations((prev) =>
          prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc],
        );
    }

    const trimmedTitle = jobTitle.trim();
    const isValid = trimmedTitle.length > 0 && selectedLocations.length > 0;

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitError(null);

        if (!trimmedTitle) {
          setSubmitError("Please enter a job title.");
          return;
        }

        if (selectedLocations.length === 0) {
          setSubmitError("Please select at least one location.");
          return;
        }

        setLoading(true);
        try {
          await searchJobs({
            job_title: trimmedTitle,
            locations: selectedLocations,
          });
          onSearchComplete();
          setShowModal(false);
        } catch (err) {
          console.error("Search failed", err);
          setSubmitError("Search failed. Please try again.");
        } finally {
          setLoading(false);
        }
      }

      return (
        <div className="SearchModal_Container">
          <div className="SearchModal">
            <span className="SearchModal_Close" onClick={handleModal}>
              X
            </span>
            <form className="SearchModal_Form" onSubmit={handleSubmit}>
              <fieldset disabled={loading}>
                <label
                  htmlFor="job_title"
                  className="job_title_label job_search_header"
                >
                  Job Title
                  <input
                    type="text"
                    id="job_title"
                    placeholder="Enter job title..."
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
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
                        />
                        <span>{loc}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {submitError && (
                  <div role="alert" className="job_search_error">
                    {submitError}
                  </div>
                )}
                {loading ?
                  <Oval
                    height={35}
                    width={35}
                    color="white"
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="gray"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                    wrapperStyle={{ alignSelf: 'center', marginTop: '10px' }}
                  />
                :
                  <button className="job_search_button" type="submit" disabled={!isValid}>
                    Search
                  </button>
                }
              </fieldset>
            </form>
          </div>
        </div>
      );
}