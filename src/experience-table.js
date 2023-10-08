export function getLevel(exp) {
    const levelThresholds = [
        300, 900, 2700, 6500, 14000, 23000, 34000, 48000,
        64000, 85000, 100000, 120000, 140000, 165000,
        195000, 225000, 265000, 305000, 355000
    ];

    for (let level = 1; level <= levelThresholds.length; level++) {
        if (exp < levelThresholds[level - 1]) {
            return level;
        }
    }

    // If exp is greater than or equal to the highest threshold, return the last level
    return levelThresholds.length + 1;
}