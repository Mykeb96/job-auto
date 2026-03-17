import "./Navigation.css"

type Props = {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Navigation(props: Props) {
    const { showModal, setShowModal } = props

    function handleModal() {
        setShowModal(!showModal)
    }

    return (
        <div className="Navigation_Container">
            <h1 className="Navigation_Header">Job-Auto</h1>
            <button onClick={handleModal}>Find Jobs</button>
        </div>
    )
}