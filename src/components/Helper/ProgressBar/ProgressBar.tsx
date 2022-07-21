
import { motion } from "framer-motion";

function ProgressBar({ progress }: { progress: number }) {
    return (
        <motion.div
            initial={{ width: 0 }}
            animate={{ width: progress + "%" }}
            transition={{ duration: 0.5 }}
            className="bg-yellow-200 animate-pulse h-[5px]"
        />
    );
}

export default ProgressBar;
