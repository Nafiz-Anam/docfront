import axios from "axios";


export default {
    doctorcurd: {
        getTeamMember: async () => {
            const res = await axios.get('https://bal-api.bal-alpha.com/algo/web/team_members/get')
            console.log(res)
            return res.data

            //     fetch('https://bal-api.bal-alpha.com/algo/web/team_members/get', {
            //         method: 'GET',
            //         headers: { 'Accept': '*/*' },
            //     }).then(res => {
            //         res.json();
            //     }).then(result => {
            //         console.log(result)
            //         return result.data
            //     })
            // }
            // .then((res) => {
            //     console.log("API get team=====> res", res);
            //     return (res.data);
            // })
        }
    }
}