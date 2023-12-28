

<template>
    <VCard title="Debtors">
        <DebtorDetailsVue :isModalVisible="openDebtorDetails" :debtor="selectedRow" @close-modal="closeModal" />
        <VTable height="300px" density="compact" :headers="headers" :items="applications" item-key="fullName"
            class="table-rounded" hide-default-footer disable-sort>
            <thead>
                <tr>
                    <th v-for="header in headers" :key="header">
                        {{ header }}
                    </th>
                </tr>
            </thead>

            <tbody>
                <DebtorRowDataVue v-for="row in applications" :key="row.key" :debtor="row"
                    @active-debtor="setActiveDebtorId" />

            </tbody>

        </VTable>
    </VCard>
    <VCard v-if="!applications?.length" style="text-align: center;">No Data</VCard>
</template>


<script>
import { onMounted, ref } from 'vue';
import LoanifyApi from '../../../services/loanify/loanifyApi.vue';
import DebtorDetailsVue from './DebtorDetails.vue';
import DebtorRowDataVue from './DebtorRowData.vue';
export default {
    components: { DebtorDetailsVue, DebtorRowDataVue },
    setup() {
        const openDebtorDetails = ref(false);
        const applications = ref([]);
        const selectedRow = ref({});

        onMounted(async () => {

            const { status, data } = await LoanifyApi.getApplications();

            if (status === 200 && data) {
                for (let key in data) {
                    applications.value.push({
                        id: key,
                        firstName: data[key]?.firstName,
                        lastName: data[key]?.lastName,
                        fullName: `${data[key]?.firstName} ${data[key]?.lastName}`,
                        applicationDate: new Date(data[key]?.applicationDate),
                        completeAddress: data[key]?.completeAddress,
                        email: data[key]?.email,
                        contactNo: data[key]?.contactNo,
                        principal: data[key]?.principal,
                        terms: data[key]?.terms,
                        rate: data[key]?.rate,
                        status: data[key]?.loanStatus,
                        termDetails: data[key]?.termDetails
                    })

                }
            }



        })
        const data = [

        ]
        const status = {
            1: 'Current',
            2: 'Professional',
            3: 'Rejected',
            4: 'Resigned',
            5: 'Applied',
        }
        const statusColor = {
            Approved: 'success',
            Rejected: 'error',
            Pending: 'warning',
        }
        const headers = [
            'NAME',
            'EMAIL',
            'CONTACT #',
            'APPLICATION DATE',
            'AMOUNT',
            'MONTHS',
            'RATE',
            'STATUS',
            // 'ACTIONS'
        ]


        function viewDetails() {
            openDebtorDetails.value = true;
            alert('test')
        }

        function setActiveDebtorId(debtorId) {
            selectedRow.value = applications.value.find(v => v.id == debtorId);
            openDebtorDetails.value = true;
        }

        function closeModal() {
            openDebtorDetails.value = false;
        }

        return {
            data,
            headers,
            statusColor,
            applications,
            openDebtorDetails,
            setActiveDebtorId,
            selectedRow,
            viewDetails,
            closeModal
        }
    }
}
</script>
