import "./SearchModal.css"

type Props = {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SearchModal(props: Props) {
    const { showModal, setShowModal } = props

    function handleModal() {
        setShowModal(!showModal)
    }

    return (
        <div className="SearchModal_Container">
            <div className="SearchModal">
                <span className="SearchModal_Close" onClick={handleModal}>X</span>
            </div>
        </div>
    )
}