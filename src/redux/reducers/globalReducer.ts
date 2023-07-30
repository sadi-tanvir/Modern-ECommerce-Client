import { createReducer, createAction } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';


const initialState = {
    warningAlert: (message: string, actions: any) => {
        Swal.fire({ title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#14b8a6', cancelButtonColor: '#d33', confirmButtonText: message })
            .then((result) => {
                if (result.isConfirmed) {
                    actions()
                }
            })
    },
    successAlert: (message: string) => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });

        Toast.fire({
            icon: 'success',
            title: message
        })
    },
    errorAlert: (message: string) => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });

        Toast.fire({
            icon: 'error',
            title: message
        })
    },
}

const globalReducer = createReducer(initialState, (builder) => {
});

export default globalReducer;