// axios-instance.js
import axios from 'axios';
import * as API from './API';
let tokenDefault = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJzdGFmZjEiLCJyb2xlIjoxLCJmdWxsbmFtZSI6InN0YWZmIG1vdCIsImF2YXRhciI6Imh0dHA6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZGJzZmd4cmp6L2ltYWdlL3VwbG9hZC92MTcwMTg1ODU2NC9hZG1pbi1pbWFnZS94OWQ4dGkwdHE5d295dzh2bzMwby5qcGciLCJjcmVhdGVkQXQiOiIyMDIzLTEyLTA2VDEwOjI5OjI1LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTEyLTA2VDEwOjI5OjI1LjAwMFoiLCJkZWxldGVkQXQiOm51bGwsImlhdCI6MTcwMTg2NDYzMCwiZXhwIjoxNzMzNDIyMjMwfQ.VQf2MAPjEc_OVPdJc-RqkKAa5A8mJoG1ndh4xaCkNP8";
let useTokenTest = true;

const instance = axios.create({
    timeout: 7000, // Timeout cho mỗi yêu cầu
});

const setAuthToken = (token) => {
    instance.interceptors.request.use(
        (config) => {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
};

instance.interceptors.request.use(
    (config) => {
        if (!useTokenTest) {
            return config;
        }
        const token = tokenDefault;
        if (token) {
            config.headers.Authorization = `Bearer ${tokenDefault}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export { instance, setAuthToken };
