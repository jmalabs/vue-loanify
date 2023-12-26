

<template>
    <VCard title="Debtors">
        <VTable height="300px" density="compact" :headers="headers" :items="applications" item-key="fullName" class="table-rounded" hide-default-footer
            disable-sort>
            <thead>
                <tr>
                    <th v-for="header in headers" :key="header">
                        {{ header }}
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="row in applications" :key="row.fullName">
                    <!-- name -->

                    <td>
                        <div class="d-flex flex-column">
                            <span class="d-block font-weight-semibold text--primary text-truncate">{{ row.fullName }}</span>
                            <small>{{ row.post }}</small>
                        </div>
                    </td>

                    <td v-text="row.email" />
                    <td v-text="row.contactNo" />
                    <td v-text="row.applicationDate.toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    })" />
                    <td v-text="row.principal?.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'PHP'
                    })" />
                    <td v-text="row.terms" />
                    <td v-text="row.rate?.toFixed(2) + '%'" />
                    <!-- <td v-text="row.status" /> -->
                    <!-- status -->
                    <td>
                        <!-- <VChip small :color="statusColor[status[row?.status ?? ]]" class="font-weight-medium">
                            {{ status[row.status] }}
                        </VChip> -->
                        <VChip small class="font-weight-medium">
                            {{ row.status }}
                        </VChip>

                    </td>
                    <td>
                        <!-- <VChip small :color="statusColor[status[row?.status ?? ]]" class="font-weight-medium">
                            {{ status[row.status] }}
                        </VChip> -->
                        <VChip small class="font-weight-medium">
                            {{ row.status }}
                        </VChip>

                    </td>
                </tr>
            </tbody>

        </VTable>
    </VCard>
    <VCard v-if="!applications?.length" style="text-align: center;">No Data</VCard>
</template>


<script>
import { onMounted } from 'vue';
import LoanifyApi from '../../../services/loanify/loanifyApi.vue';
export default {

    setup() {
        const applications = ref([]);
        onMounted(async () => {
            console.log('Mounted!!!')

            const { status, data } = await LoanifyApi.getApplications();
            console.log('stats', status)

            if (status === 200 && data) {
                for (let key in data) {
                    applications.value.push({
                        fullName: `${data[key]?.firstName} ${data[key]?.lastName}`,
                        applicationDate: new Date(data[key]?.applicationDate),
                        completeAddress: new Date(data[key]?.completeAddress),
                        email: data[key]?.email,
                        contactNo: data[key]?.contactNo,
                        principal: data[key]?.principal,
                        terms: data[key]?.terms,
                        rate: data[key]?.rate,
                        status: data[key]?.loanStatus,
                    })

                }
            }

            console.log('data', applications)


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
            'TERMS (MONTHS)',
            'RATE',
            'STATUS',
            'ACTIONS'
        ]
        const usreList = applications

        return {
            data,
            headers,
            usreList,
            statusColor,
            applications
        }
    }
}
</script>
