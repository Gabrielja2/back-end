export type HttpRequest = {
	headers?: any;
	data?: any;
	userId?: string;
}

export type HttpResponse = {
	statusCode: number;
	response?: any;
}