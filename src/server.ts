import { PORT } from "@/shared";
import { DatabaseSQLHelper } from "@/layers/external";
import { setupRest } from "@/main/rest";

DatabaseSQLHelper.connect()
    .then(async () => {
        setupRest().listen(PORT, () => console.log(`Server running at Port ${PORT}`));
    })
    .catch(console.error);