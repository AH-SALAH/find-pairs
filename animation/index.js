/**
 * Choosing only needed Framer-motion features to be loaded in app
 */
import { MotionConfig, ExitFeature, AnimationFeature } from "framer-motion";

const FrMotion = ({ children }) => {
    return (
        <MotionConfig features={[ExitFeature, AnimationFeature]}>
            {children}
        </MotionConfig>
    );
};

export default FrMotion;