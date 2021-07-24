import axios from 'axios'
import Swal from "sweetalert2";
import * as storage from './storage';

axios.interceptors.response.use(
    response => {
        // let hours = 4.5
        // let saved = storage.local.getItem('saved')
        // if (saved && (new Date().getTime() - saved > hours * 60 * 60 * 1000)) {
        //     localStorage.clear()
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'Waktu login habis'
        //     })
        //     window.location.href = "#/home/petunjuk";
        // }
        // console.log(response)
        if (!(response.data.status >= 200 && response.data.status < 300)) {
            Swal.fire({
                icon: 'error',
                title: response.data.message
            })
        } else if (response.data.status === 401 || response.data.status === 404) {
            Swal.fire({
                icon: 'error',
                title: 'Waktu login habis'
            })
            window.location.href = "#/pages/login";
        }
        return response
    },
    error => {
        storage.local.clear()
        Swal.fire({
            icon: 'error',
            title: 'Silahkan login kembali'
        })
        window.location.href = "#/pages/login";
        return Promise.reject(error)
    }
);

axios.interceptors.request.use(
    request => {
        // const accessTokenResponse = JSON.parse(storage.local.getItem('accessTokenResponse'))
        const token = localStorage.getItem("access_token")

        if (token === "null" || !token) {
            return request
        } else {
            // const accessToken = accessTokenResponse["access_token"]
            request.headers = {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            return request
        }
    },
    error => {
        Swal.fire({
            icon: 'error',
            title: 'Koneksi Jaringan Terputus'
        })
        return Promise.reject(error)
    }
);
