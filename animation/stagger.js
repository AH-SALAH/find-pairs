export const stagger = {
    init: { opacity: 0 },
    animate: ({i = 0.2, delayChildren = 0}) => ({
        opacity: 1,
        transition: {
            // when: "beforeChildren",
            delayChildren,
            staggerChildren: i
        }
    })
};