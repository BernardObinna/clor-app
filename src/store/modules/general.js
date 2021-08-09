// import $axios from '../../utils/axios'
// import endpoints from '../../utils/Endpoints'
// import { handleRequest } from '../../utils/Connection'
// // import util from '../../utils/UtilsService'
//
// export const state = {
//   // usdRates: ''
// }
//
// export const getters = {
//   // getDollarRates(state) {
//   //     return state.usdRates
//   // }
// }
//
// export const mutations = {
//   // SET_RATES(state, rates) {
//   //     state.usdRates = Number(rates.wireinNaira)
//   // }
// }
//
// export const actions = {
//   notify(context) {
//     // util.showMessage('test', 'error')
//     const [res] = await handleRequest($axios.get(endpoints.rates))
//     if (res) commit('SET_RATES', res.rates)
//   },
//
//     notify(context, { e, str, s }) {
//         let phrase = str ? str : "";
//         let options = "";
//         if (s) {
//             options = {
//                 group: "notifications-default",
//                 type: "success text-white",
//                 title: "Success",
//                 text: s.body && s.body.message ? s.body.message : phrase,
//             };
//         } else {
//             options = {
//                 group: "notifications-default",
//                 type: "error text-white",
//                 title: "Error",
//                 text: e.body && e.body.message ? e.body.message : phrase,
//             };
//         }
//         Vue.notify(options);
//     },
//
//   async sendDollarToNaira({ commit }, payload) {
//     // util.showMessage('test', 'error')
//     const [res, error] = await handleRequest(
//       $axios.post(endpoints.sendDollarToNaira, payload)
//     )
//     if (res) return [res, null]
//     else return [null, error]
//   }
// }
