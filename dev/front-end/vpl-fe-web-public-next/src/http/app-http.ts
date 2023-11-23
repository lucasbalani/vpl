import axios, { AxiosInstance } from "axios";

export default class AppHttp {
    private static myInstance: AxiosInstance;

    static get instance(): AxiosInstance {
        return AppHttp.myInstance ??= axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL
        });
    }
}
