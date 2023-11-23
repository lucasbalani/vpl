export enum ApiResultStatus {
    none = 0,
    loading = 1,
    success = 2,
    error = 3
}

export class ApiResult{
    get status() {
        if (this._isLoading && !this._data && !this._errorMessage)
            return ApiResultStatus.loading;

        if (!this._isLoading && this._isSuccess && this._data)
            return ApiResultStatus.success;

        if (!this._isLoading && !this._isSuccess && this._errorMessage)
            return ApiResultStatus.error;

        return ApiResultStatus.none;
    };

    private _isLoading!: boolean;
    private _isSuccess!: boolean;

    private _data: any | null = null;
    get data() { return this._data };

    private _errorMessage: string | null = null;
    get errorMessage() { return this._errorMessage };

    static start(): ApiResult{
        let apiResult = new ApiResult()

        apiResult._isLoading = true;

        return apiResult;
    }

    static success<T>(data: T): ApiResult {
        let apiResult = new ApiResult()
        
        apiResult._isSuccess = true;
        apiResult._data = data;

        return apiResult;
    }

    static error(error: string): ApiResult {
        let apiResult = new ApiResult()

        apiResult._isSuccess = false;
        apiResult._errorMessage = error;
        
        return apiResult;
    }

    static setNone(): ApiResult {
        let apiResult = new ApiResult();

        return apiResult;
    }
}