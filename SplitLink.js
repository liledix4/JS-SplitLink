export function splitLink(url) {
    const splitToHash = url.split("#");

    let splitToQuery = {
        url: splitToHash[0].split("?")
    };
    if (splitToHash[1]) {splitToQuery.hash = splitToHash[1];}

    let splitToPath = {
        url: splitToQuery.url[0].split("://")
    };
    if (splitToQuery.url[1]) {splitToPath.query = splitToQuery.url[1].split("&");}

    let finalObject = {
        protocol: splitToPath.url[0],
        address: splitToPath.url[1].split("/"),
        query: null,
        hash: null
    };
    if (splitToQuery.hash) {finalObject.hash = splitToQuery.hash;}
    if (splitToPath.query) {
        finalObject.query = {};
        for (let i = 0; i < splitToPath.query.length; i++) {
            const pair = splitToPath.query[i].split("=");
            const key = pair[0];
            const value = pair[1];
            finalObject.query[key] = value;
        }
    }
    finalObject.domain = finalObject.address[0];

    return finalObject;
}