const expectedFlags = new Map<string, Flag>();

class FlagNotFoundException extends Error {
    constructor(arg: string) { super(`Argument not found: ${arg}`); }
}

class Flag {
    flagId: string;
    usage: string;
    flagFound: boolean;
    required: boolean;

    constructor(flagId: string, usage: string, required: boolean) {
        this.flagId = flagId;
        this.required = required;
        this.usage = usage;
        this.flagFound = false;
    }
}

export function newFlag(flagId: string, { usage = "", required = false }: { usage?: string, required?: boolean }) {
    const flag = new Flag(flagId, usage, required);
    expectedFlags.set(flagId, flag);
}

export function parseUnorderedFlags(args: string[]): Map<string, string> {
    let heldFlag: string = null;
    let map = new Map<string, string>();
    // fill map
    for (const arg of args) {
        if (arg.startsWith("-")) {
            heldFlag = arg.replace(/-/g, "");
            if (expectedFlags.has(heldFlag)) {
                expectedFlags.get(heldFlag).flagFound = true;
            }
        } else {
            map.set(heldFlag, arg);
            heldFlag = null;
        }
    }

    // verify map has all required flags
    const missingFlags = Array.from(expectedFlags.values()).filter((flag: Flag) => !flag.flagFound && flag.required);
    if (missingFlags.length > 0) {
        throw new FlagNotFoundException(missingFlags.reduce((msg:string, flag: Flag) => `${flag.usage}`, ""))
    }
    return map;
}

export function parseFlags(): Map<string, string> {
    return parseUnorderedFlags(process.argv.slice(2))
}