<template>
    <TermDetailsDataTable :termDetails="termDetails"></TermDetailsDataTable>
</template>

<script>

import { computed, watch } from 'vue'
import moment from 'moment'
import TermDetailsDataTable from '../debtors/TermDetailsDataTable.vue'
export default {
    components: { TermDetailsDataTable },
    props: ['totalAmount', 'applicationDate', 'numberOfPayments', 'terms'],
    setup(props, { emit }) {

        const termDetails = computed(() => getTermDetails());
        watch(termDetails, (newValue) => {
            emit('term-details', newValue)
        });

        function getTermDetails() {
            const termDetails = [];
            let paymentDate = new Date(props.applicationDate)

            for (let i = 0; i < props.numberOfPayments; i++) {
                paymentDate.setDate(paymentDate.getDate() + 15);
                termDetails.push({
                    termNo: i + 1,
                    paymentDate: new Date(paymentDate),
                    amount: props.totalAmount / (props.numberOfPayments > 0 ? props.numberOfPayments : 1)

                })
            }

            return termDetails;
        }

        function formatDate(date, format) {
            return moment(date).format(format)
        }

        const headers = ['Payment #', 'Amount Due', 'Due Date']

        return {
            termDetails,
            totalAmount: props.totalAmount,
            terms: props.terms,
            formatDate,
            headers

        }
    }
}
</script>
