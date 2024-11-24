import type { StatusCode } from "../enums/status-code";

export type ResponseData<T> = {
	statusCode: StatusCode;
	data: T;
};
