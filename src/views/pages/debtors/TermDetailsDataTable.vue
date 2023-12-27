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
import moment from 'moment'
export default {
    props: {
        termDetails: Array
    },
    setup() {

        function formatDate(date, format) {
            return moment(date).format(format)
        }

        const headers = ['Payment #', 'Amount Due', 'Due Date']

        return {
            formatDate,
            headers

        }
    }
}
</script>
