export const scaleIn = {
    init: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    // exit: { scale: 0, opacity: 0 }
};

export const scaleOut = {
    init: { scale: 2, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { type: 'tween' } },
    exit: { scale: 0, opacity: 0 }
};