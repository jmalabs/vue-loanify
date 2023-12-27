<template>
    <!-- <DebtorDetailsVue :isOpen="openDebtorDetails" :debtorId="debtorData.id" /> -->
    <tr>
        <!-- name -->

        <td>
            <div class="d-flex flex-column">
                <a href="javascript:void(0)" class="d-block font-weight-semibold text--primary text-truncate"
                    @click="viewDetails">{{ debtorData.fullName }}</a>
            </div>
        </td>

        <td v-text="debtorData.email" />
        <td v-text="debtorData.contactNo" />
        <td v-text="debtorData.applicationDate?.toLocaleDateString(undefined, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        })" />
        <td v-text="debtorData.principal?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'PHP'
        })" />
        <td v-text="debtorData.terms" />
        <td v-text="debtorData.rate?.toFixed(2) + '%'" />
        <td>
            <VChip small :color="statusColor[debtorData.status]" class="font-weight-medium">
                {{ debtorData.status }}
            </VChip>

        </td>
    </tr>
</template>

<script>

import DebtorDetailsVue from './DebtorDetails.vue'
import { ref } from 'vue'
export default {
    components: { DebtorDetailsVue },
    props: ['debtor'],
    setup(props, { emit }) {

        const statusColor = {
            Approved: 'success',
            Rejected: 'error',
            Pending: 'warning',
        };

        function viewDetails() {
            openDebtorDetails.value = true;
            emit('active-debtor', this.debtorData.id)
        }


        const openDebtorDetails = ref(false)
        return {
            statusColor,
            debtorData: props.debtor,
            viewDetails,
            openDebtorDetails
        }
    }
}


</script>