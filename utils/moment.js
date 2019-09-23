import _moment from "moment";
import momentDurationSetup from "moment-duration-format";

momentDurationSetup(_moment);

export const moment = _moment;
