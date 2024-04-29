import { useHttp } from "../hooks/http/http.hook";
import { getLocalStorageWithExpiry } from "./getLocalStorageWithExpiry";

const useMainService = () => {
    const { loading, request, error, clearError } = useHttp();

    const _apiBase = "http://localhost:8080";

    const auth = async (username, password) => {
        return await request(`${_apiBase}/auth`, 'POST', JSON.stringify({ username, password }));
    }

    const register = async (user) => {
        const token = getLocalStorageWithExpiry('token');
        if (token)
            return await request(`${_apiBase}/register`, 'POST', JSON.stringify(user),
                { "Content-Type": "application/json", "Authorization": `Bearer ${token.replace('"', '')}` });
        return null;
    }

    const setBanUser = async (id) => {
        const token = getLocalStorageWithExpiry('token');
        if (token)
            return await request(`${_apiBase}/users/${id}/ban`, 'POST', null,
                { "Content-Type": "application/json", "Authorization": `Bearer ${token.replace('"', '')}` });
        return null;
    }

    const setUnbanUser = async (id) => {
        const token = getLocalStorageWithExpiry('token');
        if (token)
            return await request(`${_apiBase}/users/${id}/unban`, 'POST', null,
                { "Content-Type": "application/json", "Authorization": `Bearer ${token.replace('"', '')}` });
        return null;
    }

    const removeUser = async (id) => {
        const token = getLocalStorageWithExpiry('token');
        if (token)
            return await request(`${_apiBase}/users/${id}/remove`, 'POST', null,
                { "Content-Type": "application/json", "Authorization": `Bearer ${token.replace('"', '')}` });
        return null;
    }

    const getUserInfo = async () => {
        const token = getLocalStorageWithExpiry('token');
        if (token)
            return await request(`${_apiBase}/my/info`, 'GET', null,
                { "Content-Type": "application/json", "Authorization": `Bearer ${token.replace('"', '')}` });
        return null;
    }

    const getUserInfoById = async (id) => {
        const token = getLocalStorageWithExpiry('token');
        if (token)
            return await request(`${_apiBase}/users/${id}`, 'GET', null,
                { "Content-Type": "application/json", "Authorization": `Bearer ${token.replace('"', '')}` });
        return null;
    }

    const getRoles = async () => {
        const token = getLocalStorageWithExpiry('token');
        if (token)
            return await request(`${_apiBase}/my/role`, 'GET', null,
                { "Content-Type": "application/json", "Authorization": `Bearer ${token.replace('"', '')}` });
        return null;
    }

    const getNews = async () => {
        return await request(`${_apiBase}/news`, 'GET');
    }

    const getNewsById = async (id) => {
        return await request(`${_apiBase}/news/${id}`, 'GET');
    }

    const createNews = async (news) => { // {title, date, text} тип news
        const token = getLocalStorageWithExpiry('token');
        if (token)
            return await request(`${_apiBase}/news/create`, 'POST', JSON.stringify(news),
                { "Content-Type": "application/json", "Authorization": `Bearer ${token.replace('"', '')}` });
        return null;
    }

    const removeNews = async (id) => { // id news
        const token = getLocalStorageWithExpiry('token');
        if (token)
            return await request(`${_apiBase}/news/remove/${id}`, 'GET', null,
                { "Content-Type": "application/json", "Authorization": `Bearer ${token.replace('"', '')}` });
        return null;
    }

    const editNews = async (id, news) => { // id news, {title, date, text} тип news
        const token = getLocalStorageWithExpiry('token');
        if (token)
            return await request(`${_apiBase}/news/edit/${id}`, 'POST', JSON.stringify(news),
                { "Content-Type": "application/json", "Authorization": `Bearer ${token.replace('"', '')}` });
        return null;
    }

    const setLogo = async (file) => {
        const token = getLocalStorageWithExpiry('token');
        if (token)
            return await request(`${_apiBase}/my/set/logo`, 'POST', file,
                { "Authorization": `Bearer ${token.replace('"', '')}` });
        return null;
    }

    const getLogo = async (id) => {
        const token = getLocalStorageWithExpiry('token');
        if (token)
            return await request(`${_apiBase}/images/${id}`, 'GET', null,
                { "Authorization": `Bearer ${token.replace('"', '')}` }, false);
        return null;
    }

    const setUserData = async (user) => { // {fullName, email, username, password, confirmPassword}
        const token = getLocalStorageWithExpiry('token');
        console.log(user);
        if (token)
            return await request(`${_apiBase}/my/set/change`, 'POST', JSON.stringify(user),
                { "Content-Type": 'application/json', "Authorization": `Bearer ${token.replace('"', '')}` });
        return null;
    }

    const getUsers = async () => {
        const token = getLocalStorageWithExpiry('token');
        if (token)
            return await request(`${_apiBase}/users`, 'GET', null, { "Content-Type": 'application/json', "Authorization": `Bearer ${token.replace('"', '')}` });
        return null;
    }

    const getAllEmployee = async () => {
        const token = getLocalStorageWithExpiry('token');
        if (token)
            return await request(`${_apiBase}/users/employee`, 'GET', null, { "Content-Type": 'application/json', "Authorization": `Bearer ${token.replace('"', '')}` });
        return null;
    }

    const getAllJkh = async () => {
        const token = getLocalStorageWithExpiry('token');
        if (token)
            return await request(`${_apiBase}/jkh/all`, 'GET', null, { "Content-Type": 'application/json', "Authorization": `Bearer ${token.replace('"', '')}` });
        return null;
    }

    const getJkhById = async (id) => {
        const token = getLocalStorageWithExpiry('token');
        if (token)
            return await request(`${_apiBase}/jkh/${id}`, 'GET', null, { "Content-Type": 'application/json', "Authorization": `Bearer ${token.replace('"', '')}` });
        return null;
    }

    const createJkh = async (jkh) => { // {legalAddress, inn, kpp, name, bankAccount, phoneNumber}
        const token = getLocalStorageWithExpiry('token');
        if (token)
            return await request(`${_apiBase}/jkh/create`, 'POST', JSON.stringify(jkh), { "Content-Type": 'application/json', "Authorization": `Bearer ${token.replace('"', '')}` });
        return null;
    }

    const addEmployeeJkh = async (jkhId, userId) => {
        const token = getLocalStorageWithExpiry('token');
        if (token)
            return await request(`${_apiBase}/jkh/${jkhId}/add/employee/${userId}`, 'POST', null, { "Content-Type": 'application/json', "Authorization": `Bearer ${token.replace('"', '')}` });
        return null;
    }

    const removeEmployeeJkh = async (jkhId, userId) => {
        const token = getLocalStorageWithExpiry('token');
        if (token)
            return await request(`${_apiBase}/jkh/${jkhId}/remove/employee/${userId}`, 'POST', null, { "Content-Type": 'application/json', "Authorization": `Bearer ${token.replace('"', '')}` });
        return null;
    }

    const addHouse = async (id, house) => { // id, {address, square, count of people, jkhId}
        const token = getLocalStorageWithExpiry('token');
        if (token)
            return await request(`${_apiBase}/users/${id}/add/house`, 'POST', JSON.stringify(house), { "Content-Type": 'application/json', "Authorization": `Bearer ${token.replace('"', '')}` });
        return null;
    }

    const addHouseToJkh = async (id, jkhId) => { // id, {address, square, count of people, jkhId}
        const token = getLocalStorageWithExpiry('token');
        if (token)
            return await request(`${_apiBase}/users/${id}/add/house/jkh/${jkhId}`, 'POST', null, { "Content-Type": 'application/json', "Authorization": `Bearer ${token.replace('"', '')}` });
        return null;
    }

    const getUserHouse = async (userId) => { // id, {address, square, count of people, jkhId}
        const token = getLocalStorageWithExpiry('token');
        if (token)
            return await request(`${_apiBase}/users/${userId}/house`, 'GET', null, { "Content-Type": 'application/json', "Authorization": `Bearer ${token.replace('"', '')}` });
        return null;
    }

    const getHouseById = async (id) => {
        const token = getLocalStorageWithExpiry('token');
        if (token)
            return await request(`${_apiBase}/house/${id}`, 'GET', null, { "Content-Type": 'application/json', "Authorization": `Bearer ${token.replace('"', '')}` });
        return null;
    }

    const editHouse = async (house) => { // {address, square, count of people, houseId}
        const token = getLocalStorageWithExpiry('token');
        if (token)
            return await request(`${_apiBase}/house/edit`, 'POST', JSON.stringify(house), { "Content-Type": 'application/json', "Authorization": `Bearer ${token.replace('"', '')}` });
        return null;
    }

    const removeHouse = async (house) => { // {address, square, count of people, houseId, ownerId}
        const token = getLocalStorageWithExpiry('token');
        if (token)
            return await request(`${_apiBase}/house/remove`, 'POST', JSON.stringify(house), { "Content-Type": 'application/json', "Authorization": `Bearer ${token.replace('"', '')}` });
        return null;
    }

    const removeClient = async (house) => { // {address, square, count of people, houseId, ownerId}
        const token = getLocalStorageWithExpiry('token');
        if (token)
            return await request(`${_apiBase}/jkh/remove/client`, 'POST', JSON.stringify(house), { "Content-Type": 'application/json', "Authorization": `Bearer ${token.replace('"', '')}` });
        return null;
    }

    const getRates = async () => {
        const token = getLocalStorageWithExpiry('token');
        if (token)
            return await request(`${_apiBase}/rates`, 'GET', null, { "Content-Type": 'application/json', "Authorization": `Bearer ${token.replace('"', '')}` });
        return null;
    }

    const getRateById = async (id) => {
        const token = getLocalStorageWithExpiry('token');
        if (token)
            return await request(`${_apiBase}/rates/${id}`, 'GET', null, { "Content-Type": 'application/json', "Authorization": `Bearer ${token.replace('"', '')}` });
        return null;
    }

    const createRate = async (rates) => {
        const token = getLocalStorageWithExpiry('token');
        if (token)
            return await request(`${_apiBase}/rates/create`, 'POST', JSON.stringify(rates), { "Content-Type": 'application/json', "Authorization": `Bearer ${token.replace('"', '')}` });
        return null;
    }

    const removeRate = async (id) => {
        const token = getLocalStorageWithExpiry('token');
        if (token)
            return await request(`${_apiBase}/rates/remove/${id}`, 'POST', null, { "Content-Type": 'application/json', "Authorization": `Bearer ${token.replace('"', '')}` });
        return null;
    }

    const editRate = async (id, rate) => {
        const token = getLocalStorageWithExpiry('token');
        if (token)
            return await request(`${_apiBase}/rates/edit/${id}`, 'POST', JSON.stringify(rate), { "Content-Type": 'application/json', "Authorization": `Bearer ${token.replace('"', '')}` });
        return null;
    }

    const createPayment = async (jkhId, userId, payment) => {
        const token = getLocalStorageWithExpiry('token');
        if (token)
            return await request(`${_apiBase}/payment/send/${jkhId}/${userId}`, 'POST', JSON.stringify(payment), { "Content-Type": 'application/json', "Authorization": `Bearer ${token.replace('"', '')}` });
        return null;
    }

    const getUserPayments = async (userId) => {
        const token = getLocalStorageWithExpiry('token');
        if (token)
            return await request(`${_apiBase}/users/${userId}/payments`, 'GET', null, { "Content-Type": 'application/json', "Authorization": `Bearer ${token.replace('"', '')}` });
        return null;
    }

    const getUserPaymentsExpired = async (userId) => {
        const token = getLocalStorageWithExpiry('token');
        if (token)
            return await request(`${_apiBase}/users/${userId}/payments/expired`, 'POST', null, { "Content-Type": 'application/json', "Authorization": `Bearer ${token.replace('"', '')}` });
        return null;
    }

    const getJkhPayments = async (userId) => {
        const token = getLocalStorageWithExpiry('token');
        if (token)
            return await request(`${_apiBase}/jkh/${userId}/payments`, 'GET', null, { "Content-Type": 'application/json', "Authorization": `Bearer ${token.replace('"', '')}` });
        return null;
    }

    const payPayment = async (id) => {
        const token = getLocalStorageWithExpiry('token');
        if (token)
            return await request(`${_apiBase}/payment/${id}/pay`, 'POST', null, { "Content-Type": 'application/json', "Authorization": `Bearer ${token.replace('"', '')}` });
        return null;
    }

    const getUserJkh = async (id) => {
        const token = getLocalStorageWithExpiry('token');
        if (token)
            return await request(`${_apiBase}/users/${id}/jkh`, 'GET', null, { "Content-Type": 'application/json', "Authorization": `Bearer ${token.replace('"', '')}` });
        return null;
    }

    return { auth, getUserInfo, getRoles, getNews, createNews, removeNews, editNews, setLogo, getLogo, setUserData, getUsers, getNewsById, register, getUserInfoById, setBanUser, setUnbanUser, removeUser, getAllJkh, getJkhById, createJkh, addEmployeeJkh, removeEmployeeJkh, getAllEmployee, addHouse, editHouse, getRates, getRateById, createRate, removeRate, editRate, getUserHouse, removeHouse, getHouseById, removeClient, createPayment, getUserPayments, getJkhPayments, getUserPaymentsExpired, payPayment, getUserJkh, addHouseToJkh, loading, error };
}

export default useMainService;
