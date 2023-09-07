import request from "@/axios/request";

export const uploadImage = (data: FormData) => {
    return request({
        url: `/upload/file`,
        method: "POST",
        data,
        headers: {
            'Content-Type': "application/x-www-form-urlencoded"
        }
    });
}