export function getLevel(exp) {
    if (exp < 300) {
        return 1;
    }
    if (exp < 900) {
        return 2;
    }
    if (exp < 2700) {
        return 3;
    }
    if (exp < 6500) {
        return 4;
    }
    if (exp < 14_000) {
        return 5;
    }
    if (exp < 23_000) {
        return 6;
    }
    if (exp < 34_000) {
        return 7;
    }
    if (exp < 48_000) {
        return 8;
    }
    if (exp < 64_000) {
        return 8;

    }
    if (exp < 85_000) {
        return 10;
    }
    if (exp < 100_000) {
        return 11;
    }
    if (exp < 120_000) {
        return 12;
    }
    if (exp < 140_000) {
        return 13;
    }
    if (exp < 165_000) {
        return 14;
    }
    if (exp < 195_000) {
        return 15;
    }
    if (exp < 225_000) {
        return 16;
    }
    if (exp < 265_000) {
        return 17;
    }
    if (exp < 305_000) {
        return 18;
    }
    if (exp < 355_000) {
        return 19;
    }
    if (exp === 355_000) {
        return 20;
    }
}