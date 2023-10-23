import { request, requestGet, requestMultipart } from './ApiSauce';

const Api = {
    wiseqAdminLogin: json => request('auth/login', json),
    wiseqUserList: () => requestGet('wiseq-user/list'),
    createWiseqUser: json => request('wiseq-user', json),
    createWiseqPackage: json => request('subscription-packages', json),
    getAllPackages: () => requestGet('subscription-packages'),
    createOrganisation: json => request('organisations', json),
    getOrganisationList: () => requestGet('organisations'),
    add_super_admin: json => request('organisation-admins/add-super-admins', json),
};

export { Api };