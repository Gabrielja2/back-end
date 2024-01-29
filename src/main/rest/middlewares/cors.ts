import lib from "cors";

const corsOptions = {

	origin: (origin: string, callback: any) => {
		return callback(null, true);
	}
};

export const cors = lib(corsOptions as any);