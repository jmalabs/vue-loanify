<template>
    <VTable height="300px" density="compact" :headers="headers" :items="termDetails" item-key="termNo" fixed-header=""
        class="table-rounded" hide-default-footer disable-sort>
        <thead>
            <tr>
                <th v-for="header in headers" :key="header">
                    {{ header }}
                </th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="row in termDetails" :key="row.termNo">
                <td v-text="row.termNo" />
                <td v-text="row.amount.toFixed(2)" />
                <td v-text="formatDate(row.paymentDate, 'MM/DD/yyyy')"></td>

            </tr>
        </tbody>

    </VTable>
</template>

<script>

import { computed, watch } from 'vue'
import moment from 'moment'
export default {
    props: ['totalAmount', 'applicationDate', 'numberOfPayments', 'terms'],
    setup(props, { emit }) {

        const termDetails = computed(() => getTermDetails());


        watch(termDetails, (newValue, oldValue) => {
            console.log(newValue)
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

        const headers = ['Term #', 'Amound Due', 'Due Date']

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
