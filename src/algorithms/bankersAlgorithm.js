export function bankersAlgorithm(vehicles, available) {
    const work = { ...available };

    const finish = new Array(vehicles.length).fill(false);

    const safeSequence = [];

    const iterations = [];

    let progress = true;

    while (progress) {
        progress = false;

        for (let i = 0; i < vehicles.length; i++) {
            if (finish[i]) continue;

            const process = vehicles[i];

            if (
                process.need.c <= work.c &&
                process.need.l <= work.l &&
                process.need.e <= work.e
            ) {
                work.c += process.allocation.c;
                work.l += process.allocation.l;
                work.e += process.allocation.e;

                iterations.push({
                    process: process.name,
                    available: { ...work }
                });

                finish[i] = true;

                safeSequence.push(process.name);

                progress = true;
            }
        }
    }

    return {
        safe: finish.every(Boolean),
        safeSequence,
        iterations,
    };
}