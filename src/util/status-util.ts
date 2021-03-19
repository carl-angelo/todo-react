import {Status} from "../enums/status";

export class StatusUtil {
    public static list(): Status[] {
        return Object.keys(Status).map(status => Status[status]);
    }
    public static title(status: Status): string {
        switch (status) {
            case Status.UNSTARTED:
                return 'Unstarted';
            case Status.COMPLETED:
                return 'Completed';
            case Status.IN_PROGRESS:
                return 'In Progress';
        }
    }
}
