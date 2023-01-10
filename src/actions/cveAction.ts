import resourcesAPI from "~/api"
import { ICVE } from "~/interfaces/CVE"
import { PromiseServer } from "~/interfaces/ServerResponse"

export async function getCVE(cveId: string): PromiseServer<ICVE> {
    const response = await resourcesAPI.get(`/cve/${cveId}`)
    return response.data
}