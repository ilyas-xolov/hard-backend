class apiResponse {

    Successful(data){
        return {
            status: 200,
            timestamp: new Date.now(),
            message: data.message ?? 'OK',
            data: data.data ?? error,
            error: data.error ?? null,
            dataType: typeof data
        }

    }
    BadRequest(data){
        return {
            status: 400,
            timestamp: new Date.now(),
            message: data.message ?? 'No authentication credentials provided.',
            data: data.data ?? null,
            error: data.error ?? 'bad.request'
        }
    }

    Unauthorized(data){
        return {
            status: 401,
            timestamp: new Date.now(),
            message: data.message ?? 'No authentication credentials provided.',
            data: data.data ?? null,
            error: data.error ?? 'unauthorized.user'
        }
    }
    InternalServer(data){
        return {
            status: 500,
            timestamp: new Date.now(),
            message: data.message ?? 'Internal server error',
            data: data.data ?? null,
            error: data.error ?? 'internal.server.error'
        }
    }    
}

export default new apiResponse()