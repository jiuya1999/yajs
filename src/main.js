import string from "./string";
import parse from "./parse";

const ya = {
    string,
    parse
}

export default ya

export {
    string,
    parse
}

((_) => (_.ya = ya))(window)