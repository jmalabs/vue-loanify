

<script>

import axios from 'axios';
export default {
    async createApplication(application) {
        return await axios.post('https://loanify-3b3b7-default-rtdb.asia-southeast1.firebasedatabase.app/loans.json', { ...application })
    },

    async getApplications() {
        return await axios.get('https://loanify-3b3b7-default-rtdb.asia-southeast1.firebasedatabase.app/loans.json')
    }


}

</script>