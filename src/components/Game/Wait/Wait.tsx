import useTimeout from "../../hooks/useTimeout";

const Wait = ({ delay = 1000, ui }: { delay: number; ui: JSX.Element }) => {
    const { timeLeft } = useTimeout(delay);

    return timeLeft >= 1 ? (
        <div className="absolute flex items-center justify-center p-10 text-3xl font-bold transform -translate-x-1/2 -translate-y-1/2 bg-black/40 top-1/2 left-1/2 rounded-2xl">
            {timeLeft}
        </div>
    ) : (
        ui
    );
};

export default Wait;
