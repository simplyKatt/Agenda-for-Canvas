export function readStorage(type, key) {
    if (!type || !key) console.error("[Agenda-for-Canvas]: For Developers: A request was made to read data to browser.storage, but required arguments were missing!");
    if (type.toLowerCase() != ('local' || 'sync' || 'session' || 'managed')) {
        console.error("[Agenda-for-Canvas]: For Developers: A request was made to read data to browser.storage, but the location is invalid!");
    }
    let read_result
    switch (type) {
        case 'local':
            read_result = browser.storage.local.get([`${key}`]);
        break;
        case 'sync':
            read_result = browser.storage.sync.get([`${key}`]);
        break;
        case 'session':
            read_result = browser.storage.session.get([`${key}`]);
        break;
        case 'managed':
            read_result = browser.storage.managed.get([`${key}`]);
        break;
    }
    if (read_result == ("" || null)) return null
    return JSON.parse(read_result);
}
export function saveStorage(act, type, key, value) {
    if (!type || !key || !value) console.error("[Agenda-for-Canvas]: For Developers: A request was made to write data to browser.storage, but required arguments were missing!");
    if (type.toLowerCase() != ('local' || 'sync' || 'session')) {
        console.error("[Agenda-for-Canvas]: For Developers: A request was made to write data to browser.storage, but the location is invalid!");
    } else if (type.toLowerCase() === 'managed') {
        console.error("[Agenda-for-Canvas]: For Developers: An invalid request was made to write to 'browser.storage.managed'!")
    }
    if (act != ('safe' || 'force')) {
        act = 'safe'; //Error on the side of caution in regards to data integrity.
        console.warn("[Agenda-for-Canvas]: For Developers: A request to write data to browser.storage was made, but no action type was specified.");
    }
    try {
    var safe_key = JSON.parse(key.replace(/[^a-zA-Z0-9\-_ ]/g, ''));
    var safe_val = JSON.parse(value.replace(/[^a-zA-Z0-9\-_:{}\[\] ]/g, ''));
    if (safe_key === "") console.error(`[Agenda-for-Canvas]: For Developers: The key "${key}" is invalid. Keys should only use characters, numbers, dashes, or underscores/spaces.`)
    if (safe_val === "") console.error(`[Agenda-for-Canvas]: For Developers: The value "${value}" is invalid. Values should only use characters, numbers, dashes, or underscores/spaces.`)
    if (safe_key.slice(0,1) == ("-"||"_"||" ")) console.error("[Agenda-for-Canvas]: For Developers: Keys may not start nor end with either a dash, underscore, or space.")
    } catch (e) {
        console.error(e);
    }
    if (act === 'force') {
        switch(type) {
            case 'local':
                await browser.storage.local.set({ safe_key:safe_val });
            break;
            case 'sync':
                await browser.storage.sync.set({ safe_key:safe_val });
            break;
            case 'session':
                await browser.storage.sync.set({ safe_key:safe_val });
            break;
        }
    }
        if (act === 'safe') {
        switch(type) {
            case 'local':
            break;
            case 'sync':
            break;
            case 'session':
            break;
        }
    }
}
export function nukeStorage(act, type, key) {

}