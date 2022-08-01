import ShipForm from "../../components/Ship/Create/ShipForm";

function CreateShip() {
    return (
        <div className="container flex flex-col max-w-3xl gap-12 px-6 mx-auto">
            <h1 className="mt-12 text-3xl font-bold">Create Ship</h1>
            <ShipForm
                data={{
                    description: "",
                    title: "",
                    image: "",
                    category: "",
                    owner: "",
                    id: 0,
                    price: 0,
                    rating: {
                        count: 0,
                        rate: 0,
                    },
                }}
            />
        </div>
    );
}

export default CreateShip;
