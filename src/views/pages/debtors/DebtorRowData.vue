<template>
  <tr>
    <td>
      <div class="d-flex flex-column">
        <a
          href="javascript:void(0)"
          class="d-block font-weight-semibold text--primary text-truncate"
          @click="viewDetails"
        >{{ debtorData.fullName }}</a>
      </div>
    </td>

    <td v-text="debtorData.email" />
    <td v-text="debtorData.contactNo" />
    <td
      v-text="debtorData.applicationDate?.toLocaleDateString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })"
    />
    <td
      v-text="debtorData.principal?.toLocaleString('en-US', {
        style: 'currency',
        currency: 'PHP'
      })"
    />
    <td v-text="debtorData.terms" />
    <td v-text="debtorData.rate?.toFixed(2) + '%'" />
    <td>
      <VChip
        small
        :color="statusColor[debtorData.status]"
        class="font-weight-medium"
      >
        {{ debtorData.status }}
      </VChip>
    </td>
    <td>
      <VBtn
        style="margin-right: .25rem;"
        @click="approveDebtor(debtorData)"
      >
        Approve
      </VBtn>
      <VBtn
        color="error"
        @click="rejectDebtor(debtorData)"
      >
        Reject
      </VBtn>
    </td>
  </tr>
</template>

<script>
import { ref } from 'vue'
import { VBtn } from 'vuetify/lib/components/index.mjs'
import DebtorDetailsVue from './DebtorDetails.vue'

import LoanStatus from '../../../utils/status'

import loanifyApi from '../../../services/loanify/loanifyApi.vue'

export default {
  components: { DebtorDetailsVue },
  props: ['debtor'],
  emits: ['activeDebtor', 'reloadData'],
  setup(props, { emit }) {

    const statusColor = {
      Approved: 'success',
      Rejected: 'error',
      Pending: 'warning',
    }

    function viewDetails() {
      openDebtorDetails.value = true
      emit('activeDebtor', this.debtorData.id)
    }

    const approveDebtor = async row => {
      const application = {  ...row, loanStatus: LoanStatus.LOAN_STATUS.Approved, approvedAt: new Date(Date.now()) } 
      await loanifyApi.updateApplication(application, row.id)
      emit('reloadData')
    }

    const rejectDebtor = async row => {
      const application = {  ...row, loanStatus: LoanStatus.LOAN_STATUS.Rejected, rejectedAt: new Date(Date.now()) } 
      await loanifyApi.updateApplication(application, row.id)
      emit('reloadData')
    }


    const openDebtorDetails = ref(false)

    return {
      statusColor,
      debtorData: props.debtor,
      viewDetails,
      openDebtorDetails,
      approveDebtor,
      rejectDebtor,
    }
  },
}
</script>